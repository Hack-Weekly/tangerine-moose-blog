"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import Button from "@/components/Button/Button";
import { useAuth } from "@/providers/AuthProvider";
import useCreateBlog from "./hooks/useCreateBlog";
import styles from "./page.module.css";

const NewBlog = () => {
  const { user, loading } = useAuth();
  const [blogName, setBlogName] = useState("");
  const [fetchData, status, data] = useCreateBlog();

  const handleSubmit = () => fetchData({ uid: user.uid, blogName: blogName });

  if (loading) {
    return <div>LOADING ...</div>;
  } else if (user) {
    switch (status) {
      case "not_started":
        return (
          <div className={styles.container}>
            <div className={styles.input}>
              <label htmlFor="blogName">Blog Name</label>
              <input
                required
                type="text"
                className={styles.blogInput}
                name="blogInput"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
            </div>
            <Button className={styles.submit} type="submit" onClick={handleSubmit}>
              create
            </Button>
          </div>
        );
      case "loading":
        return <div>LOADING ...</div>;
      case "loaded":
        console.log("data once loaded", data);
        redirect(`/${blogName}`);
      case "error":
        return <div>ERROR, RETRY</div>;
      default:
        break;
    }
  }
};

export default NewBlog;
