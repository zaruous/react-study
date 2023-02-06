"use strict";
import { Response, Request } from "express";
import {AxiosResponse, AxiosError} from "axios";
const axios = require("axios");
const config = require("../../../config.json");

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
        .then((ares: AxiosResponse) => {
            res.send(JSON.stringify(ares.data));
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