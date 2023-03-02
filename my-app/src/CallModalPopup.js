import axios from "axios";

import {useCallback, useState} from "react";
import {get} from "./api/Request";
import {saveStorage} from "./api/Storage";
const Login = require("./api/LoginHelper");

function CallModalPopup({prop}){
    /**
     *  화면에 사용자 정보를 보여주기 위한 처리. 데이터를 읽어오고 받아온 데이터를 세팅.
     * @type {(function(*): void)|*}
     */
    const getUserProfile = (token, prop)=>{
        if(!token) return;

        get("/api-service/oauth/userInfo", {
            "access_token" : token
        }, {
            "Access-Control-Allow-Credentials":true
        }, res =>
        {
            const data = res.data;
            console.log(data);
            saveStorage("data",JSON.stringify(data));

            if(prop.setProfileImg)
                prop.setProfileImg(data.properties.thumbnail_image);
            if(prop.setNickname)
                prop.setNickname(data.properties.nickname);
            //saveStorage("access_token", "");
        },err =>{
            console.log(err.message);
            //setStatus(`${err.message}`);

        });
    };

    const callModalPopupOnClick = () => {
        prop.showPopup();
    };

    const callLoginPopupOnClick = () => {
        Login.kakaoLogin((accessToken)=>{
            getUserProfile(accessToken, prop);
            // window.location.href="./";
        });
    };

    return (
        <>
            <p>모달팝업 테스트</p>
            <button onClick={callModalPopupOnClick}>버튼</button>
            <button onClick={callLoginPopupOnClick}
                    style={btnLoginStyle}></button>

        </>
    );
}

/*카카오 로그인 버튼 스타일 */
const btnLoginStyle = {
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
export default CallModalPopup;