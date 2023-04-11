import styles from "./BlogCard.module.css";

// mock data
const fetchMockData = () => ({
  tags: ["technology", "basketball", "trinh", "hello"],
  blogName: "blogName",
  authorName: "authorName",
  totalPosts: 22,
  createdAt: "February 4, 2020",
  description: "This is truly one of the blogs of all time.",
});
const mockProps = fetchMockData();
// mock end

const BlogCard = (props) => {
  const { tags, blogName, authorName, totalPosts, createdAt, description } = mockProps;

  const handleTags = () => {
    if (tags == null) return;
    return tags.map((tag) => <span key={tag}>{tag}</span>);
  };

  return (
    <fieldset className={`${styles.container} ${styles.futureStyle}`}>
      <legend className={styles.legend}>blog</legend>
      <div>
        <div className={styles.tags}>{handleTags()}</div>
        <div className={styles.blogName}>{blogName}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.authorName}>{authorName}</div>
        <div className={styles.posts}>{totalPosts} posts</div>
      </div>
    </fieldset>
  );
};

export default BlogCard;
