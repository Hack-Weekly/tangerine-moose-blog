import { VscError } from "react-icons/vsc";

import styles from "./FlashMessage.module.css";

export default function FlashMessage({ message }) {
  console.log("message: ", message);
  return (
    <div className={styles.error}>
      <VscError size={22} />
      <div>{message}</div>
    </div>
  );
}
