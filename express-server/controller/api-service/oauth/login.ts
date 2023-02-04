"use strict";
import { Response, Request, NextFunction } from "express";
const DBAPI = require("../../../api/DBAPI");

module LoginImpl {

    export class UserInfo{
        UserEmail : string;
        UserName : string;
        constructor(UserEmail : string, UserName : string){
            this.UserEmail = UserEmail;
            this.UserName = UserName;
        }
    }
    interface onExists { (userInfo: UserInfo): void }

    /**
     * investar 데이터베이스의 users 테이블에서 입력된 userName와 userPwd와 일치되는 사용자 정보가
     *         존재하는지 확인하는 코드 구현
     * @param UserEmail
     * @param userPwd
     * @param callback
     * @constructor
     * @private
     */
    export function doLogin(UserEmail: string, userPwd: string, callback: onExists) : void {
        const sql : string = "select UserEmail, UserName from users where 1=1 and UserEmail =? and UserPwd =? limit 1 ";
        const param : string[] = [UserEmail, userPwd];

        return DBAPI.query(sql, param, (err : Error, rows : Array<any>, fields: Array<any> ) => {
            if(err) throw err;
            if(callback)
            {
                if(rows.length > 0)
                {
                    callback(new UserInfo( rows[0].UserEmail, rows[0].UserName));
                }
            }
        });
    }
}

function doLogin(request : Request, response : Response){
    const email : string = request.params["email"];
    const userPwd : string = request.params["userPwd"];

    LoginImpl.doLogin( email, userPwd, info =>{

    });
}



module.exports = { LoginImpl, doLogin }
