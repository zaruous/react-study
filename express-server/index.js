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

let stationIfo = csvToJSON(fs.readFileSync('전국버스정류장 위치정보.csv', 'utf-8'));
app.get('/api-service/bus/getStations', (req, res) => {
    const station = req.query['station'];
	
	if(station === "")
	{
		res.send([]);
		return;
	}
	
	//"정류장아이디","정류장 명칭","정류장 유형","중앙차로 여부","노드영문명","위도","경도","수집일시","단축아이디","도시코드","도시명"
    /* 인천광역시_시내버스 정류소 현황_20211117.json 제이슨 파일 읽기 */

    //const data = fs.readFileSync('인천광역시_시내버스 정류소 현황_20211117.json', 'utf8');
    //const json = JSON.parse(data);
	
	console.log(stationIfo[0]["정류장 명칭"].indexOf("양지"));
	console.log(station);
    const result = stationIfo.filter((item) => {
        return item["정류장 명칭"] ? item["정류장 명칭"].indexOf(station) >= 0 : false;
    });
	console.log(result);
	res.send(result);
	
});



function csvToJSON(csv_string){

    // 1. 문자열을 줄바꿈으로 구분 => 배열에 저장
    const rows = csv_string.replaceAll("\"","").split("\r\n");
    
    // 줄바꿈을 \n으로만 구분해야하는 경우, 아래 코드 사용
    // const rows = csv_string.split("\n");
  

    // 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임
    const jsonArray = [];

  
    // 3. 제목 행 추출 후, 콤마로 구분 => 배열에 저장
    const header = rows[0].split(",");

  
    // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
    for(let i = 1; i < rows.length; i++){
  
        // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
        let obj = {};

        // 각 내용 행을 콤마로 구분
        let row = rows[i].split(",");
  
        // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
        for(let j=0; j < header.length; j++){
            obj[header[j]] = row[j]
        }
  
        // 각 내용 행의 객체를 jsonArray배열에 담기
        jsonArray.push(obj);
  
    }
    
    // 5. 완성된 JSON 객체 배열 반환
    return jsonArray;

    // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용
    // return JSON.stringify(jsonArray);
}



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


