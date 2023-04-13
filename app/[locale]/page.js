import { doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getTranslations } from "next-intl/server";

import BlogCard from "@/components/BlogCard/BlogCard";
import Featured from "@/components/Featured/Featured";
import PostCard from "@/components/PostCard/PostCard";
import { blogCollection, docToBlog } from "@/firebase/utils/blogUtils";
import { docToPost, postCollection } from "@/firebase/utils/postUtils";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const fetchBlogs = async () => {
  // get all blogs ordered by createdAt
  const blogsQuery = await query(blogCollection, orderBy("createdAt", "desc"));
  const blogDocs = (await getDocs(blogsQuery)).docs;
  let blogs = [];

  // get user data for each blog
  for (const blogDoc of blogDocs) {
    const blog = docToBlog(blogDoc);

    const userRef = doc(userCollection, blog.userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // add user data to blog object
      const user = docToUser(userSnap);
      delete user.email; // don't send email to client
      blogs.push({ ...blog, user });
    }
  }

  return blogs;
};

const fetchPosts = async () => {
  // get 10 posts?
  const postsQuery = await query(postCollection, orderBy("createdAt", "desc"), limit(6));
  const postsDoc = (await getDocs(postsQuery)).docs;
  let posts = [];

  // get user data for each post
  for (const postDoc of postsDoc) {
    const post = docToPost(postDoc);

    const userRef = doc(userCollection, post.userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // add user data to blog object
      const user = docToUser(userSnap);
      delete user.email;
      posts.push({ ...post, user });
    }
  }

  return posts;
};

export default async function Home() {
  const t = await getTranslations("home");

  const blogsWithUser = await fetchBlogs();
  const postsWithUser = await fetchPosts();

  return blogsWithUser.length ? (
    <div>
      <Featured />
      <h2 className={styles.h2}>{t("blogs").toUpperCase()}</h2>
      <div className={styles.container}>
        {blogsWithUser.map((blog) => {
          return <BlogCard key={blog.id} blogWithUser={blog} />;
        })}
      </div>
      <h2 className={styles.h2}>{t("articles").toUpperCase()}</h2>
      <div className={styles.container}>
        {postsWithUser.map((post) => {
          return <PostCard key={post.id} {...post} {...post.user} className={styles.post} />;
        })}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.h2}>{t("no_blogs")}</div>
    </div>
  );
}
