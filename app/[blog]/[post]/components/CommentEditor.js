import { useState } from "react";
import Markdown from "marked-react";

import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/lib/commands";

import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";

import styles from "./CommentEditor.module.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const editorOptions = {
  preview: "edit",
  commands: [
    "bold",
    "italic",
    "strikethrough",
    "hr",
    "divider",
    "link",
    "quote",
    "code",
    "codeBlock",
    "image",
    "divider",
    "unorderedListCommand",
    "orderedListCommand",
    "checkedListCommand",
  ].map((k) => commands[k]),
  extraCommands: [],
};
const CommentEditor = ({ onReplySubmit }) => {
  const [commentText, setCommentText] = useState("");

  return (
    <>
      <div className={styles.input}>
        <MDEditor value={commentText} onChange={setCommentText} {...editorOptions} />
      </div>
      <button className={styles.submit} type="submit" onClick={onReplySubmit}>
        send
      </button>
      {commentText && (
        <div className={styles.preview}>
          <div className={styles.text}>
            <Markdown value={commentText} />
          </div>
        </div>
      )}
    </>
  );
};

export default CommentEditor;
