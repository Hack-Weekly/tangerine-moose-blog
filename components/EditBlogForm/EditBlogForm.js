"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./EditBlogForm.module.css";

export default function EditBlogForm({ onSuccess }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) {
      if (user.blogName) {
        setName(`${user.displayName}'s Blog`);
      }
      if (user.blogDescription) {
        setDescription("This is my blog");
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    // TODO: write the logic to update the blog
    e.preventDefault();
    onSuccess && onSuccess();
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
