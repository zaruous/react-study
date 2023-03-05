import './App.css';
import Category from "./Category";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DiaryWrite from "./DiaryWrite";
import DiaryList from "./DiaryList";
import NotFound from "./NotFound";
import News from "./News";
import UserList from "./components/user/UserList";
import StartPage from "./StartPage";
import KakaoMap from "./KakaoMap";
import RegexComponent from './RegexComponent'
import GaleryContainer from "./GaleryContainer";
import Modal from 'react-modal';
import {useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import CallModalPopup from "./CallModalPopup";
import Calendar from "./components/cal/Calendar";
import Carousel from "./components/layout/Carousel";
import {get} from "./api/Request";
import {saveStorage, getStorage, CONST_KEY_USER_INFO } from "./api/Storage";
import UseRefStudy from "./UseRefStudy";
import DefaultChart from "./components/chart/DefaultChart";
import ImageCarouselView from "./components/img/ImageCarouselView";
import SignUp from "./components/user/SignUp";
import {UserInfoContext, UserInfo} from "./context/UserInfoContext";

function App()
{

    const [loginVisible, setLoginVisible] = useState(false);
    const [status, setStatus] = useState("");
    const params = new URL(document.location).searchParams;
    const modalRef = useRef();
    const initUserInfo = useCallback(()=>{
        if(getStorage(CONST_KEY_USER_INFO)){
            return JSON.parse(getStorage(CONST_KEY_USER_INFO))
        }
        return {};
    });
    const [userInfo, setUserInfo] = useState(initUserInfo());





    //const [userInfo, setUserInfo] = useContext(UserInfoContext);

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

    }

    const divStatusStyle = {
        position:'relative',
        bottom: '5px',
    }
    const headerStyle = {
        /*수직으로 가운데 정렬 */
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        margin:'0px'
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




    return (

        <div className="App">
            <UserInfoContext.Provider value={{userInfo}}>
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
                        href="/"
                        target="_self"
                    >Home</a>
                    <span style={headerRightStyle}>
                        <img alt={""} style={profileImgStyle} src={userInfo.profileImage}></img>
                        <span>{userInfo.nickName}</span>
                    </span>

                </header>
                <Category></Category>
                <Routes>
                    <Route path="/" element={<StartPage />} ></Route>
                    <Route path="/diary-write" element={ <DiaryWrite diaryItem={diaryItem}/> }></Route>
                    <Route path="/diary-list" element={ <DiaryList diaryItem={diaryItem}/> }></Route>
                    <Route path="/regex" element={ <RegexComponent/> }></Route>
                    <Route path="/galery" element={ <GaleryContainer/> }></Route>
                    <Route path="/news" element={ <News/> }></Route>

                    <Route path="/user/userList" element={ <UserList/> }></Route>
                    <Route path="/user/signUp" element={ <SignUp/> }></Route>

                    <Route path="/kakaomap" element={ <KakaoMap/> }></Route>
                    <Route path="/callModalPopup" element={ <CallModalPopup/> }></Route>
                    <Route path="/calendar" element={ <Calendar/> }></Route>
                    <Route path="/useRefStudy" element={ <UseRefStudy/> }></Route>
                    <Route path="/images" element={ <ImageCarouselView/> }></Route>
                    <Route path="/chart" element={ <DefaultChart/> }></Route>


                    <Route path="*" element={ <NotFound/> }></Route>
                </Routes>

            </BrowserRouter>
            <div style={divStatusStyle}>{status}</div>
            </UserInfoContext.Provider>
        </div>
      );
}

export default App;

