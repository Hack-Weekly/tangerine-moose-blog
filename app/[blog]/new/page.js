"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Markdown from "marked-react";

import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/lib/commands";

import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";

import Input from "@/components/Input/Input";
import { useAuth } from "@/providers/AuthProvider";
import useCreateBlogPost from "./hooks/useCreateBlogPost";
import styles from "./page.module.css";

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

const NewBlogPost = () => {
  const { user, loading } = useAuth();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [fetchData, status, data] = useCreateBlogPost();

  const handleSubmit = () => {
    const slug = title.trim().replaceAll(" ", "-");
    fetchData({ blogName: user?.blog || "TestBlog", title, slug, text });
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div>
          <label htmlFor="titleInput">Title </label>
          <Input
            required
            type="text"
            className={styles.titleInput}
            name="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <MDEditor value={text} onChange={setText} {...editorOptions} />
      </div>
      <button className={styles.submit} type="submit" onClick={handleSubmit}>
        post
      </button>
      {text && (
        <div className={styles.preview}>
          <div className={styles.text}>
            <Markdown value={text} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBlogPost;
