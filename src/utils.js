import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: 'https://nc-news-r5n7.onrender.com/api',
});

export function fetchArticles() {
  return ncNewsApi.get('/articles').then((res) => {
    return res.data;
  });
}

export function fetchArticleById(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data;
  });
}

