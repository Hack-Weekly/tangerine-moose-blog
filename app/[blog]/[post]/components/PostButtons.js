"use client";

import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import styles from "./PostButtons.module.css";

const PostButtons = ({ slug, isAuthor, replyCount, onReply }) => {
  const [saved, setSaved] = useState(false);
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
    <div className={styles.buttons}>
      <a href={slug}>{`${replyCount} comments`}</a>
      <a onClick={onReply}>reply</a>
      <a onClick={() => {}}>share</a>
      <a onClick={toggleSavePost} onMouseOver={hoverSave} onMouseLeave={leaveSave}>
        {saved ? "saved" : "save"}
      </a>
      {isAuthor ? (
        <>
          <a onClick={() => {}}>edit</a>
          <a onClick={() => {}}>delete</a>
        </>
      ) : (
        <a onClick={report}>report</a>
      )}
    </div>
  );
};

export default PostButtons;
