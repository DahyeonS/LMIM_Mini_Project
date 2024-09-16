import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link } from 'react-router-dom';

export default function Works() {
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='pt-5 mb-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>Works</h1>
            </div>
            <div className='pb-5'>
                <h3><Link to={'https://github.com/ohjiae/Gyeonggi-do_Civil_Complaints_board_Analysis'} target='_blank' className='ms-3 my-2'>경기도 민원</Link></h3>
                <h3><Link to={'https://github.com/DahyeonS/Teruterubouz_Project'} target='_blank' className='ms-3 my-2'>맑음돌이</Link></h3>
                <h3><Link to={'https://github.com/DahyeonS/Farm_Shelter_Project'} target='_blank' className='ms-3 my-2'>목장쉼터</Link></h3>
            </div>
        </section>
    );
}