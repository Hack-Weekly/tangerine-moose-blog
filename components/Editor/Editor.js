"use client";

import { Placeholder } from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

import Toolbar from "@/components/Editor/Toolbar/Toolbar";
import styles from "./Editor.module.css";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass: styles.placeholder,
        placeholder: ({ node }) => {
          return "Write something ...";
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  });

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
