import { limit, orderBy, query, startAt } from "firebase/firestore";

import { Collections, getCollections } from "@/firebase/firestore";

const fetchData = async () => {
  const collectionRef = getCollection(Collections.Blogs);
  const latestBlogs = await query(collectionRef, where("posts", "!=", "[]"), limit(12), orderBy("createdAt"));

  return latestBlogs;
};

export default async function Home() {
  const blogs = await fetchData();

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.mid}>
            <pre>{JSON.stringify(blog)}</pre>
          </div>
        );
      })}
    </div>
  );
}
