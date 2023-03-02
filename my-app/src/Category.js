
import './Category.css'
import { Link } from 'react-router-dom';


function Category() {
    return (<div className='Category'>
        <ul>
            {/*<li><Link to="/diary-write">작성</Link></li>*/}
            {/*<li><Link to="/diary-list">목록</Link></li>*/}
            {/*<li><Link to="/regex">정규식</Link></li>*/}
            {/*<li><Link to="/galery">갤러리</Link></li>*/}

            <li><Link to="/news">뉴스</Link></li>
            <li><Link to="/userList">사용자리스트</Link></li>
            <li><Link to="/kakaomap">카카오맵</Link></li>
            <li><Link to="/callModalPopup">모달팝업테스트</Link></li>
            <li><Link to="/calendar">달력</Link></li>
            <li><Link to="/useRefStudy">UseRef Study 샘플</Link></li>
            <li><Link to="/chart">Chart</Link></li>
            <li><Link to="/images">앨범</Link></li>
        </ul>
        </div>);
}

export default Category;
