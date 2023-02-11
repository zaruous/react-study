import Token from "./JwtToken";
import {expect} from "@jest/globals";


/**
 *
 */

describe("jwt token tests.", ()=> {

    test('generate jwt token  create and verify test.',()=>{

        const t = new Token();
        const obj  = { email : "email"};
        const token = t.generateToken(obj);
        console.log(token);
        const vert = t.verifyToken(token);
        console.log(vert);
        expect("email").toBe(vert.email);

    });
})
