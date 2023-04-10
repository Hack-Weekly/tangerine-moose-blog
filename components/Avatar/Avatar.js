import Image from "next/image";

import mooseLogo from "../../public/moose.png";
import styles from "./Avatar.module.css";

export default function Avatar({ avatar, name, loading = false }) {
  return (
    <div className={styles.root}>
      {loading ? (
        <div className={styles.loading}></div>
      ) : (
        <Image src={avatar || mooseLogo} alt={name || ""} width={40} height={40} />
      )}
    </div>
  );
}
