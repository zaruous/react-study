"use strict";
import * as DBAPI from "./DBAPI"
import {describe, expect, test} from '@jest/globals';
import {OkPacket} from "mysql2";
import {generateTimestamp} from "./IdgenUtil";

describe("DBAPI Test", ()=>{

    test("Select Test",async ()=>{

        let sql = "select * from company_info limit 2 ";
        await DBAPI.query(sql, [447690]).then((rows) => {
            console.log(rows);
        });
        expect(1).toBe(1);

        await DBAPI.query("select 1 as a ", [1]).then( (rows : OkPacket)  =>{
            console.log(rows);
        });

        const testid = generateTimestamp() + "@naver.com";
        const testname = generateTimestamp() + "@naver.com";
        await DBAPI.update(
            " insert into users(useremail, userid)  values (? , ? )", [ testid , testname] )
            .then(( row : OkPacket) =>{
               console.log(row);
            });

        await DBAPI.update(
            " delete from users where 1=1 and useremail = ? ", [ testid] )
            .then(( row : OkPacket) =>{
                console.log(row);
            });

        console.log("testest.");
    });

    afterAll(()=>{
         DBAPI.close();
     });
});