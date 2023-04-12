import Image from "next/image";
import Link from "next/link";

import stockPhoto from "@/public/StockPhotos/stockPhoto";
import styles from "./PostCard.module.css";

const PostCard = (props) => {
  const photo = stockPhoto();

  const handleText = () => {
    if (props.text == null) return;
    const result = props.text.substring(0, 250);
    return result + "...";
  };

  const handleTags = () => {
    const result = props.tags.slice(0, 3);
    return result.map((tag) => <span key={tag}>{tag}</span>);
  };

  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  const formattedDate = new Date(props.createdAt.seconds * 1000).toLocaleDateString(undefined, options);

  return (
    <Link href={`/${props.bodySlug}/${props.slug}`} className={`${styles.root} ${styles.futureStyle}`}>
      <Image src={photo} alt="" width={275} height={366} className={styles.image} />
      <fieldset className={styles.container}>
        <legend className={styles.legend}>article</legend>
        {/* TODO: implement tags */}
        <div className={styles.tags}>{handleTags()}</div>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.info}>
          <div>{props.displayName}</div>
          <span>&#8226;</span>
          {/* TODO: format date */}
          <div>{formattedDate}</div>
        </div>
        <div className={styles.content}>{handleText()}</div>
      </fieldset>
    </Link>
  );
};

export default PostCard;
