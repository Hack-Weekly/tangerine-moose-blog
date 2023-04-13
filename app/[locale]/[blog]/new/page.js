"use client";

import { useState } from "react";
import slugify from "@sindresorhus/slugify";

import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import Image from "next/image";
import { increment } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";

import Button from "@/components/Button";
import { Editor, MDRenderer } from "@/components/Editor";
import FlashMessage from "@/components/FlashMessage";
import Input from "@/components/Input/Input";
import { storage } from "@/firebase/firebase";
import { updateBlog } from "@/firebase/utils/blogUtils";
import { createPost, updatePost } from "@/firebase/utils/postUtils";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./page.module.css";

const NewBlogPost = () => {
  const t = useTranslations("post.new");
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleTextChange = (text) => {
    setText(text);
    text && setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      setError(t("post_empty"));
      return;
    }

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

      if (image) {
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
      <form onSubmit={handleSubmit}>
        {error && <FlashMessage message={error} />}
        <div className={styles.meta}>
          <div className={styles.input}>
            <div>
              <label htmlFor="titleInput">{t("title")}</label>
              <Input required type="text" name="titleInput" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="tags">
                {t.rich("tags", {
                  tag: (c) => <kbd>{c}</kbd>,
                })}
              </label>
              <Input required type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div>
              <label htmlFor="image">{t("image")}</label>
              <Input required type="file" name="image" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <div className={styles.imagePreview}>
            {imageData && <Image fill className={styles.image} alt="Preview" src={imageData} />}
          </div>
        </div>
        <Editor text={text} onChange={handleTextChange} />
        <Button className={styles.submit} type="submit">
          {t("post")}
        </Button>
        <MDRenderer text={text} />
      </form>
    </div>
  );
};

export default NewBlogPost;
