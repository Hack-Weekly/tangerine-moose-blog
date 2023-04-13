import moment from "moment";
import { useTranslations } from "next-intl";

import Comment from "./Comment";

const CommentList = ({ comments }) => {
  const t = useTranslations("PostActions");
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
          createdAt={t("posted", { time: moment.unix(createdAt.seconds).fromNow() })}
          text={text}
          actions={actions}
        />
      ))}
    </>
  );
};

export default CommentList;
