const config = require("../../../config.json");

exports.authorize = (req, res) => {

    const client_id = req.query["client_id"];
    const response_type= req.query["response_type"];
    const redirect_uri = req.query["redirect_uri"];

    /*url 매핑*/
    let url = config.server.url + "/oauth/authorize?";
    url += "client_id=" + client_id;
    url += "&response_type=" + response_type;
    url += "&redirect_uri=" + redirect_uri;

    /*
    axios.get(kakologinHost ).then((response) => {
        res.send(response.data);
    });
    */
    console.log(url);
    res.send(client_id);
};