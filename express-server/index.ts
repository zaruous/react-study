"use strict";
import { Response, Request } from "express";
const express = require('express');
const app = express();
const cors = require('cors');
const { DateTime } = require("luxon");
const acessLog = require("./middleware/accessLogMiddleware")
const config  = require('./config.json');


//환경변수에서 port를 가져온다. 환경변수가 없을시 8190 포트를 지정한다.
const PORT = config.server.port || 8190;
const safesitelist = [
    'https://naver', 
    'https://google.com', 
    'm.stock.naver.com', /*경제 뉴스*/
    'https://api.manana.kr', /*환율*/
    'https://api.signal.bz', /* 네이버 뉴스 */
    'https://mydailybyte.com', /*데일리 바이트*/
    'https://kauth.kakao.com',
    'https://kapi.kakao.com'

]

const corsOptions = {
    origin: function(origin : string, callback : any) {
        callback(null, safesitelist.indexOf(origin) !== -1);
    },
    credentials: true
}

app.use(cors(corsOptions));
/* app.use(express.json()); */

app.use(acessLog());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req : Request, res : Response) => {
    res.send('Hello, World!');
});

require("./router").route(app);

app.get("/time", (req : Request, res : Response) => {
    const s = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
    res.send(s);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


