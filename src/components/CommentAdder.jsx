export default function CommentAdder() {
    return (
      <form className="comment-form">
        <label className="add-comment-label" htmlFor="new-comment">Add a comment:</label>
        <textarea
          name="new-comment"
          id="new-comment"
          mutliline="true"
        ></textarea>
        <button className="post-comment-btn">Post comment</button>
      </form>
    );
}