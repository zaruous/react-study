

import raw from './testdata2.json';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';


function News(){

    //updateNewData();

    function updateNewData(){
        

        /*
        axios({
            method:'GET',
            url:'/api-service/News',
            headers:{
                "Access-Control-Allow-Credentials":true
            },
            responseType: 'json'
        }).then(a => {
            setretJson(a.data);
        }).catch(e =>{ alert(e);})
        */

        setretJson([{"type":1,"subcontent":"제롬 파월 미 연준 의장/AFPBBNews=뉴스129일 오전 아시아 주요 증시에 &#039;검은 월요일&#039; 공포가 짙게 드리우고 있다. 제롬 파월 미국 연방준비제도(Fed·연준) 의장의 잭슨홀 미팅 발언으로 미국 증시가 수직 낙하하면서 그 충격이 아시아 증시에도","thumbUrl":"https://imgnews.pstatic.net/image/origin/008/2022/08/29/4788394.jpg?type=nf206_146","oid":"008","ohnm":"머니투데이","aid":"0004788394","tit":"美파월이 부른 '검은 월요일'…日·대만 2% 넘게 급락 [Asia오전]","dt":"20220829114859"},{"type":1,"subcontent":"상반기 5억 이상 고액 보수자 885명그 중 카카오그룹 가장 많이 받아조우용·여민주 전 공동대표 1,2위여민수(왼쪽), 조수용 카카오 전 공동대표. [사진 출처 = 카카오] 올해 증시가 힘겨운 시간을 보내는 가운데 상반기 상장사 중 5억원 이상 보수를 받은 임직원이 8","thumbUrl":"https://imgnews.pstatic.net/image/origin/009/2022/08/29/5010317.jpg?type=nf206_146","oid":"009","ohnm":"매일경제","aid":"0005010317","tit":"반년새 -38%, 개미 곡소리 나는 동안…임원은 1300억 받아갔다","dt":"20220829125201"},{"type":1,"subcontent":"29일 오전 코스피·코스닥지수가 2% 넘게 급락하고 있다. 유가증권시장에서 장 초반 순매수하던 외국인이 ‘팔자’로 돌아서며, 국내 기관 투자자들과 함께 매물을 쏟아내고 있다.일러스트=손민균        이날 오전 11시 40분 현재 코스피지수는 전 거래일","thumbUrl":"https://imgnews.pstatic.net/image/origin/366/2022/08/29/837165.jpg?type=nf206_146","oid":"366","ohnm":"조선비즈","aid":"0000837165","tit":"코스피 2% 넘게 급락…외국인 ‘팔자’로 전환","dt":"20220829114802"},{"type":1,"subcontent":"제롬 파월 미국 연방준비제도(연준) 의장./연합뉴스[서울경제] 제롬 파월 미국 연방준비제도(연준) 의장의 '매파' 연설에 코스피가 와르르 무너졌다.29일 오전 9시 12분 코스피는 전날보다 59.39포인트(2.39%) 내린 2421.64를 나타내고 있다. 이날 코스피는","thumbUrl":"https://imgnews.pstatic.net/image/origin/011/2022/08/29/4092729.jpg?type=nf206_146","oid":"011","ohnm":"서울경제","aid":"0004092729","tit":"[오전시황] 파월 '매파본능'에 코스피 와르르…2%대 급락 2420선 '위태'","dt":"20220829093801"},{"type":1,"subcontent":"미 파월 매파 발언에 달러인덱스 109선뉴욕 선물 지수도 하락세 지속주요국 긴축 강도 세져…위험자산 회피 심리존 윌리엄스 미국 뉴욕 연방준비은행 총재(왼쪽)와 라엘 브레이너드 연방준비은행(Fed) 부의장(가운데), 제롬 파월 연준 의장(오른쪽)이 지난 26일(현지시간)","thumbUrl":"https://imgnews.pstatic.net/image/origin/018/2022/08/29/5304207.jpg?type=nf206_146","oid":"018","ohnm":"이데일리","aid":"0005304207","tit":"[외환브리핑]10원 급등한 역외환율…연고점 테스트 vs 외환당국 개입이냐","dt":"20220829081701"}]);
    }

    //axios.defaults.withCredentials = true;
    /*
    

    let retJson =   axios.get("http://localhost:8090/api-service/testdata.json").then(a=>a.json()).then(a => console.log(JSON.stringify(a)));    
    
    */
    const [retJson, setretJson] = useState([]);
    const onClick = function NewOnClick(){
        updateNewData();
        //axios.defaults.withCredentials = true;
        /*
        axios({
            method:'POST',
            url:'http://localhost:8090/api-service/Login.do',
            data:{
                uid: '1',
                upass: ''
            },
            headers:{
                
                "Access-Control-Allow-Credentials":true
            },
        }).catch(e => console.log(e));
        */
       
        
        //setretJson([{"type":1,"subcontent":"제롬 파월 미 연준 의장/AFPBBNews=뉴스129일 오전 아시아 주요 증시에 &#039;검은 월요일&#039; 공포가 짙게 드리우고 있다. 제롬 파월 미국 연방준비제도(Fed·연준) 의장의 잭슨홀 미팅 발언으로 미국 증시가 수직 낙하하면서 그 충격이 아시아 증시에도","thumbUrl":"https://imgnews.pstatic.net/image/origin/008/2022/08/29/4788394.jpg?type=nf206_146","oid":"008","ohnm":"머니투데이","aid":"0004788394","tit":"美파월이 부른 '검은 월요일'…日·대만 2% 넘게 급락 [Asia오전]","dt":"20220829114859"},{"type":1,"subcontent":"상반기 5억 이상 고액 보수자 885명그 중 카카오그룹 가장 많이 받아조우용·여민주 전 공동대표 1,2위여민수(왼쪽), 조수용 카카오 전 공동대표. [사진 출처 = 카카오] 올해 증시가 힘겨운 시간을 보내는 가운데 상반기 상장사 중 5억원 이상 보수를 받은 임직원이 8","thumbUrl":"https://imgnews.pstatic.net/image/origin/009/2022/08/29/5010317.jpg?type=nf206_146","oid":"009","ohnm":"매일경제","aid":"0005010317","tit":"반년새 -38%, 개미 곡소리 나는 동안…임원은 1300억 받아갔다","dt":"20220829125201"},{"type":1,"subcontent":"29일 오전 코스피·코스닥지수가 2% 넘게 급락하고 있다. 유가증권시장에서 장 초반 순매수하던 외국인이 ‘팔자’로 돌아서며, 국내 기관 투자자들과 함께 매물을 쏟아내고 있다.일러스트=손민균        이날 오전 11시 40분 현재 코스피지수는 전 거래일","thumbUrl":"https://imgnews.pstatic.net/image/origin/366/2022/08/29/837165.jpg?type=nf206_146","oid":"366","ohnm":"조선비즈","aid":"0000837165","tit":"코스피 2% 넘게 급락…외국인 ‘팔자’로 전환","dt":"20220829114802"},{"type":1,"subcontent":"제롬 파월 미국 연방준비제도(연준) 의장./연합뉴스[서울경제] 제롬 파월 미국 연방준비제도(연준) 의장의 '매파' 연설에 코스피가 와르르 무너졌다.29일 오전 9시 12분 코스피는 전날보다 59.39포인트(2.39%) 내린 2421.64를 나타내고 있다. 이날 코스피는","thumbUrl":"https://imgnews.pstatic.net/image/origin/011/2022/08/29/4092729.jpg?type=nf206_146","oid":"011","ohnm":"서울경제","aid":"0004092729","tit":"[오전시황] 파월 '매파본능'에 코스피 와르르…2%대 급락 2420선 '위태'","dt":"20220829093801"},{"type":1,"subcontent":"미 파월 매파 발언에 달러인덱스 109선뉴욕 선물 지수도 하락세 지속주요국 긴축 강도 세져…위험자산 회피 심리존 윌리엄스 미국 뉴욕 연방준비은행 총재(왼쪽)와 라엘 브레이너드 연방준비은행(Fed) 부의장(가운데), 제롬 파월 연준 의장(오른쪽)이 지난 26일(현지시간)","thumbUrl":"https://imgnews.pstatic.net/image/origin/018/2022/08/29/5304207.jpg?type=nf206_146","oid":"018","ohnm":"이데일리","aid":"0005304207","tit":"[외환브리핑]10원 급등한 역외환율…연고점 테스트 vs 외환당국 개입이냐","dt":"20220829081701"}]);
    }


    
    //let retJson = fetch("http://localhost:8090/api-service/testdata.json").then(a=>a.json());
    //const retJson = raw;
    return (
        <div className="News">
            <button onClick={onClick}>호출</button>
            <table border='1px'>
                {
                    retJson.map((item, index)=>{
                        return (
                                <tr>
                                    <td>{index}</td>
                                    <td><img src={item.thumbUrl}></img></td>
                                    <td>{item.tit}</td>
                                    <td>{item.subcontent}</td>
                                    <td>{formatDate(item.dt)}</td>
                                </tr>
                            );
                    })
                }
                <tr></tr>
            </table>
        </div>
    );
}

function formatDate(dt){
    try{
        return  moment(dt, "YYYYMMDDhhmmss").format("YYYY-MM-DD hh:mm:ss");
    }catch(e){
        return e.message;
    }
}

export default News;