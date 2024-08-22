import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'
import Join from './pages/Join';
import Login from './pages/Login';
import Update from './pages/Update';
import About from './pages/About';
import Works from './pages/Works';
import Post from './pages/Post';
import Board from './pages/Board';
import Write from './pages/Write';
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
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
          <Route path={'/board'} element={<Board/>}></Route>
          <Route path={'/contact'} element={<Contact/>}></Route>
        </Routes>
      </main>
      <Footer/>
    </>
  );
}