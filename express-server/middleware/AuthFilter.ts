"use strict";
import { Response, Request, NextFunction } from "express";
import session from "express-session";
//const session = require("express-session");

module.exports = function(){
    return (req : Request, res : Response, next : NextFunction) =>{
        let msg = `AuthFilter : [${new Date()}][${req.url}][req.ip]\t`;

        if(req.url.startsWith("/api-service/oauth/getApiKey")
        || req.url.startsWith("/api-service/oauth/authorize")
            || req.url.startsWith("/api-service/oauth/login")
        )
        {
            msg += "ignore";
            console.log(msg);
            next();
            return;
        }
        else{

            // @ts-ignore
            if(req.session.user)
                next();
            else
                res.status(401).send('Login failed');
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
