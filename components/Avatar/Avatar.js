import Image from "next/image";
import clsx from "clsx";

import mooseLogo from "../../public/moose.png";
import styles from "./Avatar.module.css";

export default function Avatar({ className, avatar, name, size = 40, loading = false }) {
  return (
    <div className={clsx(styles.root, className)} style={{ width: size, height: size }}>
      {loading ? (
        <div className={styles.loading}></div>
      ) : (
        <Image src={avatar || mooseLogo} alt={name || ""} width={size} height={size} />
      )}
    </div>
  );
}
