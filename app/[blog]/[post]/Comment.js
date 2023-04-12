"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";

import { MDRenderer } from "@/components/Editor/Editor";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./Comment.module.css";

const CommentButtons = () => (
  <div className={styles.buttons}>
    <a onClick={() => {}}>edit</a>
    <a onClick={() => {}}>delete</a>
  </div>
);

const Comment = ({ createdAt, userId, text }) => {
  const [commentator, setCommentator] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const userRef = doc(userCollection, userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setCommentator(docToUser(userDoc));
      }
    })();
  }, [userId]);

  return (
    <div className={styles.commentBox}>
      <div className={styles.header}>
        <div className={styles.name}>{commentator ? commentator.displayName : ""}</div>
        <div>{`posted ${moment.unix(createdAt.seconds).fromNow()}`}</div>
      </div>
      <div>
        <MDRenderer text={text} />
      </div>
      {user && userId === user.uid && <CommentButtons className={styles.buttons} />}
    </div>
  );
};

export default Comment;
