import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { postComment } from '../utils';

export default function CommentAdder({setComments}) {
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.username === 'Logged Out') {
      alert('Please log in as a user to post a comment.');
      return;
    }

    if (newComment.length === 0) {
      alert('Please add a comment before posting!');
      return;
    }

    postComment(user.username, newComment, article_id).then(
      (newCommentFromApi) => {

        setNewComment('')
        setComments((currComments) => {
            console.log(currComments)
            return [newCommentFromApi, ...currComments];
        })
      }
    );
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
      ></textarea>
      <div className="form-username">
        <label className="username-details" htmlFor="">
          Username:
        </label>
        <span className="username-details">{user.username}</span>
      </div>
      <button className="post-comment-btn">Post comment</button>
    </form>
  );
}
