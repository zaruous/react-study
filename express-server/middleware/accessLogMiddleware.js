
module.exports = function(options){
    const {DateTime} = require("luxon");

    'use strict';
    return function middlewareAccessLogPrinter(req, res, next){

        let msg = "";
        if(options)
        {
            if("Y" === options.printDateYn)
                msg = DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss") + "\t";
        }

        msg += req.hostname +"\t";
        msg += req.ip +"\t";
        msg += req.path;

        console.log(msg);
        next();
    }
}
