import { useState } from "react";

import TextButton from "./TextButton";
import styles from "./page.module.css";

const PostButtons = ({ slug, isAuthor }) => {
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
      <a href={slug}>3 comments</a>
      <TextButton onClick={() => {}}>reply</TextButton>
      <TextButton onClick={() => {}}>share</TextButton>
      <TextButton onClick={toggleSavePost} onMouseOver={hoverSave} onMouseLeave={leaveSave}>
        {saved ? "saved" : "save"}
      </TextButton>
      {isAuthor ? (
        <>
          <TextButton onClick={() => {}}>edit</TextButton>
          <TextButton onClick={() => {}}>delete</TextButton>
        </>
      ) : (
        <TextButton onClick={report}>report</TextButton>
      )}
    </div>
  );
};

export default PostButtons;
