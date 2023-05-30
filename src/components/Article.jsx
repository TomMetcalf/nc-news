import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleById } from '../utils';
import BeatLoader from 'react-spinners/BeatLoader';

export default function singleArticle() {
  const [currentArticle, setCurrentArticle] = useState({});
  const [isLoading, setIsLoading] = useState();
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id).then(({ article }) => {
      setCurrentArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

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

  const { title, article_img_url, body, topic, author } = currentArticle;

  const dateString = currentArticle.created_at;
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
    <main>
      <h2>{title}</h2>
      <div className="article-img-body">
        <p className="article-body">{body}</p>
        <img className="article-img" src={article_img_url} alt={title} />
      </div>
      <div className="article-headings">
        <p>Category: {topic}</p>
        <p>Author: {author}</p>
        <p>Published: {formattedDate}</p>
      </div>
      <Link to={'/'}>Click to return to article list</Link>
    </main>
  );
}
