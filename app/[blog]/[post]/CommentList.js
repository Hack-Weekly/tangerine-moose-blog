import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map(({ id, user, text }) => (
        <Comment key={id} id={id} user={user} text={text} />
      ))}
    </>
  );
};

export default CommentList;
