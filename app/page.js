import { doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

import BlogCard from "@/components/BlogCard/BlogCard";
import Featured from "@/components/Featured/Featured";
import { blogCollection, docToBlog } from "@/firebase/utils/blogUtils";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import styles from "./page.module.css";

const fetchBlogs = async () => {
  // get all blogs ordered by createdAt
  const blogsQuery = await query(blogCollection, orderBy("createdAt"));
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

export default async function Home() {
  const blogsWithUser = await fetchBlogs();

  return blogsWithUser.length ? (
    <div>
      <Featured />
      <div className={styles.container}>
        {blogsWithUser.map((blog) => {
          return <BlogCard key={blog.id} blogWithUser={blog} />;
        })}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div>No blogs yet</div>
    </div>
  );
}
