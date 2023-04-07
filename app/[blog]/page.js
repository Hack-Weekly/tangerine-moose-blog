import Image from "next/image";

import kid from "../../public/kid.png";
import styles from "./page.module.css";

const Blog = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.banner}></div>
      <div className={styles.container}>
        <div className={styles.article}>
          <h1 className={styles.title}>{props.title}The Worlds Most Dangerous Technology Ever Made.</h1>
          <h2 className={styles.author}>{props.author}thebeatlesphan April 4, 2020 (10 min read)</h2>
          <h3 className={styles.tags}>{props.tag}#technology #basketball #trinh</h3>
          <div className={styles.content}>
            <p>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.&quot;
            </p>
            <p>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.&quot;
            </p>
            <p>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.&quot;
            </p>
          </div>
          <div className={styles.authorInfoContainer}>
            <h3>ABOUT THE AUTHOR</h3>
            <div className={styles.authorInfo}>
              <Image src={kid} alt="Author logo" width={125} className={styles.authorAvatar} />
              <div>
                <div className={styles.authorName}>thebeatlesphan</div>
                <div className={styles.authorHandle}>@trinhandandy</div>
                <p className={styles.authorDescription}>
                  &quot;If you use this site regularly and would like to help keep the site on the Internet, please
                  consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum
                  donation, any sum is appreciated&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
