"use strict";
import { Response, Request, NextFunction } from "express";
import {CSVUtils} from "../../../api/CSVUtils";
const fs = require("fs");

const stationIfo = CSVUtils.csvToJSON(fs.readFileSync('전국버스정류장 위치정보.csv', 'utf-8'));
exports.stations = (req : Request, res : Response) => {
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
    const result = stationIfo.filter((item : any) => {
        return item["정류장 명칭"] ? item["정류장 명칭"].indexOf(station) >= 0 : false;
    });
    console.log(result);
    res.send(result);

};



