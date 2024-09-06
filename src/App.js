import { Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Scroll from './components/Scroll';
import Home from './pages/Home'
import Join from './pages/Join';
import Login from './pages/Login';
import Update from './pages/Update';
import About from './pages/About';
import Works from './pages/Works';
import Post from './pages/Post';
import Write from './pages/Write';
import View from './pages/View';
import Board from './pages/Board';
import Contact from './pages/Contact'

// 우클릭 방지
function useBlockClick() {
  useEffect(() => {
    document.oncontextmenu = function() {
      return false;
    }
  })
}

export default function App() {
  // 관련 함수
  useBlockClick();

  // 화면 출력 부분
  return (
    <Fragment>
      <Scroll/>
      <Header/>
      <main className='main'>
        <Routes>
          <Route path={'/'} element={<Home/>}></Route>
          <Route path={'/join'} element={<Join/>}></Route>
          <Route path={'/login'} element={<Login/>}></Route>
          <Route path={'/update'} element={<Update/>}></Route>
          <Route path={'/about'} element={<About/>}></Route>
          <Route path={'/works'} element={<Works/>}></Route>
          <Route path={'/post'} element={<Post/>}></Route>
          <Route path={'/write'} element={<Write/>}></Route>
          <Route path={'/view'} element={<View/>}></Route>
          <Route path={'/board'} element={<Board/>}></Route>
          <Route path={'/contact'} element={<Contact/>}></Route>
        </Routes>
      </main>
      <Footer/>
    </Fragment>
  );
}