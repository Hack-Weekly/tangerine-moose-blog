import { Link, useTranslations } from "next-intl";

import { useAuth } from "@/providers/AuthProvider";
import styles from "./UserMenu.module.css";

export default function UserMenu({ user, toggleDropdown }) {
  const t = useTranslations("navbar");
  const { signOut } = useAuth();
  const NavButton = ({ children }) => <div onClick={toggleDropdown}>{children}</div>;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>{user.displayName}</div>
        <div className={styles.email}>{user.email}</div>
      </div>
      <div className={styles.body}>
        {user && user.blogSlug && (
          <>
            <Link className={styles.link} href={`/${user.blogSlug}`}>
              <NavButton>{t("self_blog")}</NavButton>
            </Link>
            <Link className={styles.link} href={`/${user.blogSlug}/new`}>
              <NavButton>{t("write_post")}</NavButton>
            </Link>
          </>
        )}
        <Link className={styles.link} href="#" onClick={signOut}>
          {t("logout")}
        </Link>
      </div>
    </div>
  );
}
