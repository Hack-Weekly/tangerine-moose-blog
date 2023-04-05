"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Markdown from "marked-react";

import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/lib/commands";

import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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

// mock data/api
let blogPost = {};
const useCurrentUser = () => ({ name: useSearchParams().get("user") }); // `?user=TestUser` in URL to test author view
const submitBlogPost = (name, title, slug, text) =>
  (blogPost = { postId: text.length, authorUsername: name, title: title, slug: slug, text: text });
// end mock

const NewBlogPost = () => {
  const router = useRouter();
  const { name: authorUsername } = useCurrentUser();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const getSlugFromTitle = (title) => title.trim().replaceAll(" ", "-");

  const handleSubmit = () => {
    const slug = getSlugFromTitle(title);
    submitBlogPost(authorUsername, title, slug, text);
    console.log("blogPost: ", blogPost);
    router.push(`/${authorUsername}/${slug}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div>
          <label htmlFor="titleInput">Title </label>
          <input
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
