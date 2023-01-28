const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const cheerio = require("cheerio")
const {stringify} = require("nodemon/lib/utils");
const { DateTime } = require("luxon");
const acessLog = require("./middleware/accessLogMiddleware")
const config  = require('./config.json');


//환경변수에서 port를 가져온다. 환경변수가 없을시 8190 포트를 지정한다.
const PORT = config.server.port || 8190;
var safesitelist = [
    'https://naver', 
    'https://google.com', 
    'm.stock.naver.com', /*경제 뉴스*/
    'https://api.manana.kr', /*환율*/
    'https://api.signal.bz', /* 네이버 뉴스 */
    'https://mydailybyte.com', /*데일리 바이트*/
]
var corsOptions = {
    origin: function(origin, callback) {
        var issafesitelisted = safesitelist.indexOf(origin) !== -1;
        callback(null, issafesitelisted);
    },
    credentials: true
}

app.use(cors(corsOptions));
/* app.use(express.json()); */

app.use(acessLog({
    printDateYn : "Y",
}));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {


    res.send('Hello, World!');
});

require("./router").route(app);

app.get("/time", (req, res) => {
    const s = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
    res.send(s);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


