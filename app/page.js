import { getDocs, orderBy, query } from "firebase/firestore";

import { userCollection } from "@/firebase/utils/userUtils";

const fetchData = async () => {
  // TODO: change this to fetch blog collection instead
  const q = await query(userCollection, orderBy("createdAt"));

  const querySnapshot = await getDocs(q);
  const users = [];
  querySnapshot.forEach((doc) => {
    // TODO: delete once blog collection is created
    const { uid, createdAt, displayName, email } = doc.data();

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
          <div key={blog.uid}>
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
  );
}
