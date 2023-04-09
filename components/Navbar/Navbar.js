"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Avatar from "@/components/Avatar/Avatar";
import UserMenu from "@/components/UserMenu/UserMenu";
import { useAuth } from "@/providers/AuthProvider";
import Moose from "../../public/moose.png";
import LoginWindow from "../LoginWindow/LoginWindow";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, loading, signIn } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdown = useRef(null);

  const togglePopup = () => setShowPopup(!showPopup);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowPopup(false);
  }, [user]);

  return (
    <>
      <div className={`${styles.root} ${isScrolled && styles.scrolled}`}>
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
                <button onClick={togglePopup} className={styles.login}>
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
        <div className={styles.pages}>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/new" className={styles.link}>
            Blog
          </Link>
          <Link href="/" className={styles.link}>
            Contact
          </Link>
          <Link href="/" className={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
      {showPopup && <LoginWindow togglePopup={togglePopup} signIn={signIn} />}
    </>
  );
}
