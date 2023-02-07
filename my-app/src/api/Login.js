import {get} from "./Request";
import {getStorage, saveStorage} from "./Storage";
import {useCallback} from "react";
const {Kakao} = window;
/**
 *
 */
const kakaoLogin = (autoObjCallabak) => {

    get("/api-service/oauth/getApiKey", {}, {},res =>{

        Kakao.Auth.login({
            success: function(authObj){
                saveStorage("access_token", authObj.access_token);
                Kakao.Auth.setAccessToken(authObj.access_token);

                if(autoObjCallabak)
                    autoObjCallabak(authObj.access_token);
            },
            fail: function(err){
                console.log(JSON.stringify(err));
                Kakao.Auth.setAccessToken(null);
            }
        });
    }, err =>{
        console.log(`[getApiKey]${err.message}`);
    });
};


const getUserProfile = (token, onSuccess, onFail) => {

    get("/api-service/oauth/userInfo", {
        "access_token" : token
    }, {
        "Access-Control-Allow-Credentials":true
    }, onSuccess, onFail );
}

export  { kakaoLogin, getUserProfile};
// const getCookie = (name) => {
//     var parts = document.cookie.split(name + '=');
//     if (parts.length === 2) { return parts[1].split(';')[0]; }
// }