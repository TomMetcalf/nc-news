import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import TopicList from './components/TopicList';
import Article from './components/Article';
import UserList from './components/UserList';
import { useState } from 'react';
//import { UserContext } from './contexts/UserContext';

function App() {
  const [userList, setUserList] = useState([]);

  // const [user, setUser] = useState({
  //   username: 'Logged Out',
  // });

  return (
    <div>
      <BrowserRouter>
        {/* <UserContext.Provider value={{ user, setUser }}> */}
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticleList />}></Route>
          <Route path="/topics" element={<TopicList />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
          <Route
            path="/users"
            element={<UserList userList={userList} setUserList={setUserList} />}
          ></Route>
        </Routes>
        {/* </UserContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
