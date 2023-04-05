"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

const useCreateBlog = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("not_started");

  const fetchData = async (formData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/createBlog/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("datafetchdata: ", data);
      setData(data);
      setStatus("loaded");
    } catch (err) {
      setData(err);
      setStatus("error");
    }
  };

  return [fetchData, status, data];
};

const NewBlog = () => {
  const [blogName, setBlogName] = useState("");
  const [fetchData, status, data] = useCreateBlog();
  const router = useRouter();

  const handleSubmit = () => {
    fetchData({ blog: blogName, author: "TestUser", title: blogName });
  };

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
          <button className={styles.submit} type="submit" onClick={handleSubmit}>
            create
          </button>
        </div>
      );
    case "loading":
      return <div>LOADING ...</div>;
    case "loaded":
      console.log("data loaded", data);
      router.push(`/${data.blog}`);
      break;
    case "error":
      return <div>ERROR, RETRY</div>;
    default:
      break;
  }
};

export default NewBlog;
