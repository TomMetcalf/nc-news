import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { postComment } from '../utils';
import { Link } from 'react-router-dom';

export default function CommentAdder({ setComments }) {
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [loginAlert, setLoginAlert] = useState(false);
  const [commentAlert, setCommentAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.username === 'Logged Out') {
      setLoginAlert(true);
      return;
    }

    if (newComment.length === 0) {
      setCommentAlert(true);
      return;
    }

    postComment(user.username, newComment, article_id).then(
      (newCommentFromApi) => {
        setNewComment('');
        setComments((currComments) => {
          console.log(currComments);
          return [...currComments, newCommentFromApi];
        });
      }
    );
  };

  const handleTextareaFocus = () => {
    setCommentAlert(false);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label className="add-comment-label" htmlFor="new-comment">
        Add a comment:
      </label>
      <textarea
        name="new-comment"
        id="new-comment"
        mutliline="true"
        onChange={(e) => setNewComment(e.target.value)}
        onFocus={handleTextareaFocus}
      ></textarea>
      <div className="form-username">
        <label className="username-details" htmlFor="">
          Username:
        </label>
        <span className="username-details">{user.username}</span>
      </div>
      {loginAlert && (
        <div className='user-warning'>
          <p className="comment-warning">
            Please log in as a user to post a comment.
            <Link className="comment-user-link" to={'/users'}>
              Click to select User
            </Link>
          </p>
        </div>
      )}
      {commentAlert && (
        <p className="comment-warning">Please add a comment before posting!</p>
      )}
      <button className="post-comment-btn">Post comment</button>
    </form>
  );
}
