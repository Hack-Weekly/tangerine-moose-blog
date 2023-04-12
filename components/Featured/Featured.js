import { doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";

import { docToPost, postCollection } from "@/firebase/utils/postUtils";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import AuthorCard from "../AuthorCard/AuthorCard";
import PostCard from "../PostCard/PostCard";
import styles from "./Featured.module.css";

// get latest post
const fetchPost = async () => {
  const postQuery = await query(postCollection, orderBy("createdAt"), limit(1));
  const postDoc = (await getDocs(postQuery)).docs;
  return docToPost(postDoc[0]);
};

// get user
const fetchUser = async (userId) => {
  const userRef = await doc(userCollection, userId);
  const userDoc = await getDoc(userRef);
  return docToUser(userDoc);
};

const Featured = async (props) => {
  const article = await fetchPost();
  const user = await fetchUser(article.userId);

  return (
    <div className={styles.root}>
      <h2>FEATURED ARTICLE</h2>
      <PostCard {...article} {...user} />
      <AuthorCard futureStyle={styles.author} />
    </div>
  );
};

export default Featured;
