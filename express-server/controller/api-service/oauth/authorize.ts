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
        res.status(500).send("code is empty.");
        return;
    }

    const data = `grant_type=authorization_code&client_id=${config.login.kakao.restApiKey}&redirect_uri=${config.login.kakao.redirectUrl}&code=${kakaoCode}`;
    console.log(`code : ${kakaoCode}\ndata :  ${data}`);
    axios.post(config.login.kakao.tokenUrl, data ,{
        headers:{
            "Content-type":"application/x-www-form-urlencoded",
            "charset":"utf-8"}
    })
    .then((data: AxiosResponse) => {
        console.log(`access_token : ${data.data}`);
        const access_token = data.data["access_token"];

        return axios.get(config.login.kakao.userInfoUrl , {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    })
    .then((ares: AxiosResponse) => {
        console.log(ares.data);
        res.send(JSON.stringify(ares.data));
    })
    .catch((err: AxiosError) => {
        console.log(err.message);
        res.status(500).send(err.message)
    });
};

export {getApiKey,authorize }