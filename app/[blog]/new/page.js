"use client";

import { useState } from "react";
import Markdown from "marked-react";

import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/lib/commands";

import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import slugify from "@sindresorhus/slugify";
import { increment } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import Input from "@/components/Input/Input";
import { storage } from "@/firebase/firebase";
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
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // return early if user is null or user doesn't have a blog
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

      if (image !== "") {
        const storageRef = ref(storage, `images/${postRef.id}/${image.name}`);
        const uploadTask = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        await updatePost(postRef.id, { imageURL: downloadURL });
      }

      // increment total post count
      await updateBlog(user.blogId, { totalPost: increment(1) });
      void router.push(`/${user.blogSlug}/${slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageData(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div className={styles.meta}>
          <div>
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
              <label htmlFor="tags">
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
            <div>
              <label htmlFor="image"> Image </label>
              <Input
                required
                type="file"
                className={styles.titleInput}
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className={styles.imagePreview}>
            <img className={styles.image} alt="Preview" src={imageData} />
          </div>
        </div>
        <MDEditor value={text} onChange={setText} {...editorOptions} />
        <button className={styles.submit} type="submit" onClick={handleSubmit}>
          post
        </button>
      </div>
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
