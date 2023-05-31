import { useState, useEffect } from 'react';
import { fetchCommentsByArticleId } from '../utils';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Comment({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(articleId).then((res) => {
      setComments(res.comment);
      setIsLoading(false);
    });
  }, [articleId]);

  if (isLoading) {
    return (
      <BeatLoader
        color={'#ffffff'}
        loading={isLoading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
        margin={20}
      />
    );
  }

  return (
    <section>
      <ul>
        {comments.map((comment) => {
          const { comment_id, body, author, votes } = comment;

          const dateString = comment.created_at;
          const dateObj = new Date(dateString);
          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC',
          };
          const formattedDate = dateObj.toLocaleString('en-UK', options);

          return (
            <li key={comment_id}>
              <section className="comments-section">
                <p>{body}</p>
                <div className="comments-flex">
                  <p className="comment-detail">Posted by: {author}</p>
                  <p className="comment-detail">Date posted: {formattedDate}</p>
                  <p className="comment-detail">Votes: {votes}</p>
                </div>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
