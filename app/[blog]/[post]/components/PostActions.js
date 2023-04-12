"use client";

import { useState } from "react";
import { getDoc } from "firebase/firestore";

import CommentList from "@/app/[blog]/[post]/CommentList";
import CommentEditor from "@/app/[blog]/[post]/components/CommentEditor";
import { addComment, docToComment } from "@/firebase/utils/postUtils";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./PostActions.module.css";

const PostActions = ({ postId, postSlug, postAuthorId, comments }) => {
  const { user } = useAuth();
  const [replies, setReplies] = useState(comments);
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

  const [replying, setReplying] = useState(false);

  const handleCommentSubmit = async (commentText) => {
    if (!user) return;

    try {
      const commentRef = await addComment(postId, user.uid, commentText);
      const comment = await getDoc(commentRef);
      setReplies([docToComment(comment), ...replies]);
    } catch (err) {
      console.log(err);
    }

    // submitComment(currentUser, commentText);
  };

  return (
    <div>
      <div className={styles.buttons}>
        <a href={postSlug}>{`${replies.length} comments`}</a>
        <a onClick={() => setReplying(!replying)}>reply</a>
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
      {replying && <CommentEditor onReplySubmit={handleCommentSubmit} />}
      <CommentList comments={replies} />
    </div>
  );
};

export default PostActions;
