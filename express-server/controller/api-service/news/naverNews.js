const axios = require("axios");
exports.naverNews =  (req, res) => {
    axios.get("https://api.signal.bz/news/realtime").then((response) => {
        res.send(response.data);
    });
};