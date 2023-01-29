const axios = require("axios")
const cheerio = require("cheerio")

const stock = require("./controller/api-service/stock/stock")
test('print test stock company info.', () => {

    const req = {
        query : {code : 447690}
    };
    const res = {
    send: function(param){
        /*값이 447690인지 확인*/
        expect(param.code).toBe('447690');
    }
    };
    stock.companyInfo(req, res);

});