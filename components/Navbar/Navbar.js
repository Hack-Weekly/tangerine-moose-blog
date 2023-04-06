"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Avatar from "@/components/Avatar/Avatar";
import UserMenu from "@/components/UserMenu/UserMenu";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./Navbar.module.css";
import Moose from "./moose.png";

export default function Navbar() {
  const { user, loading, signIn } = useAuth();
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
            <Image src={Moose} alt="Moos logo" width={35} height={35} />
            <Link href="/" className={styles.link}>
              Moos
            </Link>
          </div>
          <div className={styles.menu}>
            {loading && <Avatar loading />}
            {!loading && !user && (
              <button onClick={signIn} className={styles.login}>
                Login
              </button>
            )}
            {!loading && user && (
              <div className={styles.dropdown} ref={dropdown}>
                <button className={styles.button} type={"button"} onClick={() => setShowDropdown(true)}>
                  <Avatar avatar={user.photoURL} name={user.displayName} />
                </button>
                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    <UserMenu user={user} />
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
