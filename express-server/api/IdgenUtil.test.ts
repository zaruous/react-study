
import {generateTimestamp} from "./IdgenUtil";

describe("generate id test.", ()=> {
    test('generate jwt token  create and verify test.',()=>{


        for(let i =0; i< 1; i++)
        {
            const v = generateTimestamp();
            console.log(v);
        }
    });
})