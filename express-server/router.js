
const authorize = require("./controller/api-service/oauth/authorize");
const news = require("./controller/api-service/news/news");
const exchange = require("./controller/api-service/news/exchange");
const naverNews = require("./controller/api-service/news/naverNews");
const boxoffice = require("./controller/api-service/movie/boxoffice");
const busStation = require("./controller/api-service/bus/station");
const stock = require("./controller/api-service/stock/stock");

exports.route = function(app){
    app.get("/api-service/oauth/authorize", authorize.authorize);

    app.get("/api-service/News/:newsType", news.news);
    app.get("/api-service/News/exchange", exchange.exchange);
    app.get("/api-service/News/getNaverNews", naverNews.naverNews);

    app.get("/api-service/movie/boxoffice", boxoffice.boxoffice);

    app.get("/api-service/bus/getStations", busStation.stations);

    app.get("/api-service/stock/companyinfo", stock.companyInfo);
}