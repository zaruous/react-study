

import raw from './testdata2.json';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {IDateJS} from 'datejs';
import React, { useEffect } from 'react';
import styles from './News.css';

function News(){

    /* 온로드시 updateNewData함수를 호출한다. */
    useEffect(() => {
        //updateNewData();
    }, []);

    /* 화면이 로드될때 호출되는 함수 */
    const [news, setNews] = useState([]);
    const [retJson, setretJson] = useState([]);
    const [exchange, setExchange] = useState([]);
    const [getNaverNews, setRetNaverNews] = useState([]);

    /* 원달러 환율 api */
    function updateExchange() {

        axios(
            {
                method:'GET',
                url:'/api-service/News',
                headers:{
                    "Access-Control-Allow-Credentials":true,
                    "action":"exchange",
                },
                responseType: 'json'
            }
        ).then(res => setExchange(res.data));
    }


    function updateNewData(){
       
        axios({
            method:'GET',
            url:'/api-service/News',
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
            url:'/api-service/News',
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
    
    const onClick = function NewOnClick(){
        updateNewData();
        updateExchange();
    }

    const onNaverClick = ()=>{
        naverNews();
    }

    return (
        <div className="News">
            <button onClick={onClick}>증권 뉴스</button>
            <button onClick={onNaverClick}>네이버 뉴스</button>
            {
                /* exchange에 값이 존재하는 경우 exchange[0].rate 출력  */
                exchange.length > 0 ? <div>원달러 환율 : <div>
                                            <div>exchange.date : {exchange[1].date}</div>
                                            <div>exchange.rate : {exchange[0].rate} : {exchange[1].rate}</div>
                                            </div>
                                        </div> : null
            }
            <div id="parentFlexContainer" style={styles.parentFlexContainer}>
                <div className='childFlexItems flexLeft'>
                    
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
