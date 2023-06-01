import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import TopicList from './components/TopicList';
import TopicFilteredList from './components/TopicFilteredList';
import Article from './components/Article';
import UserList from './components/UserList';
import { useEffect, useState } from 'react';
import { fetchUsers } from './utils';
import BeatLoader from 'react-spinners/BeatLoader';
import { UserContext } from './contexts/UserContext';

function App() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [selectedTopic, setSelectedTopic] = useState('');

  const [user, setUser] = useState({
    username: 'Logged Out',
  });

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
      <UserContext.Provider value={{ user, setUser }}>
        <main>
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<ArticleList />}></Route>
            <Route
              path="/topics"
              element={
                <TopicList
                  selectedTopic={selectedTopic}
                  setSelectedTopic={setSelectedTopic}
                />
              }
            ></Route>
            <Route path="/articles/:article_id" element={<Article />}></Route>
            <Route
              path="/users"
              element={<UserList userList={userList} />}
            ></Route>
            <Route
              path="/topics/:selectedTopic"
              element={<TopicFilteredList />}
            ></Route>
          </Routes>
        </main>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
