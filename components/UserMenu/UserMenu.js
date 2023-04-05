import Link from "next/link";

import { useAuth } from "@/providers/AuthProvider";
import styles from "./UserMenu.module.css";

export default function UserMenu({ user }) {
  const { signOut } = useAuth();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>{user.displayName}</div>
        <div className={styles.email}>{user.email}</div>
      </div>
      <div className={styles.body}>
        <Link className={styles.link} href={"/create"}>
          Write a Post
        </Link>
        <a className={styles.link} href={"#"} onClick={signOut} role={"button"}>
          Logout
        </a>
      </div>
    </div>
  );
}
