import React from "react";

import styles from "./LoginWindow.module.css";

export default function LoginWindow({ togglePopup, signIn }) {
  return (
    <div className={`${styles.blur}`}>
      <div className={`${styles.loginPopup}`}>
        <div className={`${styles.exitButtonFlex}`}>
          <button className={`${styles.exitButton}`} onClick={togglePopup}>
            X
          </button>
        </div>
        <div className={`${styles.loginForm}`}>
          Log In
          <button className={`${styles.loginButton}`} onClick={signIn}>
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
}
