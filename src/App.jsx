import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import TopicList from './components/TopicList';
import TopicFilteredList from './components/TopicFilteredList';
import Article from './components/Article';
import UserList from './components/UserList';
import { useState } from 'react';
import { useTheme } from './contexts/ThemeContext';
import LightModeToggle from './components/LightModeToggle';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const { isDarkMode } = useTheme();

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <BrowserRouter>
        <LightModeToggle />
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
          <Route
            path="/topics/:selectedTopic"
            element={<TopicFilteredList />}
          ></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
          <Route path="/users" element={<UserList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
