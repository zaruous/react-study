"use strict";
import { Response, Request } from "express";
import {SessionOptions} from "express-session";
const express = require('express');
const app = express();
const cors = require('cors');
const { DateTime } = require("luxon");
const acessLog = require("./middleware/accessLogMiddleware")
const authFilter = require("./middleware/AuthFilter")
const config  = require('./config.json');
const session = require('express-session');
const MysqlSessionStore = require("express-mysql-session");

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

// 세션 DB 설정
const mysqlSessionStore = new MysqlSessionStore({
    host: config.db.mysql.host,
    port: config.db.mysql.port,
    user: config.db.mysql.user,
    password: config.db.mysql.password,
    database: config.db.mysql.database,
});
/* 세션 설정
secure 쿠키 설정 (https 프로토콜에서만 사용하려면 true로 변경)
resave: false,  세션 데이터가 바뀌지 않았어도 항상 저장할지 여부
saveUninitialized: true, 초기화되지 않은 세션 데이터도 저장할지 여부
cookie: { secure: false , maxAge : (60 * 60 * 1000 )  }, 1시간 후 세션 만료
*/
app.use(session({
    secret : config.server.sessionKey,
    resave: false, /* 세션 데이터가 바뀌지 않았어도 항상 저장할지 여부 */
    saveUninitialized: true, /* 초기화되지 않은 세션 데이터도 저장할지 여부 */
    cookie: { secure: false , maxAge : (60 * 60 * 1000 )  }, /*1시간 후 세션 만료*/
    store : mysqlSessionStore,
} as SessionOptions));

const corsOptions = {
    origin: function(origin : string, callback : any) {
        callback(null, safesitelist.indexOf(origin) !== -1);
    },
    credentials: true
}

app.use(cors(corsOptions));
/* app.use(express.json()); */

/**
 * access logging.
 */
app.use(acessLog());
/**
 * authentication filter.
 */
app.use(authFilter());

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


