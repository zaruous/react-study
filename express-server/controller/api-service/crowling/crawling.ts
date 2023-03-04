import {AxiosRequestConfig} from 'axios';
import {Element, load} from 'cheerio';
import RequestUtil from "../../../api/RequestUtil";

type ImgCallback = (element: Element) => boolean;

export default class Crawling {

    static async scrapeImages(url: string, callback?: ImgCallback): Promise<string[]> {
        const results: string[] = [];
        try {
            const req = new RequestUtil();

            req.config = {
                url: url,
                method: "get",
                headers:{
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                    "Accept-Encoding":"utf-8",
                }
            } as AxiosRequestConfig;

            const response = await req.request();

            //response.data.toString("binary");

            const $ = await load(response.data);

            $('img').each(function (idx, element) {


                const current = $(this);
                const imageUrl = current.attr('src');
                if (!imageUrl) return;
                if (callback) {
                    // Cheerio<Element> 타입을 Element 타입으로 형변환);
                    const retCallback = callback(current as unknown as Element);
                    if (retCallback) {
                        results.push(imageUrl);
                    }
                } else {
                    results.push(imageUrl);
                }

                //console.log(current.attr('jsname'));

            });
        } catch (error : any) {
            console.error(error);
        }
        return results;
    }
    /**
     *
     * @param searchQuery
     */
    static async scrapeGoogleAllImages(searchQuery: string, callback?: ImgCallback): Promise<string[]> {
        const results: string[] = [];
        try {
            const req = new RequestUtil();

            req.config = {
                url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`,
                method: "get"
            } as AxiosRequestConfig;

            const response = await req.request();
            const $ = load(response.data);

            $('img').each(function (idx, element) {

                const current = $(this);
                const imageUrl = current.attr('src');
                if (!imageUrl) return;
                if (callback) {
                    // Cheerio<Element> 타입을 Element 타입으로 형변환);
                    if (callback(current as unknown as Element)) {
                        results.push(imageUrl);
                    }
                } else {
                    results.push(imageUrl);
                }

                //console.log(current.attr('jsname'));

            });
        } catch (error) {
            console.error(error);
        }
        return results;
    }
}

