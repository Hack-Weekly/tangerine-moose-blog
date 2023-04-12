import Link from "next/link";
import { VscArchive } from "react-icons/vsc";

import styles from "./BlogCard.module.css";

// mock data
// const fetchMockData = () => ({
//   tags: ["technology", "basketball", "trinh", "hello"],
//   blogName: "blogName",
//   authorName: "authorName",
//   totalPosts: 22,
//   createdAt: "February 4, 2020",
//   description: "This is truly one of the blogs of all time.",
// });
// const mockProps = fetchMockData();
// mock end

const BlogCard = ({ blogWithUser }) => {
  // const handleTags = () => {
  //   if (tags == null) return;
  //   return tags.map((tag) => <span key={tag}>{tag}</span>);
  // };

  return (
    <Link href={`/${blogWithUser.slug}`} className={styles.root}>
      <fieldset className={`${styles.container} ${styles.futureStyle}`}>
        <legend className={styles.legend}>blog</legend>
        <div>
          <div className={styles.blogName}>{blogWithUser.name}</div>
          <div className={styles.description}>{blogWithUser.description}</div>
          <div className={styles.authorName}> {blogWithUser.user.displayName} </div>
          <div className={styles.posts}>
            <VscArchive /> {blogWithUser.totalPost} posts
          </div>
        </div>
      </fieldset>
    </Link>
  );
};

export default BlogCard;
