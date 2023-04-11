import kid from "../../public/kid.png";
import AuthorCard from "../AuthorCard/AuthorCard";
import PostCard from "../PostCard/PostCard";
import styles from "./Featured.module.css";

// mock user data
const fetchMockData = (slug) => ({
  id: 1234,
  authorAvatar: kid,
  displayName: "trinh andy",
  blog: "Bob's Law Blog",
  email: "admin@trinhandandy.com",
  authorDescription:
    "When the tangerine moose first heard about the concept of 'orange is the new black,' he couldn't help but feel a little personally offended.",
  authorLinks: ["x", "y", "z"],
});
const data = fetchMockData();
// mock end

const Featured = (props) => {
  return (
    <div className={styles.root}>
      <h2>FEATURED ARTICLE</h2>
      <PostCard />
      <AuthorCard {...data} futureStyle={styles.author} />
    </div>
  );
};

export default Featured;
