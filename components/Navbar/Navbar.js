"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Avatar from "@/components/Avatar/Avatar";
import UserMenu from "@/components/UserMenu/UserMenu";
import users from "@/data/users";
import styles from "./Navbar.module.css";

export default function Navbar() {
  // TODO: Get the current user from the session
  const user = users[9];
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.menu}>
            <Link href="/" className={styles.link}>
              Logo
            </Link>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </div>
          <div className={styles.menu}>
            <Link href={"/login"} className={styles.login}>
              Login
            </Link>
            <div className={styles.dropdown} ref={dropdown}>
              <button className={styles.button} type={"button"} onClick={() => setShowDropdown(true)}>
                <Avatar avatar={user.avatar} name={user.name} />
              </button>
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <UserMenu user={user} />
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
