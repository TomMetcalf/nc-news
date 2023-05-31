import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import TopicList from './components/TopicList';
import Article from './components/Article';
import UserList from './components/UserList';
import { useEffect, useState } from 'react';
import { fetchUsers } from './utils';
import BeatLoader from 'react-spinners/BeatLoader';

function App() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((users) => {
      setUserList(users);
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
    <BrowserRouter>
      <>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticleList />}></Route>
          <Route path="/topics" element={<TopicList />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
          <Route
            path="/users"
            element={<UserList userList={userList} />}
          ></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
