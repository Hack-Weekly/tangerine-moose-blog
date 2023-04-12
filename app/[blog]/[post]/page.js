import { notFound } from "next/navigation";
import { doc, getDoc, getDocs, increment, limit, query, where } from "firebase/firestore";
import Markdown from "marked-react";
import moment from "moment";
import { VscEye } from "react-icons/vsc";

import CommentList from "@/app/[blog]/[post]/CommentList";
import PostButtons from "@/app/[blog]/[post]/components/PostButtons";
import Reactions from "@/app/[blog]/[post]/components/Reactions";
import { blogCollection, docToBlog } from "@/firebase/utils/blogUtils";
import { docToPost, postCollection, updatePost } from "@/firebase/utils/postUtils";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import styles from "./page.module.css";

const fetchPost = async (params) => {
  const postQuery = query(postCollection, where("slug", "==", params.post), limit(1));
  const postSnapshot = (await getDocs(postQuery)).docs;
  let post = {};

  if (postSnapshot.length && postSnapshot[0].exists) {
    post = docToPost(postSnapshot[0]);
    await updatePost(post.id, { views: increment(1) });
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

  return { ...post, user, blog };
};

// TODO: add back comments, reactions, etc
const BlogPost = async ({ params }) => {
  const postWithUserAndBlog = await fetchPost(params);

  if (!postWithUserAndBlog) return notFound();

  const { title, text, slug, blogId, userId, comments, tags, reactions, views, updatedAt, createdAt } =
    postWithUserAndBlog;
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
      {/* TODO: remove for production */}
      {/*<pre>*/}
      {/*  <code>{JSON.stringify(postWithUserAndBlog, null, 2)}</code>*/}
      {/*</pre>*/}
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
        <img className={styles.image} src={postWithUserAndBlog.imageURL} alt={title} />
      </div>
      <div className={styles.text}>
        <Markdown value={text} />
        <div className={styles.reacts}>
          <Reactions reactions={reactions} />
        </div>
      </div>
      <p className={styles.byline}>
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
      </p>
      <PostButtons postSlug={slug} postAuthorId={userId} replyCount={comments.length} />
      <CommentList comments={comments} />
    </div>
  );
};

export default BlogPost;
