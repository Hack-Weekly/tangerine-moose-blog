"use client";

import * as commands from "@uiw/react-md-editor/lib/commands";

import "@uiw/react-md-editor/markdown-editor.css";
import { useState } from "react";
import dynamic from "next/dynamic";

import styles from "./Editor.module.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false },
);

const editorOptions = {
  preview: "edit",
  commands: [
    commands.group(
      [commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6],
      {
        name: "title",
        groupName: "title",
        buttonProps: { "aria-label": "Insert title" },
      },
    ),
    ...[
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
  ],
  extraCommands: [],
};

export function Editor({ onSubmit, initialText, onCancel }) {
  const [text, setText] = useState(initialText || "");

  return (
    <div className={styles.container}>
      <MDEditor value={text} onChange={setText} {...editorOptions} />
      <button className={styles.submit} type="submit" onClick={() => onSubmit(text) && setText("")}>
        post
      </button>
      {onCancel && (
        <button className={styles.submit} type="reset" onClick={() => onCancel() && setText("")}>
          cancel
        </button>
      )}
      {text && (
        <div className={styles.preview}>
          <MDRenderer text={text} />
        </div>
      )}
    </div>
  );
}

export function MDRenderer({ text }) {
  return text && <Markdown source={text} className={styles.text} />;
}
