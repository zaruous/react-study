"use strict";
import { Response, Request, NextFunction } from "express";
const {DateTime} = require("luxon");
const {config} = require('../config.json')
module.exports = function(){
    return function middlewareAccessLogPrinter(req : Request, res : Response, next : NextFunction){
        if(!config || !config.server || !config.server.accesslog)
        {
            next();
            return;
        }

        if(config.server.accesslog.printLogYn !== "Y")
        {
            next();
            return;
        }
        let msg = "";
        if("Y" === config.server.accesslog.printDateYn)
            msg = DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss") + "\t";

        msg += req.hostname +"\t";
        msg += req.ip +"\t";
        msg += req.path;

        console.log(msg);
        next();
    }
}
