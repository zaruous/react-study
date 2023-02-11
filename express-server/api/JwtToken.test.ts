import Token from "./JwtToken";
import {expect} from "@jest/globals";

/**
 *
 */

describe("jwt token tests.", ()=> {

    test('generate jwt token  create and verify test.',()=>{

        const t = new Token();
        const token = t.generateToken({ subject: 'user1' });
        console.log(token);
        const vert = t.verifyToken(token);
        console.log(vert);
        expect("user1").toBe(vert.subject);

    });
})
