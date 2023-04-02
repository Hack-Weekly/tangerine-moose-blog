import DefaultTags from "./default-tags";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <DefaultTags />
      <nav>nav</nav>
      <main className={styles.main}>main</main>
      <footer>footer</footer>
    </div>
  );
}
