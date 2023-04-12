"use client";

import { useState } from "react";

import Editor from "@/components/Editor";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./PostButtons.module.css";

const submitComment = (text) => console.log("mock api submitting: ", text);

const PostButtons = ({ slug, postAuthorId, replyCount }) => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [replying, setReplying] = useState(false);

  const onReply = (text) => {
    setReplying(false);
    submitComment(text);
  };
  const toggleSavePost = () => setSaved(!saved);
  const hoverSave = ({ target: saveButton }) => saved && (saveButton.innerHTML = "unsave");
  const leaveSave = ({ target: saveButton }) => (saveButton.innerHTML = saved ? "saved" : "save");
  const report = ({ target: reportButton }) => {
    reportButton.innerHTML = "reported";
    setTimeout(() => {
      reportButton.innerHTML = "report";
    }, 2000);
  };

  return (
    <>
      <div className={styles.buttons}>
        <a href={slug}>{`${replyCount} comments`}</a>
        <a onClick={() => setReplying(true)}>reply</a>
        <a onClick={() => {}}>share</a>
        <a onClick={toggleSavePost} onMouseOver={hoverSave} onMouseLeave={leaveSave}>
          {saved ? "saved" : "save"}
        </a>
        {user && postAuthorId === user.uid ? (
          <>
            <a onClick={() => {}}>edit</a>
            <a onClick={() => {}}>delete</a>
          </>
        ) : (
          <a onClick={report}>report</a>
        )}
      </div>
      {replying && <Editor onSubmit={onReply} />}
    </>
  );
};

export default PostButtons;
