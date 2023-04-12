import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

import { blogCollection, docToBlog } from "@/firebase/utils/blogUtils";
import { docToPost, postCollection } from "@/firebase/utils/postUtils";

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

const Blog = async ({ params }) => {
  const blogWithPosts = await fetchBlogPosts(params);

  if (!blogWithPosts) {
    return notFound();
  }

  // TODO: style this page
  return (
    <div>
      <h1>{blogWithPosts.blog.name}</h1>
      <h2>{blogWithPosts.blog.description}</h2>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          display: "block",
          overflow: "auto",
          paddingBottom: "1rem",
        }}
      >
        <code>{JSON.stringify(blogWithPosts, null, 2)}</code>
      </pre>
      <div>posts:</div>
      {blogWithPosts.posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/${blogWithPosts.blog.slug}/${post.slug}`}>{post.slug}</Link>
          </div>
        );
      })}
      <div style={{ height: "1000px" }}></div>
    </div>
  );
};

export default Blog;
