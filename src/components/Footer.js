import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer text-center">
            <div className="container-fluid container-xl">
                <Link to={"home"} className='mt-5 mx-2'>HOME</Link>
                <Link to={"about"} className='mx-2'>ABOUT</Link>
                <Link to={"works"} className='mx-2'>WORKS</Link>
                <Link to={"post"} className='mx-2'>POST</Link>
                <Link to={"board"} className='mx-2'>BOARD</Link>
                <Link to={"contact"} className='mx-2'>CONTACT</Link>
            </div>
        </footer>
    );
}