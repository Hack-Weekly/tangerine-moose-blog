"use client";

import { useState } from "react";
import { getDoc } from "firebase/firestore";

import CommentList from "@/app/[blog]/[post]/CommentList";
import Button from "@/components/Button";
import { Editor, MDRenderer } from "@/components/Editor";
import FlashMessage from "@/components/FlashMessage";
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
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const handleTextChange = (text) => {
    setCommentText(text);
    text && setError("");
  };

  const resetForm = () => {
    setCommentText("");
    setReplying(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText) {
      setError("Comment cannot be empty");
      return;
    }

    if (!user) return;

    try {
      console.log(commentText);
      const commentRef = await addComment(postId, user.uid, commentText);
      const comment = await getDoc(commentRef);
      console.log(docToComment(comment));
      setReplies([docToComment(comment), ...replies]);
      setCommentText("");
      setReplying(false);
    } catch (err) {
      console.log(err);
    }
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
      {replying && (
        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
          {error && <FlashMessage message={error} />}
          <div>
            replying as <span className={styles.name}>{user.displayName}</span>
          </div>
          <Editor text={commentText} onChange={handleTextChange} />
          <div className={styles.buttons}>
            <Button type="submit">post</Button>
            <Button type="reset" onClick={resetForm}>
              cancel
            </Button>
          </div>
          <div className={styles.preview}>
            <MDRenderer text={commentText} />
          </div>
        </form>
      )}
      <CommentList comments={replies} />
    </div>
  );
};

export default PostActions;
