import styles from "./BlogCard.module.css";

const BlogCard = (props) => {
  return (
    <fieldset className={styles.container}>
      <legend className={styles.legend}>blog</legend>
    </fieldset>
  );
};

export default BlogCard;
