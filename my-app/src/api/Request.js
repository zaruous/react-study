const axios = require("axios");


/**
 *
 * @param reqUrl
 * @param params
 * @param headers
 * @param callback
 * @param errorCallback
 */
exports.get = (reqUrl, params= {}, headers = {}, callback , errorCallback)=>{
    const req = axios(
        {
            method:'GET',
            url:reqUrl,
            headers:headers,
            params: params,
            responseType: 'json'
        }
    );
    afterAction(req,callback, errorCallback);

};

/**
 *
 * @param reqUrl
 * @param params
 * @param headers
 * @param callback
 * @param errorCallback
 */
exports.post = (reqUrl, params = {}, headers={}, callback, errorCallback)=>{
    const req = axios(
        {
            method:'POST',
            url:reqUrl,
            headers:headers,
            params: params,
            responseType: 'json'
        }
    );

    afterAction(req,callback, errorCallback);
};

/**
 *
 * @param oaxios
 * @param callback
 * @param errorCallback
 */
const afterAction = (oaxios, callback, errorCallback) =>{
    if(callback)
        oaxios.then(callback);

    if(errorCallback)
    {
        oaxios.catch(err=>{
            console.log(err.status);
            errorCallback(err);
        })
    }
};