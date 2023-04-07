import useRetrieveBlogs from "./[blog]/hooks/useRetrieveBlogs";

export default async function Home() {
  const blogs = await useRetrieveBlogs();

  return blogs.length ? (
    <div>
      Blogs:
      {/* TODO: replace with BlogCard component */}
      {blogs.map((blog) => {
        return (
          <div key={blog.mid}>
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
          </div>
        );
      })}
      <div style={{ height: "1000px" }}></div>
    </div>
  ) : (
    <div>No blogs yet</div>
  );
}
