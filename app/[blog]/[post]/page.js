import Image from "next/image";
import { notFound } from "next/navigation";
import { doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import moment from "moment";
import { VscEye } from "react-icons/vsc";

import PostActions from "@/app/[blog]/[post]/components/PostActions";
import Reactions from "@/app/[blog]/[post]/components/Reactions";
import { MDRenderer } from "@/components/Editor";
import { blogCollection, docToBlog } from "@/firebase/utils/blogUtils";
import { bumpViews, commentCollection, docToComment, docToPost, postCollection } from "@/firebase/utils/postUtils";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import styles from "./page.module.css";

const fetchPost = async (params) => {
  const postQuery = query(postCollection, where("slug", "==", params.post), limit(1));
  const postSnapshot = (await getDocs(postQuery)).docs;
  let post = {};

  if (postSnapshot.length && postSnapshot[0].exists) {
    post = docToPost(postSnapshot[0]);
  } else {
    return null;
  }

  const userRef = doc(userCollection, post.userId);
  const userSnapshot = await getDoc(userRef);
  const user = docToUser(userSnapshot);
  delete user.email; // don't expose email

  const blogRef = doc(blogCollection, post.blogId);
  const blogSnapshot = await getDoc(blogRef);
  const blog = docToBlog(blogSnapshot);

  const comments = [];
  const commentQuery = query(commentCollection(post.id), orderBy("createdAt"));
  const commentDocs = (await getDocs(commentQuery)).docs;
  for (const commentDoc of commentDocs) {
    const comment = docToComment(commentDoc);
    comments.push(comment);
  }

  await bumpViews(post.id);

  return { ...post, comments, user, blog };
};

const BlogPost = async ({ params }) => {
  const postWithUserAndBlog = await fetchPost(params);

  if (!postWithUserAndBlog) return notFound();

  const { id, title, text, slug, userId, comments, tags, reactions, views, updatedAt, createdAt } = postWithUserAndBlog;
  const [created, updated] = [createdAt, updatedAt].map(
    (t) =>
      t && {
        short: moment(new Date(t.seconds * 1000)).fromNow(),
        long: new Date(t.seconds * 1000).toLocaleTimeString([], {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      },
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.meta}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div>
          <VscEye size={22} /> {views} Views
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          width={1080}
          height={720}
          className={styles.image}
          src={postWithUserAndBlog.imageURL}
          alt={title}
          unoptimized
        />
      </div>
      <div className={styles.text}>
        <MDRenderer text={text} />
        <div className={styles.reacts}>
          <Reactions reactions={reactions} />
        </div>
      </div>
      <div className={styles.byline}>
        {`submitted `}
        <div className={styles.byline} title={created.long}>
          {created.short}
        </div>
        {updated && (
          <div className={styles.byline}>
            {` (last edited `}
            <div className={styles.byline} title={updated.long}>
              {updated.short}
            </div>
            {`)`}
          </div>
        )}
        {` by `} <a href={`/${postWithUserAndBlog.blog.slug}`}>{postWithUserAndBlog.user.displayName}</a>
      </div>
      <PostActions postId={id} postSlug={slug} postAuthorId={userId} comments={comments} />
    </div>
  );
};

export default BlogPost;
