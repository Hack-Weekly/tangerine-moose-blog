import { useFormatter, useTranslations } from "next-intl";

import Comment from "./Comment";

const CommentList = ({ comments }) => {
  const t = useTranslations("PostActions");
  const format = useFormatter();

  const actions = [
    { label: t("edit"), onClick: () => {} },
    { label: t("delete"), onClick: () => {} },
  ];

  return (
    <>
      {comments.map(({ id, userId, createdAt, text }) => (
        <Comment
          key={id}
          userId={userId}
          createdAt={t("posted", { time: format.relativeTime(new Date(createdAt.seconds * 1000)) })}
          text={text}
          actions={actions}
        />
      ))}
    </>
  );
};

export default CommentList;
