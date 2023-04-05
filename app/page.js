import React from "react";
import Image from "next/image";

import mockBlogs from "../data/mockBlogs.js";
import styles from "./page.module.css";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Image className={styles.logo} src="/images/TMoose.png" alt="Moose" width={100} height={100} />
      <div className={styles.container}>
        <main className={styles.blogs}>
          {mockBlogs.map((blog, index) => (
            <div key={index} className={styles.blog}>
              <h2>{blog.title}</h2>
              <i>{blog.author}</i>
              <p>{blog.blog}</p>
            </div>
          ))}
        </main>
        {/* <footer className={styles.footer}>footer</footer> */}
      </div>
    </>
  );
}
