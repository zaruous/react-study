/* 오늘 날짜를 출력하는 코드 작성  */

function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var today = year + "년 " + month + "월 " + day + "일";
    return today;
}


function getGoogleNews(){
    var url = "https://news.google.com/news/rss";
    var xml = new XMLHttpRequest();
    xml.open("GET", url, false);
    xml.send();
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName("item");
    var news = "";
    for(var i = 0; i < items.length; i++){
        news += items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "";
    }
    return news;
}


console.log(getGoogleNews());


/* 소수 두번쨰 자리까지만 입력했는지 체크하는 함수  */
function numberCheckLimitPlace(value, limit) {
    
}