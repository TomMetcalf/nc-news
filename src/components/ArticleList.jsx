import { useEffect, useState } from 'react';
import { fetchArticles } from '../utils';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link } from 'react-router-dom';

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then((articles) => {
        return articles;
      })
      .then((articles) => {
        setArticleList(articles.articles);
        setIsLoading(false);
      });
  }, []);

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
    <main className="article-list">
      <ul>
        {articleList.map((article) => {
          const {
            article_id,
            title,
            author,
            topic,
            article_img_url,
            comment_count,
          } = article;

          const dateString = article.created_at;
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
            <li key={article_id}>
              <article className="article-home">
                <Link to={`/articles/${article.article_id}`}>
                  <h2 className="article-title-link">{title}</h2>
                </Link>
                <Link to={`/articles/${article.article_id}`}>
                  <img
                    className="article-image-list"
                    src={article_img_url}
                    alt={title}
                  />
                </Link>
                <div className="article-details-home">
                  <p className="article-list-detail">Author: {author}</p>
                  <p className="article-list-detail">Topic: {topic}</p>
                  <p className="article-list-detail">
                    Comments: {comment_count}
                  </p>
                  <p className="article-list-detail">
                    Published: {formattedDate}
                  </p>
                </div>
                <Link to={`/articles/${article.article_id}`}>
                  <p className="view-article">Click to view this article</p>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
