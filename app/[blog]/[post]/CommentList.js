import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map(({ id, userId, createdAt, text }) => (
        <Comment key={id} userId={userId} createdAt={createdAt} text={text} />
      ))}
    </>
  );
};

export default CommentList;
