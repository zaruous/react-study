
import './Category.css'
import { Link } from 'react-router-dom';


function Category() {
    return (<div className='Category'>
        <ul>
            <li><Link to="/diary-write">작성</Link></li>
            <li><Link to="/diary-list">목록</Link></li>
            <li><Link to="/news">뉴스</Link></li>
        </ul>
        </div>);
}

export default Category;
