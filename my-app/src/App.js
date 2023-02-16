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
import {useCallback, useLayoutEffect, useRef, useState} from "react";
import CallModalPopup from "./CallModalPopup";
import Calendar from "./components/cal/Calendar";
import Carousel from "./components/layout/Carousel";
import {get} from "./api/Request";
import {saveStorage, getStorage } from "./api/Storage";
import UseRefStudy from "./UseRefStudy";

function App()
{

    const [loginVisible, setLoginVisible] = useState(false);
    const [status, setStatus] = useState("");
    const params = new URL(document.location).searchParams;
    const modalRef = useRef();
    const [profileImg, setProfileImg] = useState("");
    const [nickname, setNickname] = useState("");

    /**
     *
     * @type {(function(): void)|*}
     */
    const closeModal = useCallback(()=> {
        setLoginVisible(false);
    });
    /**
     *
     * @type {(function(): void)|*}
     */
    const showPopup  =  useCallback((message)=> {
        setLoginVisible(true);
    });

    /**
     *
     */
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

    const imageDataList = [
        'https://w.namu.la/s/4401a0d0660d063605410913f09c621f4240f29faa4415b811bfe03c6069c6b0a9b848ffcab76979a97a07ddfbb0adbe9e721a76a04281bc6c877db3ceb39ee48d57380b3dccfdb6967d69369cea849ff428e6f50faa57a0a64789735f8d9ae4330b5ed81b7b4d62c26b6d94186f8cdb',
        'https://w.namu.la/s/9ef05343751119e13ec31faa64f43289f9fc8130b7183613c5583b64df5a8c5628992e81a17ea8d8e1ffbf727b6ea2aad3dfaf203de32606a04c997f1c7ae67153d0222496400af3ebe7e2e765dca8eecec74a1008663bde119365c6530ceef4',
        'https://w.namu.la/s/0d9ec42cc9c1007454e7c91cebf3d5126b3b5486efa6085223c744dfc053cef11a715a85ccfc19e8c008f9d2949b5304fc90704d8d94e319beb39471561ec89fd3418d71aed6d905e6f183cb125d4b05a8cd4cfeaa3897015bcf1be4f8f1649b',
        'https://w.namu.la/s/523d1e8fb31d061bf287309e9e04d4a78b4a585ed20c09b8da8624337f3bc59733e20ccb3bde25a0d219878f9a30f1625b85baf6ef64c2b79d2ded34f718a0f678ee35cc90fa3b0f4f68aab261b4fccee465ea49a26a4d29d37836c25dc7c20ad3c4b373b3212c31494e339df6ab2efc'
    ];


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
                        {{profileImg} && <img alt={""} style={profileImgStyle} src={profileImg}></img> }
                        <span>{nickname}</span>
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
                    <Route path="/callModalPopup" element={ <CallModalPopup prop={{
                        showPopup: showPopup,
                        setProfileImg: setProfileImg,
                        setNickname: setNickname
                    }}/> }></Route>
                    <Route path="/calendar" element={ <Calendar/> }></Route>
                    <Route path="/useRefStudy" element={ <UseRefStudy/> }></Route>
                    <Route path="/images" element={ <Carousel images={imageDataList}/> }></Route>

                    <Route path="*" element={ <NotFound/> }></Route>
                </Routes>
            </BrowserRouter>
            <div style={divStatusStyle}>{status}</div>
        </div>
      );
}

export default App;

