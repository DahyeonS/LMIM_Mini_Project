import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'
import Login from './pages/Login';
import About from './pages/About';
import Works from './pages/Works';
import Board from './pages/Board';
import Contact from './pages/Contact'
import Post from './pages/Post';

export default function App() {
  return (
    <div>
      <Header/>
      <main className='main'>
        <Routes>
          <Route path={"/"} element={<Home/>}></Route>
          <Route path={"/login"} element={<Login/>}></Route>
          <Route path={"/about"} element={<About/>}></Route>
          <Route path={"/works"} element={<Works/>}></Route>
          <Route path={"/post"} element={<Post/>}></Route>
          <Route path={"/board"} element={<Board/>}></Route>
          <Route path={"/contact"} element={<Contact/>}></Route>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}