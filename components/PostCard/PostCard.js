import Image from "next/image";

import stockPhoto from "@/public/StockPhotos/stockPhoto";
import styles from "./PostCard.module.css";

const mockProps = () => ({
  id: 1234,
  blogName: "blogName",
  authorName: "authorName",
  title: "The Awesome Title",
  slug: "slug",
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  createdAt: "August 11, 2000",
});
const data = mockProps();

const PostCard = (props) => {
  const { blogName, authorName, title, text, createdAt } = data;
  const photo = stockPhoto();

  // TODO: take a substring of text
  const handleText = () => {
    const result = text.substring(0, 325);
    return result + "...";
  };

  return (
    <div className={styles.root}>
      <Image src={photo} alt="" width={275} className={styles.image} />
      <fieldset className={styles.container}>
        <legend className={styles.legend}>article</legend>
        {/* TODO: implement tags */}
        <div className={styles.tags}>tags</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <div>{authorName}</div>
          <span>&#8226;</span>
          {/* TODO: format date */}
          <div>{createdAt}</div>
        </div>
        <div className={styles.content}>{handleText()}</div>
      </fieldset>
    </div>
  );
};

export default PostCard;
