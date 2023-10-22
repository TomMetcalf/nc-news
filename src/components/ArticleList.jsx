import { useEffect, useState } from 'react';
import { fetchArticles } from '../api';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link } from 'react-router-dom';
import BackToTop from './BackToTop';

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  let [sortBy, setSortBy] = useState('created_at');
  let [order, setOrder] = useState('desc')

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(sortBy, order)
      .then((articles) => {
        return articles;
      })
      .then((articles) => {
        setArticleList(articles.articles);
        setIsLoading(false);
      });
  }, [sortBy, order]);

  if (isLoading) {
    return (
      <>
        <BeatLoader
          color={'#ffffff'}
          loading={isLoading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
          margin={20}
        />
        <p>Loading Articles...</p>
      </>
    );
  }

  return (
    <main className="article-list">
      <section className="sort-order">
        <label className="sort-order-label" htmlFor="sort-by">
          Sort by:{' '}
        </label>
        <select
          className="sort-order-dropdown"
          onChange={(event) => setSortBy(event.target.value)}
          value={sortBy}
          name="sort-by"
          id="sort-by"
        >
          <option value="created_at">Published</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <label className="sort-order-label" htmlFor="order">
          Order:
        </label>
        <select
          className="sort-order-dropdown"
          onChange={(event) => setOrder(event.target.value)}
          value={order}
          name="order"
          id="order"
        >
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
      </section>
      <ul>
        {articleList.map((article) => {
          const {
            article_id,
            title,
            author,
            topic,
            article_img_url,
            comment_count,
            votes,
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
                <section className="article-position">
                  <div className="article-image-position">
                    <Link to={`/articles/${article.article_id}`}>
                      <img
                        className="article-image-list"
                        src={article_img_url}
                        alt={title}
                      />
                    </Link>
                  </div>
                  <div className="article-details-position">
                    <div className="article-details-home">
                      <p className="article-list-detail">Author: {author}</p>
                      <p className="article-list-detail">Topic: {topic}</p>
                      <p className="article-list-detail">
                        Comments: {comment_count}
                      </p>
                      <p className="article-list-detail">Votes: {votes}</p>
                      <p className="article-list-detail">
                        Published: {formattedDate}
                      </p>
                    </div>
                    <Link to={`/articles/${article.article_id}`}>
                      <p className="view-article">Click to view this article</p>
                    </Link>
                  </div>
                </section>
              </article>
            </li>
          );
        })}
      </ul>
      <BackToTop />
    </main>
  );
}
