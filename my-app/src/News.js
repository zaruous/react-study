
import axios from 'axios';
import {useCallback, useState} from 'react';
import React, { useEffect } from 'react';
import styles from './News.css';
import {get} from "./api/Request";

function News(callback, deps){

    /* 온로드시 updateNewData함수를 호출한다. */
    useEffect(() => {
        updateExchange();
    }, []);

    /* 화면이 로드될때 호출되는 함수 */
    const [news, setNews] = useState([]);
    const [retJson, setretJson] = useState([]);
    const [exchange, setExchange] = useState([]);
    const [getNaverNews, setRetNaverNews] = useState([]);
    const [naverRealtimeSearch, setNaverRealtimeSearch] = useState([]);
    const [dailyByte, setDailyByte] = useState([]);
    /* 원달러 환율 api */
    function updateExchange() {
        console.log("updateExchange");


get("/api-service/News/exchange", {},{
    "Access-Control-Allow-Credentials":true,
    "action":"exchange",
},  res => setExchange(res.data), err=>{
    console.log(err.message);
});
        // axios(
        //     {
        //         method:'GET',
        //         url:'/api-service/News/exchange',
        //         headers:{
        //             "Access-Control-Allow-Credentials":true,
        //             "action":"exchange",
        //         },
        //         responseType: 'json'
        //     }
        // ).then(res => setExchange(res.data));
    }


    function updateNewData(){
       
        axios({
            method:'GET',
            url:'/api-service/News/getNews',
            headers:{
                "Access-Control-Allow-Credentials":true,
                "action":"getNews",
            },
            responseType: 'json'
        }).then(a => {
            setretJson(a.data);
            setRetNaverNews([]);
        }).catch(e =>{ alert(e);})

        
    }

    function naverNews(){
        axios({
            method:'GET',
            url:'/api-service/News/getNaverNews',
            headers:{
                "Access-Control-Allow-Credentials":true,
                "action":"getNaverNews",
            },
            responseType: 'json'
        }).then(a => {

            let arr = [];
            arr.push(...a.data.articles);
            arr.push(...a.data.naver);
            setretJson([]);
            setRetNaverNews( arr );
        }).catch(e =>{ alert(e);})
    }


    
    const onClick = useCallback(()=>{
        updateNewData();
    }, []);

    const onNaverClick = useCallback(()=>{
        naverNews();
    }, []);

    const onDailyByteClick = useCallback(()=>{
        axios({
            method:'GET',
            url:'/api-service/News/dailybytes',
            headers:{
                "Access-Control-Allow-Credentials":true,
            },
            responseType: 'json'
        }).then(a => {
            console.log(a.data);
            setDailyByte(a.data);
        }).catch(e =>{ alert(e);})

    }, [setDailyByte]);

    return (
        <div className="News">
            <div>원달러 환율 : </div>
            <div>exchange.date : {exchange.length > 0? exchange[1].date: ""}</div>
            <div>exchange.rate : {exchange.length > 0? exchange[0].rate : ""} : {exchange.length > 0? exchange[1].rate: ""}</div>
         
            <div id="parentFlexContainer" style={styles.parentFlexContainer}>
                <div className='childFlexItems flexLeft'>
                    <button onClick={onClick} >증권 뉴스</button>
                    <button onClick={onNaverClick}>네이버 뉴스</button>
                    <button onClick={onDailyByteClick}>데일리바이트</button>
                </div>
                <div className='childFlexItems flexRight' >
                    <table border='1px'>
                        {
                            retJson.map((item, index)=>{
                                return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td><img className='economyImage' src={item.thumbUrl}></img></td>
                                            <td><a target={'_blank'} href={'https://m.stock.naver.com/news/mainnews/view/'+item.oid+'/'+item.aid}>{item.tit}</a></td>
                                            <td>{item.subcontent}</td>
                                            <td>{formatDate(item.dt)}</td>
                                        </tr>
                                    );
                            })
                        }   
                    </table>
                    <table border='1px'>
                        {
                            (getNaverNews) ? getNaverNews.map((item, index)=>{
                                return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td><img src={item.image} className='naverImage'></img></td>
                                            <td><a target={'_blank'} href={item.link}>{item.title}</a></td>
                                            <td>{item.desc}</td>
                                            <td></td>
                                        </tr>
                                    );
                            }) : null
                        }   
                    </table>
                    <table border='1px'>
                        {
                            dailyByte.map((item, index)=>{
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td><img className='dailyimage' src={item.imgUrl}></img></td>
                                        <td><a target={'_blank'} href='{item.contentUrl}'>{item.title}</a></td>
                                        <td>{item.title}</td>
                                        <td></td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}
             


function formatDate(dt){
    try{
        
        let ret = new Date(dt.replace(
            /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
            '$4:$5:$6 $2/$3/$1'
        )).toLocaleDateString();
        ret += "(" + dt +")";
        //return ret;
        
        
        return ret + "::" + Date.parseExact(dt, "yyyyMMdd");
        


    }catch(e){
        return e.message;
    }
    return "NA";
}

export default News;
