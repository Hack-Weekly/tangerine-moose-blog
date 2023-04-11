import { doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

import BlogCard from "@/components/BlogCard/BlogCard";
import Featured from "@/components/Featured/Featured";
import { blogCollection, docToBlog } from "@/firebase/utils/blogUtils";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";

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
  const blogs = await fetchBlogs();

  return blogs.length ? (
    <div>
      <Featured />
      Blogs:
      {/* TODO: replace with BlogCard component */}
      {blogs.map((blog) => {
        return (
          <BlogCard key={blog.id} {...blog}>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                display: "block",
                overflow: "auto",
                paddingBottom: "1rem",
              }}
            >
              <code>{JSON.stringify(blog, null, 2)}</code>
            </pre>
          </BlogCard>
        );
      })}
      <div style={{ height: "1000px" }}></div>
    </div>
  ) : (
    <div>No blogs yet</div>
  );
}
