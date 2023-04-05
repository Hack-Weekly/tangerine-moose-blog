"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Markdown from "marked-react";
import moment from "moment";

import styles from "./Comment.module.css";

const fetchMockData = ({ id, user, text }) => ({
  commentId: id,
  authorUsername: user,
  postId: 1234, // parent blog post ID
  updated: new Date(Date.now() - 60000),
  created: new Date(2023, 1, 1, 12, 12, 12),
  text: text,
});
const getAuthorName = (id) => `Test User (${id})`;
const useCurrentUser = () => ({ name: useSearchParams().get("user") });
const CommentButtons = () => (
  <div className={styles.buttons}>
    <a onClick={() => {}}>edit</a>
    <a onClick={() => {}}>delete</a>
  </div>
);

const Comment = (commentId, user, text) => {
  const [data, setData] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const data = fetchMockData(commentId, user, text);
    setData(data);
  }, [commentId, user, text]);

  if (!data) return <></>;
  if (data) {
    const { text, authorUsername, created, updated } = data;
    const authorName = getAuthorName(authorUsername);
    const isAuthor = currentUser.name === authorUsername;

    return (
      <div className={styles.commentBox}>
        <div className={styles.header}>
          <div style={{ fontWeight: "bold" }}>{authorName}</div>
          <div>{`posted ${moment(created).fromNow()} (edited ${moment(updated).fromNow()})`}</div>
        </div>
        <div className={styles.text}>
          <Markdown value={text} />
        </div>
        {isAuthor && <CommentButtons className={styles.buttons} />}
      </div>
    );
  }
};

export default Comment;
