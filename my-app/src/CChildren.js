
//const img = require("../public/images/KakaoTalk_20230215_121440816.jpg");
import React from "react";

const Hello  = (props)=>{

    const imgSrc = {
        width:"40%",
        height:"40%"
    }
    return(
        
        <div>
            <div>리액트를 학습하기 위한 페이지.</div>
            <div>안녕하세요 {props.children} 님.</div>
            <div>{props.name} {props.age}</div>
            <img src="./images/KakaoTalk_20230215_121440816.jpg" alt="img1" style={imgSrc}  />
        </div>
    );

}

const profile = {
    name:'kim'
    ,age:13
}
function CChildren(){
    return(<div>
        <Hello {...profile}>
            x
        </Hello>
    </div>);
}
export default CChildren;

