import { useRef, useState } from "react";

/** 정규식을 입력받아 그 결과를 출력해주는 화면 */
function RegexComponent(){

    const [regex, setRegex] = useState("");
    const [text, setText] = useState("");
    const [regexResult, setRegexResult] = useState([]);
    const txtRegex = useRef(null);


    function onRegexChange(e){
        setRegex(e.target.value);
    }

    function onTextChange(e){
        setText(e.target.value);
    }

    /*  text를 라인 단위로 분리한 뒤 arr 배열에 저장, arr 배열을 순회하면서 정규식으로 일치하는 결과를 리턴   */
    function onRegexClick(){
        let arr = text.split("\n");
        let result = "";
        let retArr = [];

        for(let i=0; i<arr.length; i++){
            let regexResult = arr[i].match(regex);
            if(regexResult != null){
                retArr.push({
                    text: arr[i],
                    pattern : regex,
                    result: 1
                });
            }
        }
        setRegexResult(retArr);
    }
    
    return (
        <div>
            <h1>Regex</h1>
            <div>
                <input
                    type="text"
                    style={{width:"50%"}}
                    onChange={onRegexChange}
                    ref={txtRegex}
                    placeholder="정규식을 입력하세요"
                />
                <br/>
                <hr/>
                <textarea
                    id="txtContent"
                    style={{width:"50%", height: "50vh" }}
                    onChange={onTextChange}
                    placeholder="텍스트를 입력하세요"
                />
                <button onClick={onRegexClick}>검사</button>
            </div>
            <div>
            <hr/>
            <p>결과</p>
            {
                regexResult.filter(item=>{
                    return item.result;
                }).map(item =>{
                    return (
                        <div>
                            <div>{item.text} {item.result}</div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
    
}



export default RegexComponent;

