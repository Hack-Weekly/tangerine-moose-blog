import { Link } from "next-intl";
import { VscArchive } from "react-icons/vsc";

import styles from "./BlogCard.module.css";

const BlogCard = ({ blogWithUser, className }) => {
  return (
    <Link href={`/${blogWithUser.slug}`} className={`${styles.root} ${className}`}>
      <fieldset className={`${styles.container} ${styles.className}`}>
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
