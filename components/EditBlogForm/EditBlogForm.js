"use client";

import { useEffect, useState } from "react";
import slugify from "@sindresorhus/slugify";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { createBlog, updateBlog } from "@/firebase/utils/blogUtils";
import { updateUser } from "@/firebase/utils/userUtils";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./EditBlogForm.module.css";

export default function EditBlogForm({ onSuccess }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user.blog) {
      setName(user.blog);
    } else {
      setName(`${user.displayName}'s Blog`);
    }

    if (user.blogDescription) {
      setDescription(user.blogDescription);
    }
  }, [user.blog, user.blogDescription, user.displayName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // if user already has a blog, update it
      if (user.blogId) {
        await updateBlog(user.blogId, {
          name: name.trim(),
          description: description.trim(),
        });
        await updateUser(user.uid, {
          blog: name.trim(),
          blogDescription: description.trim(),
        });
        onSuccess && onSuccess();
      } else {
        // if user doesn't have a blog, create one
        const blogRef = await createBlog({
          name: name.trim(),
          description: description.trim(),
          userId: user.uid,
        });

        // add slug to blog
        const slug = slugify(`${name}-${blogRef.id.substring(0, 5)}`);
        await updateBlog(blogRef.id, { slug: slug });
        // add blog id to user
        await updateUser(user.uid, {
          blog: name.trim(),
          blogId: blogRef.id,
          blogSlug: slug,
          blogDescription: description.trim(),
        });
        onSuccess && onSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Create your blog</h2>
      <form className={styles.body} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="name">
            Blog Name
          </label>
          <Input required name={"name"} type={"text"} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className={styles.label} htmlFor="description">
            Description (Optional)
          </label>
          <Input
            name={"description"}
            type={"text"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" className={styles.button} disabled={name.length === 0}>
          Start Blogging
        </Button>
      </form>
    </div>
  );
}
