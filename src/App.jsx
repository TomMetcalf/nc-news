import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import ArticleList from './components/ArticleList';
import TopicList from './components/TopicList';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticleList />}></Route>
          <Route path="/topics" element={<TopicList />}></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
