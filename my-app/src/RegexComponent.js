import { useRef, useState } from "react";

/** 정규식을 입력받아 그 결과를 출력해주는 화면 */
function RegexComponent(){

    const [regex, setRegex] = useState("");
    const [text, setText] = useState("");
    const [regexResult, setRegexResult] = useState("");
    const txtRegex = useRef(null);


    function onRegexChange(e){
        setRegex(e.target.value);
    }

    function onTextChange(e){
        setText(e.target.value);
    }

    function checkExpression(){
       
        const r = new RegExp(regex);
        const result = r.test(text);
        setRegexResult("결과는 : " + result);
    }

    
    return (
        <div>
            <h1>Regex</h1>
            <div id="flexContainer">
                <input
                    type="text"
                    style={{width:"50%"}}
                    onChange={onRegexChange}
                    ref={txtRegex}
                />
                <input
                    type="text"
                    style={{width:"50%"}}
                    onChange={onTextChange}
                />

                <button onClick={checkExpression}>검사</button>
            </div>
            <div>
            <p>{regexResult}</p>
            </div>
        </div>
    );
    
}

export default RegexComponent;

