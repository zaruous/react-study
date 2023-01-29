"use strict";
import { Response, Request, NextFunction } from "express";
import {Element, Document} from "cheerio";
import {AxiosResponse} from "axios";
const axios = require("axios");
const cheerio = require("cheerio");

exports.news =  (req : Request, res : Response) => {

    const newType = req.params.newsType;
    if("getNews" === newType)
    {
        axios.get("https://m.stock.naver.com/api/news/list?category=mainnews&page=1&pageSize=30").then((response : AxiosResponse) => {
            res.send(response.data);
        });
    }
    else if("exchange" === newType)
    {
        axios.get("https://api.manana.kr/exchange/rate.json").then((response : AxiosResponse) => {
            res.send(response.data);
        });
    }
    else if("getNaverNews" === newType)
    {
        axios.get("https://api.signal.bz/news/realtime").then((response : AxiosResponse) => {
            res.send(response.data);
        });
    }
    else if("dailybytes" === newType)
    {
        const dailyByteRootUrl = "https://mydailybyte.com";
        const getHtml = async ()=>{
            return await axios.get(dailyByteRootUrl);
        }

        getHtml().then((response : AxiosResponse) => {
            let html = response.data;
            const $ = cheerio.load(html);
            const $postCardList = $(".c-post-card__media").children();

            const retList : Array<any> = [];
            $postCardList.each(function(i: number, ele: Element ){



                const imgUrl = $(this).find(".c-post-card__image").attr("data-src");
                const title = $(this).find(".c-post-card__image").attr("alt");
                const relativePath = $(this).find(".c-post-card__image-wrap").attr("href");

                //console.log(ele.attribute("href"));
                console.log("tagname : " + ele + " title : " +  title + " relativePath : " + relativePath);
                const contentUrl = dailyByteRootUrl + relativePath;
                retList.push({
                    "title": title,
                    "imgUrl" : imgUrl,
                    "contentUrl" : contentUrl,
                });
            });
            //console.log(retList);


            res.send( JSON.stringify(retList)  );
        });

    }
};