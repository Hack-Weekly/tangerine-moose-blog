import { getDocs, orderBy, query } from "firebase/firestore";

import { Collections, getCollection } from "@/firebase/firestore";

const fetchData = async () => {
  // TODO: change this to fetch blog collection instead
  const userCollection = getCollection(Collections.Users);
  const q = await query(userCollection, orderBy("createdAt"));

  const querySnapshot = await getDocs(q);
  const users = [];
  querySnapshot.forEach((doc) => {
    // TODO: delete once blog collection is created
    const { createdAt, displayName, email, uid } = doc.data();
    // privacy
    const anon = displayName[0] + displayName.slice(1).replace(/./g, "*");
    const anonEmail = email.replace(/(.).+@(.+)/, "$1***@$2");
    users.push({
      uid,
      displayName: anon,
      email: anonEmail,
      createdAt,
    });
  });

  return users;
};

export default async function Home() {
  const blogs = await fetchData();

  return (
    <div>
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
    </div>
  );
}
