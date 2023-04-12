import Image from "next/image";
import Link from "next/link";

import mooseLogo from "../../public/moose.png";
import styles from "./AuthorCard.module.css";

const AuthorCard = (props) => {
  const { authorAvatar, displayName, blog, authorDescription, authorLinks } = props;
  // const handleLinks = () => {
  //   if (authorLinks == undefined) {
  //     return;
  //   }
  //   return authorLinks.map((link) => (
  //     <span key={link} className={styles.link}>
  //       {link}
  //     </span>
  //   ));
  // };

  return (
    <div className={`${styles.root} ${props.className}`}>
      <Image src={authorAvatar || mooseLogo} alt="avatar" width={125} className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.displayName}>{displayName}</div>
        <Link href={`/${props.blogSlug}`} className={styles.blog}>
          {blog}
        </Link>
        <div className={styles.description}>{authorDescription || props.blogDescription}</div>
        {/* <div className={styles.links}>{handleLinks()}</div> */}
      </div>
    </div>
  );
};

export default AuthorCard;
