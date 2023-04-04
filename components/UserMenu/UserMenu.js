import Link from "next/link";

import styles from "./UserMenu.module.css";

export default function UserMenu({ user }) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>{user.name}</div>
      </div>
      <div className={styles.body}>
        <Link className={styles.link} href={`/create`}>
          Write a Post
        </Link>
        <Link className={styles.link} href={"/logout"}>
          Logout
        </Link>
      </div>
    </div>
  );
}
