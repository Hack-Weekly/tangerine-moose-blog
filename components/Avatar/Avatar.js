import Image from "next/image";

import styles from "./Avatar.module.css";

export default function Avatar({ avatar, name, loading = false }) {
  // TODO: Upload a default avatar image
  return (
    <div className={styles.root}>
      {loading ? (
        <div className={styles.loading}></div>
      ) : (
        <Image src={avatar || "/default_avatar.svg"} alt={name || ""} width={40} height={40} />
      )}
    </div>
  );
}
