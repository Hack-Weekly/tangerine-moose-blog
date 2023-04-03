import Image from "next/image";

import styles from "./Avatar.module.css";

export default function Avatar({ avatar, name }) {
  return (
    <div className={styles.root}>
      <Image src={avatar} alt={name} width={40} height={40} />
    </div>
  );
}
