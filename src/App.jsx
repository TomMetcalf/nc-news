import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import TopicList from './components/TopicList';
import Article from './components/Article';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticleList />}></Route>
          <Route path="/topics" element={<TopicList />}></Route>
          <Route path="/articles/:article_id" element={<Article />}></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
