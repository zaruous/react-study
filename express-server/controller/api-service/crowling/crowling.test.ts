

import Crawling from "./crawling";
import {Element} from "cheerio";
import {expect} from "@jest/globals";
import RequestUtil from "../../../api/RequestUtil";


const fs = require("fs");

describe("image fetch " ,()=>{

    test("하숙집", ()=>{
        return Crawling.scrapeImages("https://newtoki218.com/webtoon/11094439/Boarding-diary-Raw-Chapter-26?stx=%ED%95%98%EC%88%99&toon=%EC%84%B1%EC%9D%B8%EC%9B%B9%ED%88%B0&spage=1", (element: Element) : boolean => {
            // @ts-ignore
            return element.attr("src").indexOf("newtoki15.org") >=0;
        }).then(  async urls =>{
            console.log(urls);
            expect(urls.length).toBeGreaterThan(1);

            for(let i =0; i< urls.length; i++)
            {
                const url =  urls[i];
                await new RequestUtil({
                    url,
                    method: "get",
                    responseType: 'arraybuffer', // Important
                    headers : {
                        "Accept": "application/json, text/plain, */*",
                        "Accept-Encoding": "gzip, deflate, br",
                        // 'Content-Type': 'application/gzip'
                    }
                }).request().then(  async (res) => {
                    if(res.status == 200){
                        console.log(`write file ${url}`);
                        await fs.writeFile(`downloads/${i}.jpg`, res.data, 'binary', () =>{ });
                    }
                    else{
                        console.log(`fail to response ${res.status} ${url}`);
                    }
                }).catch(err =>  { console.log(`${url}  ${err}`);} );
            }

        }).catch(err =>{
            throw err;
        });


    });
    
    // test("test", ()=>{
    //     return Crawling.scrapeImages("https://namu.wiki/w/Palette", (element: Element) : boolean => {
    //
    //         return element.attributes.filter( attr =>{ "class" === attr.name && "ZddV11jW" === attr.value  }).length == 1;
    //
    //         //return true;
    //     }).then( urls =>{
    //         console.log(urls);
    //         expect(urls.length).toBeGreaterThan(1);
    //
    //         // urls.forEach( (str , idx) =>{
    //         //     console.log(str);
    //         // });
    //
    //     }).catch(err =>{
    //         throw err;
    //     });
    //
    //
    // });

});


