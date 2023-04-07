import Link from "next/link";

import { useAuth } from "@/providers/AuthProvider";
import styles from "./UserMenu.module.css";

export default function UserMenu({ user, toggleDropdown }) {
  const { signOut } = useAuth();
  const NavButton = ({ children }) => <div onClick={toggleDropdown}>{children}</div>;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>{user.displayName}</div>
        <div className={styles.email}>{user.email}</div>
      </div>
      <div className={styles.body}>
        {user.blogName ? (
          <Link className={styles.link} href={`/${user.blogName}/new`}>
            <NavButton>Write a Post</NavButton>
          </Link>
        ) : (
          <Link className={styles.link} href={`/new`}>
            <NavButton>Create a Blog</NavButton>
          </Link>
        )}
        <Link className={styles.link} href="/" onClick={signOut}>
          <NavButton>Logout</NavButton>
        </Link>
      </div>
    </div>
  );
}
