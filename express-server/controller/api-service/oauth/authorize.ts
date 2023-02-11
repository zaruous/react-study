"use strict";
import { Response, Request } from "express";
import {AxiosResponse, AxiosError} from "axios";
const axios = require("axios");
const config = require("../../../config.json");
import JwtTokenUtil from "../../../api/JwtToken";


const getApiKey = (req : Request, res : Response) =>{
    const data = {
        restApiKey:config.login.kakao.restApiKey,
        redirectUrl:config.login.kakao.redirectUrl,
    };
    console.log(`getApiKey : ${data.redirectUrl}`);
    res.send(data);
};

const authorize = (req : Request, res : Response) => {

    const kakaoCode = req.query["code"];
    if (!kakaoCode)
    {
        res.status(401).send("code is empty.");
        return;
    }

    const data = `grant_type=authorization_code&client_id=${config.login.kakao.restApiKey}&redirect_uri=${config.login.kakao.redirectUrl}&code=${kakaoCode}`;
    console.log(`url : ${config.login.kakao.tokenUrl} \ncode : ${kakaoCode}\ndata :  ${data}`);
    axios.post(config.login.kakao.tokenUrl, data ,{
        headers:{
            "Content-type":"application/x-www-form-urlencoded",
            "charset":"utf-8"}
    })
    .then((ares: AxiosResponse) => {
        res.send(JSON.stringify(ares.data));
    })
    .catch((err: AxiosError) => {
        console.log(err.message);
        res.status(401).send( {
            msg : err.message,
            desc : "token generated failed."
        })
    });
};

/**
 *
 * @param req
 * @param res
 */
const userInfo =  (req : Request, res : Response) => {
    const access_token = req.query["access_token"];
    if (!access_token)
    {
        res.status(401).send("token is empty.");
        return;
    }

    axios.get(config.login.kakao.userInfoUrl,{
        headers: {
        Authorization: `Bearer ${access_token}`,

     },
    })
        .then( async  (ares: AxiosResponse) => {
            /*사용자 정보 검증 */

            ares.data.properties.id;
            ares.data.properties.nickname;
            ares.data.properties.thumbnail_image;

            ares.data.kakao_account.profile.has_email;
            ares.data.kakao_account.profile.email_needs_agreement;
            ares.data.kakao_account.profile.email;

            /*토큰 생성*/
            const util = new JwtTokenUtil();
            const a = util.generateToken({
                userid: "",
                username: "",
                helper: ares.data
            });

            console.log(JSON.stringify(ares.data));

            res.send(JSON.stringify(ares.data));

            // LoginApi.doLogin( ares.data.kakao_account.profile.email,(userInfo: UserInfo)=>{
            //
            //
            // }, ()=>{
            //
            // });




            //LoginApi.doLogin()
            /*
            {"id":2652116922,
                "connected_at":"2023-02-05T09:28:53Z",
                "properties":{"nickname":"김영준",
                "profile_image":"http://k.kakaocdn.net/dn/YL7fW/btrLDXDSfZq/IWkZ8DHQPQUdyckcvXNif1/img_640x640.jpg",
                "thumbnail_image":"http://k.kakaocdn.net/dn/YL7fW/btrLDXDSfZq/IWkZ8DHQPQUdyckcvXNif1/img_110x110.jpg"},
                "kakao_account":{
                                "profile_needs_agreement":false,
                                "profile":{
                                "nickname":"김영준",
                                "thumbnail_image_url":"http://k.kakaocdn.net/dn/YL7fW/btrLDXDSfZq/IWkZ8DHQPQUdyckcvXNif1/img_110x110.jpg"
                                ,"profile_image_url":"http://k.kakaocdn.net/dn/YL7fW/btrLDXDSfZq/IWkZ8DHQPQUdyckcvXNif1/img_640x640.jpg"
                                ,"is_default_image":false},
                                "has_email":true,"email_needs_agreement":false,"is_email_valid":true
                                ,"is_email_verified":true,
                                "email":"callakrsos@naver.com"}
                                }
            */


        })
        .catch((err: AxiosError) => {

            console.log(err.message);
            res.status(401).send( {
                msg : err.message,
                desc : "get user information failed."
            })
        });
};
export {getApiKey,authorize, userInfo }