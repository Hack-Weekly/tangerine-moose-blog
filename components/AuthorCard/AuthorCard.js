import Image from "next/image";
import Link from "next/link";

import kid from "../../public/kid.png";
import styles from "./AuthorCard.module.css";

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

const AuthorCard = (props) => {
  const { authorAvatar, displayName, blog, email, authorDescription, authorLinks } = data; // destructure props
  const handleLinks = () => {
    return authorLinks.map((link) => (
      <span key={link} className={styles.link}>
        {link}
      </span>
    ));
  };

  return (
    <div className={styles.root}>
      <Image src={authorAvatar} alt="avatar" width={125} className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.displayName}>{displayName}</div>
        <div className={styles.email}>{email}</div>
        <div className={styles.description}>{authorDescription}</div>
        <Link href="/about" className={styles.blog}>
          {blog}
        </Link>
        <div className={styles.links}>{handleLinks()}</div>
      </div>
    </div>
  );
};

export default AuthorCard;
