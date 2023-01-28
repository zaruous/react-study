const config = require("../../../config.json");
const {DateTime} = require("luxon");
const axios = require("axios");
exports.boxoffice = (req, res) =>{

    const token = config.movie.token;

    let date = req.query["date"];
    if(!date)
    {
        /* 현재 일자 -1일 */
        date = DateTime.now().minus({days: 1}).toFormat("yyyyMMdd");

        /*res.status(400).send("date is required");
        return;
        */
    }

    /* www.kobis.or.kr에서 현재 박스 오피스 정보 출력 */
    let url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key="+token+"&targetDt="+date;

    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
        .then((response) => {
            res.send(response.data);
        });

};