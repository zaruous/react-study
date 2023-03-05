
import './Category.css'
import { Link } from 'react-router-dom';
import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";


function Category() {
    return Category_1_0();
}

function Category_1_0() {
    return (<div className='Category'>
        <ul>
            {/*<li><Link to="/diary-write">작성</Link></li>*/}
            {/*<li><Link to="/diary-list">목록</Link></li>*/}
            {/*<li><Link to="/regex">정규식</Link></li>*/}
            {/*<li><Link to="/galery">갤러리</Link></li>*/}
            {/*<li><Link to="/callModalPopup">모달팝업테스트</Link></li>*/}

            <li><Link to="/news">뉴스</Link></li>
            <li><Link to="/user/userList">사용자리스트</Link></li>
            <li><Link to="/kakaomap">카카오맵</Link></li>
            <li><Link to="/calendar">달력</Link></li>
            <li><Link to="/useRefStudy">UseRef Study 샘플</Link></li>
            <li><Link to="/chart">Chart</Link></li>
            <li><Link to="/images">앨범</Link></li>
        </ul>
    </div>);
}

function Category_2_0(){
    return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                </IconButton>
                <Button color="inherit">
                    <Link to="/news" style={{textDecoration:'none'}}>뉴스</Link>
                </Button>

            </Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
            </Typography>
            <Button color="inherit">Login</Button>
        </AppBar>
    </Box>
    );
}

export default Category;
