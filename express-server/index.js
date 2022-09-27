const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');

//환경변수에서 port를 가져온다. 환경변수가 없을시 8190 포트를 지정한다.
const PORT = process.env.PORT || 8190;
var safesitelist = [
    'https://naver', 
    'https://google.com', 
    'm.stock.naver.com', /*경제 뉴스*/
    'https://api.manana.kr', /*환율*/
    'https://api.signal.bz', /* 네이버 뉴스 */
]
var corsOptions = {
    origin: function(origin, callback) {
        var issafesitelisted = safesitelist.indexOf(origin) !== -1;
        callback(null, issafesitelisted);
    },
    credentials: true
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api-service/News/getNews', (req, res) => {
    axios.get("https://m.stock.naver.com/api/news/list?category=mainnews&page=1&pageSize=30").then((response) => {
        res.send(response.data);
    });
});

app.get('/api-service/News/exchange', (req, res) => {
    axios.get("https://api.manana.kr/exchange/rate.json").then((response) => {
        res.send(response.data);
    });
});

app.get('/api-service/News/getNaverNews', (req, res) => {
    axios.get("https://api.signal.bz/news/realtime").then((response) => {
        res.send(response.data);
    });
});


app.get('/api-service/bus/getStations', (req, res) => {
    const station = req.query.get('station');
    /* 인천광역시_시내버스 정류소 현황_20211117.json 제이슨 파일 읽기 */

    const data = fs.readFileSync('인천광역시_시내버스 정류소 현황_20211117.json', 'utf8');
    const json = JSON.parse(data);
    const result = json.filter((item) => {
        return item["정류소 명"].includes(station);
    }


}


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

