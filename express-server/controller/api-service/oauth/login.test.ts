

import LoginImpl from "./login";
import Login from "./login";
import {userInfo} from "./authorize";
import {OkPacket} from "mysql2/index";
import {close} from "../../../api/DBAPI";

describe('' , ()=>{
    test("user test.", ()=>{
        // const ret = LoginImpl.registNewAccount(new UserInfo("test1", "kim"));
        //
        // ret.then( (ret : OkPacket)=>{
        //     console.log(ret);
        // })
        // console.log(ret);
        // expect("1").toBe("1");
    });

    afterAll(() => {
        close();
    });

})

