"use strict";
import { Response, Request, NextFunction } from "express";
//const session = require("express-session");

module.exports = function(){
    return (req : Request, res : Response, next : NextFunction) =>{
        let msg = `AuthFilter : [${new Date()}][${req.url}][req.ip]\t`;

        if(req.url.startsWith("/api-service/oauth/getApiKey"))
        {
            msg += "ignore";
            console.log(msg);
            next();
            return;
        }
        else if(req.url.startsWith("/api-service/oauth/authorize"))
        {
            msg += "ignore";
            console.log(msg);
            next();
            return;
        }

        else{
            next();
            return;
            // if(!req.header("accesstoken"))
            // {
            //     res.status(401)
            //         .send({
            //             code : 401001,
            //             message : "auth failed."
            //         });
            // }
            // else
            // {
            //     next();
            // }
        }
    }
}
