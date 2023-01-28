const axios = require("axios");
exports.exchange = (req, res) => {
    axios.get("https://api.manana.kr/exchange/rate.json").then((response) => {
        res.send(response.data);
    });
};