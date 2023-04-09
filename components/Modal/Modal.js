"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

export default function Modal({ open, close, closeOnOutsideClick = true, children, className }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    open &&
    createPortal(
      <div className={clsx(styles.root, { [styles.open]: open })}>
        <div className={styles.overlay} onClick={() => closeOnOutsideClick && close && close()} />
        <div className={styles.dialog}>
          <div className={clsx(styles.content, className)}>{children}</div>
        </div>
      </div>,
      document.body,
    )
  );
}
