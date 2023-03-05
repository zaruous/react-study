"use strict";
import { Response, Request, NextFunction } from "express";
import {OkPacket, Query} from "mysql2/index";
import session, {Session} from "express-session";
import UserInfo from "./UserInfo";
const DBAPI = require("../../../api/DBAPI");

module LoginImpl {

    interface onExists { (userInfo: UserInfo): void }
    interface onNotExists { (): void }

    /**
     * investar 데이터베이스의 users 테이블에서 입력된 userName와 userPwd와 일치되는 사용자 정보가
     *         존재하는지 확인하는 코드 구현
     * @param UserEmail
     * @param userPwd
     * @param onExists
     * @param notExists If no matching email address is found, this callback will be executed
     * @constructor
     * @private
     */
    export function doLogin(userEmail: string,  onExists: onExists, notExists?: onNotExists) : void {
        const sql : string = "select userEmail, userName from users where 1=1 and UserEmail =? limit 1 ";
        const param : string[] = [userEmail];

        DBAPI.query(sql, param).then((rows : OkPacket[]) =>{
            if(rows.length == 0)
            {
                if(notExists)
                    notExists();
                return;
            }
            else{
                // @ts-ignore
                onExists( new UserInfo(rows[0].userEmail, rows[0].userName));
                return;
            }
        });
    }



    /**
     *
     * @param user
     */
    export function registNewAccount(user : UserInfo) : Query{
        const sql : string = "insert into userEmail, userName User values( ?, ? ) ";
        const param : string[] = [user.UserEmail, user.UserEmail];
        return DBAPI.update(sql, param);
    }

}

/**
 *
 * @param request
 * @param response
 */
function doLogin(request : Request, response : Response){
    const email : string  = request.query["email"] ? request.query["email"] as string : "";
    const userPwd  = request.query["userPwd"];
    LoginImpl.doLogin(email,  (userInfo : UserInfo)=>{
        request.session.user = userInfo;

        response.send(
            { message :  email + "\tlogin success" }
        );

    }, ()=>{
        response.status(401).send(
            { message :  email + "\tlogin fail" }
        );
    });

}

export default LoginImpl;
export  { doLogin}

