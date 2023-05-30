import { useEffect, useState } from 'react';
import { fetchArticles } from '../utils';
import BeatLoader from 'react-spinners/BeatLoader';

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
            created_at,
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
          const formattedDate = dateObj.toLocaleString('en-US', options);

          return (
            <li key={article_id}>
              <article className="article-home">
                <h2>{title}</h2>

                <img
                  className="article-image-list"
                  src={article_img_url}
                  alt={title}
                />
                <div className="article-details-home">
                  <p>Author: {author}</p>
                  <p>Topic: {topic}</p>
                  <p>Comments: {comment_count}</p>
                  <p>Published: {formattedDate}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
