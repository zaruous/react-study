"use strict";
import * as DBAPI from "./DBAPI"
import {describe, expect, test} from '@jest/globals';
import {OkPacket} from "mysql2";


describe("DBAPI Test", ()=>{

    test("Select Test",async ()=>{

        let sql = "select * from company_info limit 10 ";
        await DBAPI.query(sql, [447690]).then((rows) => {
            console.log(rows);
        });
        expect(1).toBe(1);

        await DBAPI.query("select 1 as a ", [1]).then( (rows : OkPacket)  =>{
            console.log(rows);
        });

        console.log("testest.");
    });

    afterAll(()=>{
         DBAPI.close();
     });
});