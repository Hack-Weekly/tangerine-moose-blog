import { notFound } from "next/navigation";
import { doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";

import AuthorCard from "@/components/AuthorCard/AuthorCard";
import PostCard from "@/components/PostCard/PostCard";
import { blogCollection, docToBlog } from "@/firebase/utils/blogUtils";
import { docToPost, postCollection } from "@/firebase/utils/postUtils";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import styles from "./page.module.css";

const fetchBlogPosts = async (params) => {
  // get blog data
  const blogQuery = query(blogCollection, where("slug", "==", params.blog), limit(1));
  const blogDoc = (await getDocs(blogQuery)).docs;

  let blog = null;
  if (blogDoc.length && blogDoc[0].exists) {
    blog = docToBlog(blogDoc[0]);
  } else {
    return null;
  }

  // get all posts for blog ordered by createdAt
  let posts = [];
  const postsQuery = query(postCollection, where("blogId", "==", blog.id), orderBy("createdAt"));
  const postsDocs = (await getDocs(postsQuery)).docs;

  // get user data for each blog
  for (const postDoc of postsDocs) {
    const post = docToPost(postDoc);
    posts.push(post);
  }

  return { blog, posts };
};

// get blog owner
const fetchOwner = async (userId) => {
  const userRef = await doc(userCollection, userId);
  const userDoc = await getDoc(userRef);
  return docToUser(userDoc);
};

const Blog = async ({ params }) => {
  const blogWithPosts = await fetchBlogPosts(params);
  if (!blogWithPosts) return notFound();

  const user = await fetchOwner(blogWithPosts.blog.userId);

  if (!blogWithPosts) {
    return notFound();
  }

  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  const formattedDate = new Date(blogWithPosts.blog.createdAt.seconds * 1000).toLocaleDateString(undefined, options);

  return (
    <div className={styles.root}>
      <AuthorCard {...user} {...blogWithPosts.blog} className={styles.author} />
      <h1 className={styles.h1}>{blogWithPosts.blog.name}</h1>
      <h2 className={styles.h2}>{blogWithPosts.blog.description}</h2>
      <h3 className={styles.h3}>Blogging since: {formattedDate}</h3>
      <div className={styles.posts}>
        {blogWithPosts.posts.map((post) => {
          return <PostCard key={post.id} {...post} {...user} futureStyle={styles.article} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
