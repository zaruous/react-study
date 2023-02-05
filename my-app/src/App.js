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
import axios from "axios";

function App() {

const [modalVisible, setModalVisible] = useState(false);
const [status, setStatus] = useState("");
const [nickname, setNickname] = useState("");
const params = new URL(document.location).searchParams;

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
};
const getLocalStorage = (key) => {
        return localStorage.getItem(key);
};

const kakaoCode = params.get('code');
if(kakaoCode)
{
    saveToLocalStorage("info",kakaoCode);
    axios(
        {
            method:'GET',
            url:'/api-service/oauth/authorize',
            headers:{
                "Access-Control-Allow-Credentials":true,
                "action":"authorize",
            },
            params:{
                "code" : kakaoCode
            },
            responseType: 'json'
        }
    ).then(res =>
    {
        const data = res.data;
        saveToLocalStorage("nickname",data.properties.nickname);
        saveToLocalStorage("profileImg",data.properties.profile_image);
        saveToLocalStorage("data",JSON.stringify(data));
        window.location.href = "./";
    })
    .catch(err =>{
        setStatus(`${err.message}`);
    });
}

const closeModal =  ()=> {
    setModalVisible(false);
}
const showPopup = (message)=> {
    setModalVisible(true);
}

const modalRef = useRef();
  
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

  return (
    <div className="App">
        {modalVisible && (
            <Modal isOpen={modalVisible} onRequestClose={closeModal} style={customModalStyle} ref={modalRef}>
                <div style={contentStyle}>
                    <div style={{display:'span'}}>모달창</div>
                    <button onClick={closeModal} style={{}}>닫기</button>
                </div>
            </Modal>
        )}
        <BrowserRouter>
            <header className="App-header" style={headerStyle}>
                <a
                    className="home-link"
                    href="./"
                    target="_self"
                >Home</a>
                <span style={headerRightStyle}>
                    {getLocalStorage("profileImg") && <img style={profileImgStyle} src={getLocalStorage("profileImg")}></img> }
                    <span>{getLocalStorage("nickname")}</span>
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

