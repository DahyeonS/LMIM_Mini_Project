import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='footer text-center'>
            <div className='container-fluid container-xl'>
                <Link to={"home"} className='mt-5 mx-2 text-secondary'>HOME</Link>
                <Link to={"about"} className='mx-2 text-secondary'>ABOUT</Link>
                <Link to={"works"} className='mx-2 text-secondary'>WORKS</Link>
                <Link to={"post"} className='mx-2 text-secondary'>POST</Link>
                <Link to={"board"} className='mx-2 text-secondary'>BOARD</Link>
                <Link to={"contact"} className='mx-2 text-secondary'>CONTACT</Link>
            </div>
        </footer>
    );
}