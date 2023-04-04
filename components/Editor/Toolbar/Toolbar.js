import {
  IconArrowBackUp,
  IconArrowForward,
  IconBold,
  IconClearFormatting,
  IconCode,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconItalic,
  IconLineDashed,
  IconList,
  IconListNumbers,
  IconQuote,
  IconStrikethrough,
} from "@tabler/icons-react";
import clsx from "clsx";

import styles from "./Toolbar.module.css";

export default function Toolbar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.root}>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("bold") })}
        title={"Bold"}
      >
        <IconBold />
      </button>

      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("italic") })}
        title={"Italic"}
      >
        <IconItalic />
      </button>

      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("strike") })}
        title={"Strike through"}
      >
        <IconStrikethrough />
      </button>

      <button
        type={"button"}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={styles.button}
        title={"Clear formatting"}
      >
        <IconClearFormatting />
      </button>

      <div className={styles.separator} />

      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("heading", { level: 2 }) })}
        title={"Heading 2"}
      >
        <IconH2 />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("heading", { level: 3 }) })}
        title={"Heading 3"}
      >
        <IconH3 />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("heading", { level: 4 }) })}
        title={"Heading 4"}
      >
        <IconH4 />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("heading", { level: 5 }) })}
        title={"Heading 5"}
      >
        <IconH5 />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("heading", { level: 6 }) })}
        title={"Heading 6"}
      >
        <IconH6 />
      </button>

      <div className={styles.separator} />
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("code") })}
        title={"Code"}
      >
        <IconCode />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("blockquote") })}
        title={"Blockquote"}
      >
        <IconQuote />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("orderedList") })}
        title={"Ordered list"}
      >
        <IconListNumbers />
      </button>

      <button
        type={"button"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx(styles.button, { [styles.active]: editor.isActive("bulletList") })}
        title={"Bullet list"}
      >
        <IconList />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={styles.button}
        title={"Horizontal rule"}
      >
        <IconLineDashed />
      </button>

      <div className={styles.separator} />

      <button
        type={"button"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={styles.button}
        title={"Undo"}
      >
        <IconArrowBackUp />
      </button>
      <button
        type={"button"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={styles.button}
        title={"Redo"}
      >
        <IconArrowForward />
      </button>
    </div>
  );
}
