import { useRef, useState } from "react";

export default function UseRefStudy() {
    /*샘플1*/
    const [stateCount, setStateCount] = useState(0);
    const refCount = useRef(0);


    /* 샘플2 */
    const textInput = useRef(null);  // --- ⓵ useRef 생성
    const ClickBtn = () => {
        console.log("Click!");
    };
    const handleClickBtn = () => {
        textInput.current.focus();  // --- ⓷ useRef가 가리키는 input 태그에 포커스 이벤트 적용
        textInput.current.value = "1";
    };

    return (
        <div>
            <h2>샘플1</h2>
            <button
                onClick={() => {
                    setStateCount((prev) => prev + 1);
                }}
            >
                State 버튼
            </button>
            <button
                onClick={() => {
                    refCount.current += 1;
                }}
            >
                Ref 버튼
            </button>
            <br />
            <br />
            <div>useState Count: {stateCount}</div>
            <div>useRef Count: {refCount.current}</div>
            <hr/>
            <h2>샘플2</h2>
            <div>
                <input type="text" />
                <input type="button" value="ref X" onClick={ClickBtn} />
                <br />
                <input type="text" ref={textInput} />
                <input type="button" value="ref O" onClick={handleClickBtn} />
            </div>

        </div>
    );
}