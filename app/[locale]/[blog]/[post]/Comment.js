"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { MDRenderer } from "@/components/Editor/Editor";
import { docToUser, userCollection } from "@/firebase/utils/userUtils";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./Comment.module.css";

const CommentButtons = ({ actions }) => (
  <div className={styles.buttons}>
    {actions.map((action) => (
      <a key={action.label} onClick={() => {}}>
        {action.label}
      </a>
    ))}
  </div>
);

const Comment = ({ createdAt, userId, text, actions }) => {
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
        <div>{createdAt}</div>
      </div>
      <div>
        <MDRenderer text={text} />
      </div>
      {user && userId === user.uid && <CommentButtons className={styles.buttons} actions={actions} />}
    </div>
  );
};

export default Comment;
