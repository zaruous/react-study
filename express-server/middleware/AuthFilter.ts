"use strict";
import { Response, Request, NextFunction } from "express";
module.exports = function(){
    return (req : Request, res : Response, next : NextFunction) =>{
        console.log(`AuthFilter : ${req.url}`);
        if(req.url.startsWith("/api-service/oauth/getApiKey"))
        {
            next();
            return;
        }
        else if(req.url.startsWith("/api-service/oauth/authorize"))
        {
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
