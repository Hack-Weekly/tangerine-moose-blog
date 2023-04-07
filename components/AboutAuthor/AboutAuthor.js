import Image from "next/image";

import kid from "../../public/kid.png";
import styles from "./AboutAuthor.module.css";

// mock data/api
const fetchMockData = (slug) => ({
  id: 1234,
  authorAvatar: kid,
  authorUsername: "trinh",
  authorHandle: "@trinhandandy",
  authorDescription:
    "When the tangerine moose first heard about the concept of 'orange is the new black,' he couldn't help but feel a little personally offended.",
  authorLinks: ["x", "y", "z"],
});
const data = fetchMockData();
// mock end

const AboutAuthor = (props) => {
  const { authorAvatar, authorUsername, authorHandle, authorDescription, authorLinks } = data; // destructure props
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
        <div className={styles.username}>{authorUsername}</div>
        <div className={styles.handle}>{authorHandle}</div>
        <div className={styles.description}>{authorDescription}</div>
        <div className={styles.links}>{handleLinks()}</div>
      </div>
    </div>
  );
};

export default AboutAuthor;
