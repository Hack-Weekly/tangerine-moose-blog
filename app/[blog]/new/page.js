"use client";

import { useState } from "react";
import Markdown from "marked-react";

import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/lib/commands";

import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import slugify from "@sindresorhus/slugify";
import { increment } from "firebase/firestore";

import Input from "@/components/Input/Input";
import { updateBlog } from "@/firebase/utils/blogUtils";
import { createPost, updatePost } from "@/firebase/utils/postUtils";
import { useAuth } from "@/providers/AuthProvider";
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
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // return early if user is null or user id is null
    if (!user || !user.blogId) return;

    try {
      const postRef = await createPost(user.blogId, user.uid, {
        title: title.trim(),
        text: text,
        blogId: user.blogId,
        userId: user.userId,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      });

      // add slug to post
      const slug = slugify(`${title}-${postRef.id.substring(0, 5)}`);
      await updatePost(postRef.id, { slug: slug });
      // increment total post count
      await updateBlog(user.blogId, { totalPost: increment(1) });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <Input
            required
            type="text"
            className={styles.titleInput}
            name="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="titleInput">
            Tags (separate by <kbd>,</kbd>)
          </label>
          <Input
            required
            type="text"
            className={styles.titleInput}
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
