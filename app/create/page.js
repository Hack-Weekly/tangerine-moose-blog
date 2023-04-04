import Editor from "@/components/Editor/Editor";
import styles from "./page.module.css";

export const metaData = {
  title: "New Post",
};

export default function CreatePost() {
  // TODO: Add form submission logic
  // TODO: Add more fields to the form (title, tags, etc.)

  return (
    <div className={styles.container}>
      <main>
        <h1>New Post</h1>
        <form>
          <Editor />
        </form>
      </main>
    </div>
  );
}
