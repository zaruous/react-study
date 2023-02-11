"use strict";
import { Response, Request, NextFunction } from "express";
import {OkPacket, Query} from "mysql2/index";
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
    export function doLogin(UserEmail: string,  onExists: onExists, notExists?: onNotExists) : void {
        const sql : string = "select userEmail, userName from users where 1=1 and UserEmail =? limit 1 ";
        const param : string[] = [UserEmail];

        return DBAPI.query(sql, param, (err : Error, rows : Array<any>, fields: Array<any> ) => {
            if(err) throw err;
            if(onExists)
            {
                if(rows.length > 0)
                {
                    onExists(new UserInfo( rows[0].UserEmail, rows[0].UserName));
                }
                else{
                    if(notExists)
                        notExists();
                }
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

function doLogin(request : Request, response : Response){
    const email : string = request.params["email"];
    const userPwd : string = request.params["userPwd"];

    LoginImpl.doLogin( email, info =>{

    });
}

export default LoginImpl;
export  { doLogin}

