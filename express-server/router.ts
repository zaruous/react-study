import { Application } from "express";
import {getApiKey} from "./controller/api-service/oauth/authorize";

const authorize = require("./controller/api-service/oauth/authorize");
const login = require("./controller/api-service/oauth/login");
const news = require("./controller/api-service/news/news");
const exchange = require("./controller/api-service/news/exchange");
const naverNews = require("./controller/api-service/news/naverNews");
const boxoffice = require("./controller/api-service/movie/boxoffice");
const busStation = require("./controller/api-service/bus/station");
const stock = require("./controller/api-service/stock/stock");

exports.route = function(app : Application){
    app.get("/api-service/oauth/authorize", authorize.authorize);
    app.get("/api-service/oauth/getApiKey", authorize.getApiKey);

    app.get("/api-service/oauth/login", login.doLogin);

    app.get("/api-service/News/:newsType", news.news);
    app.get("/api-service/News/exchange", exchange.exchange);
    app.get("/api-service/News/getNaverNews", naverNews.naverNews);

    app.get("/api-service/movie/boxoffice", boxoffice.boxoffice);

    app.get("/api-service/bus/getStations", busStation.stations);

    app.get("/api-service/stock/companyinfo", stock.companyInfo);
}