"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

export default function Modal({ open, onClose, dismissible = true, children, className }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      onClose && onClose();
    }
  }, [onClose, open]);

  return (
    open &&
    createPortal(
      <div className={clsx(styles.root, { [styles.open]: open })}>
        <div className={styles.overlay} onClick={() => dismissible && onClose && onClose()} />
        <div className={styles.dialog}>
          <div className={clsx(styles.content, className)}>{children}</div>
        </div>
      </div>,
      document.body,
    )
  );
}
