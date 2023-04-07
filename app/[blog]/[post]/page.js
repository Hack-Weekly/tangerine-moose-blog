"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Markdown from "marked-react";
import moment from "moment";

import CommentList from "./CommentList";
import CommentEditor from "./components/CommentEditor";
import PostButtons from "./components/PostButtons";
import Reactions from "./components/Reactions";
import getPost from "./hooks/useGetPost";
import styles from "./page.module.css";

// mock data + api: ignore for now
const useCurrentUser = () => ({ blog: useSearchParams().get("blog") }); // `?blog=TestBlog` in URL to test author view
const submitComment = (user, text) => console.log(`submitting comment ${text} by ${user}`);
// mock end

const BlogPost = () => {
  const path = usePathname();
  const [blogName, postSlug] = path.split("/").slice(-2);
  const currentUser = useCurrentUser();
  const [data, setData] = useState(null);
  const [replying, setReplying] = useState(false);

  const handleCommentSubmit = (commentText) => {
    setReplying(false);
    submitComment(currentUser, commentText);
  };

  useEffect(() => {
    getPost({ blogName: blogName, postSlug: postSlug }).then((res) => setData(res));
  }, [blogName, postSlug]);

  if (!data) return <div>loading...</div>;
  if (data) {
    const { title, text, authorName, postSlug, createdAt, updatedAt, reactions, comments } = data;
    const isAuthor = blogName === currentUser.blog;
    const commentList = JSON.parse(comments);
    const [created, updated] = [createdAt, updatedAt].map((t) => ({
      short: moment(new Date(t.seconds * 1000)).fromNow(),
      long: new Date(t.seconds * 1000).toLocaleTimeString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.text}>
          <Markdown value={text} />
          <div className={styles.reacts}>
            <Reactions reactions={JSON.parse(reactions)} />
          </div>
        </div>
        <p className={styles.byline}>
          {`submitted `}
          <div className={styles.byline} title={created.long}>
            {created.short}
          </div>
          {` (last edited `}
          <div className={styles.byline} title={updated.long}>
            {updated.short}
          </div>{" "}
          {`) by `} <a href={`/${blogName}`}>{authorName}</a>
        </p>
        <PostButtons
          postSlug={postSlug}
          isAuthor={isAuthor}
          replyCount={commentList.length}
          onReply={() => setReplying(true)}
        />
        {replying && <CommentEditor onReplySubmit={handleCommentSubmit} />}
        <CommentList comments={commentList} />
      </div>
    );
  }
};

export default BlogPost;
