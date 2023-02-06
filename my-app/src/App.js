import './App.css';
import Category from "./Category";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DiaryWrite from "./DiaryWrite";
import DiaryList from "./DiaryList";
import NotFound from "./NotFound";
import News from "./News";
import UserList from "./UserList";
import StartPage from "./StartPage";
import KakaoMap from "./KakaoMap";
import RegexComponent from './RegexComponent'
import GaleryContainer from "./GaleryContainer";
import Modal from 'react-modal';
import {useRef, useState} from "react";
import CallModalPopup from "./CallModalPopup";
import Calendar from "./components/cal/Calendar";
import {get} from "./api/Request";
import { useCookies } from 'react-cookie';

function App() {

const [loginVisible, setLoginVisible] = useState(false);
const [status, setStatus] = useState("");
const params = new URL(document.location).searchParams;
const modalRef = useRef();
const [cookies, setCookie] = useCookies(["access_token", "reflesh_token"]);

const saveStorage = (key, data) => {
    localStorage.setItem(key, data);
};

const getStorage = (key) => {
        return localStorage.getItem(key);
};

const kakaoCode = params.get('code');
if(kakaoCode)
{
    saveStorage("info",kakaoCode);
    get("/api-service/oauth/authorize", {
        "code" : kakaoCode
    }, {
        "Access-Control-Allow-Credentials":true
    }, res =>
    {
        console.log(res.data);
        const token = res.data["access_token"];
        const ref_token = res.data["refresh_token"];
        const expires_in = res.data["expires_in"];

        let expires = new Date()
        expires.setTime(expires.getTime() + (expires_in * 1000))
        setCookie('access_token', token, { path: '/',  expires})
        setCookie('refresh_token', ref_token, {path: '/', expires})

        getUserProfile();
    },err =>{
        console.log(err.message);
        setStatus(`${err.message}`);
    })

}

const getUserProfile = ()=>{
    const access_token = cookies.access_token;
    console.log("getUserProfile");
    get("/api-service/oauth/userInfo", {
        "access_token" : access_token
    }, {
        "Access-Control-Allow-Credentials":true
    }, res =>
    {
        const data = res.data;
        saveStorage("nickname",data.properties.nickname);
        saveStorage("profileImg",data.properties.thumbnail_image);
        saveStorage("data",JSON.stringify(data));
        window.location.href = "./";
    },err =>{
        console.log(err.message);
        setStatus(`${err.message}`);
    })
};
const closeModal =  ()=> {
    setLoginVisible(false);
}
const showPopup = (message)=> {
    setLoginVisible(true);
}


  
const diaryItem = [
    {
        title:'hello',
        content : 'hello'
    },
    {
        title:'hello2',
        content : 'hello2'
    }
];

const customModalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width:'30%',
        height:'30%',

    }
}

const contentStyle = {
    /*수직으로 가운데 정렬 */
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
}

const divStatusStyle = {
    position:'relative',
    bottom: '5px',
}
const headerStyle = {
    /*수직으로 가운데 정렬 */
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
}

const headerRightStyle = {
    position:'relative',
    right: '5px',
    width: '100%',
    textAlign:'right',

}

const profileImgStyle = {
    width: "auto",
    height: "auto",
    maxWidth: "50px",
    maxHeight: "50px",

}
/*카카오 로그인 버튼 스타일 */
const btnKakaoLoginStyle = {
    backgroundImage: 'url(./images/kakao_login_medium_narrow.png)',
    width: '222px',
    height: '48px',
    border: 'none',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '10px',
    marginBottom: '10px',
};

const callLoginPopupOnClick = () => {
    get("/api-service/oauth/getApiKey", "", {
        "Access-Control-Allow-Credentials":true,
        "action":"getApiKey",
    }, res =>{
        /*인가 코드 요청*/
        const apiKey = res.data.restApiKey;
        const redirectUrl = res.data.redirectUrl;
        const reloadUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code`;
        window.location.href = reloadUrl;
    }, err =>{
        setStatus(`[getApiKey]${err.message}`);
    });
};

  return (
    <div className="App">
        {(loginVisible && (
            <Modal isOpen={loginVisible} onRequestClose={closeModal} style={customModalStyle} ref={modalRef}>
                <div style={contentStyle}>
                    <button onClick={callLoginPopupOnClick} style={btnKakaoLoginStyle}></button>
                    <button onClick={closeModal} style={{}}>닫기</button>
                </div>
            </Modal>
        ))}
        <BrowserRouter>
            <header className="App-header" style={headerStyle}>
                <a
                    className="home-link"
                    href="./"
                    target="_self"
                >Home</a>
                <span style={headerRightStyle}>
                    {getStorage("profileImg") && <img style={profileImgStyle} src={getStorage("profileImg")}></img> }
                    <span>{getStorage("nickname")}</span>
                </span>

            </header>
            <Category></Category>
            <Routes>
                <Route path="/" element={<StartPage/>} ></Route>
                <Route path="/diary-write" element={ <DiaryWrite diaryItem={diaryItem}/> }></Route>
                <Route path="/diary-list" element={ <DiaryList diaryItem={diaryItem}/> }></Route>
                <Route path="/news" element={ <News/> }></Route>
                <Route path="/userList" element={ <UserList/> }></Route>
                <Route path="/kakaomap" element={ <KakaoMap/> }></Route>
                <Route path="/regex" element={ <RegexComponent/> }></Route>
                <Route path="/galery" element={ <GaleryContainer/> }></Route>
                <Route path="/callModalPopup" element={ <CallModalPopup showPopup={showPopup}/> }></Route>
                <Route path="/calendar" element={ <Calendar/> }></Route>
                <Route path="*" element={ <NotFound/> }></Route>
            </Routes>
        </BrowserRouter>
        <div style={divStatusStyle}>{status}</div>
    </div>
  );
}

export default App;

