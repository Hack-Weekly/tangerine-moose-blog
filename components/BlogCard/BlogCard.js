import kid from "../../public/kid.png";
import styles from "./BlogCard.module.css";

// mock data/api
const fetchMockBlog = (slug) => ({
  uid: 123456789,
  authorName: "trinh andy",
  blogName: "Bob's Law Blog",
  createdAt: "January 69, 2031",
  description:
    "The Tangerine Moose: A Tale of Friendship and Adventure - A tangerine moose's journey to find its place in the forest.",
});

const fetchMockUser = (slug) => ({
  id: 1234,
  authorAvatar: kid,
  displayName: "trinh andy",
  blog: "Bob's Law Blog",
  email: "admin@trinhandandy.com",
  authorDescription:
    "When the tangerine moose first heard about the concept of 'orange is the new black,' he couldn't help but feel a little personally offended.",
  authorLinks: ["x", "y", "z"],
});

const blogData = fetchMockBlog();
const userData = fetchMockUser();

const BlogCard = (props) => {
  const { uid, authorName, blogName, createdAt, description } = blogData;
  const { id, authorAvatar, blog, email, authorDescription, authorLinks } = userData;

  return (
    <div className={styles.root}>
      <div className={styles.blog}>
        <div className={styles.authorName}>{authorName}</div>
        <div className={styles.blogName}>{blogName}</div>
        <div className={styles.created}>{createdAt}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.author}></div>
    </div>
  );
};

export default BlogCard;
