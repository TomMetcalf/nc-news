import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: 'https://nc-news-r5n7.onrender.com/api',
});

export function fetchArticles() {
  return ncNewsApi
    .get('/articles')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

export function fetchArticleById(article_id) {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

export function fetchCommentsByArticleId(article_id) {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

export function patchArticleVote(article_id, votes) {
  const patchVotes = {
    inc_votes: votes,
  };

  return ncNewsApi.patch(`/articles/${article_id}`, patchVotes).then((data) => {
    return data;
  });
}
