import { useRef, useState } from "react";
import {Button, TextField} from "@mui/material";
import ButtonAppBar from "./components/Appbar/ButtonAppBar"

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
            <ButtonAppBar></ButtonAppBar>
            <h2>샘플1</h2>

            <Button
                variant={"outlined"}
                onClick={() => {
                    setStateCount((prev) => prev + 1);
                }}
            >State 버튼</Button>
            <Button
                variant={"outlined"}
                onClick={() => {
                    refCount.current += 1;
                }}
            >Ref 버튼</Button>
            <br />
            <br />
            <div>useState Count: {stateCount}</div>
            <div>useRef Count: {refCount.current}</div>
            <hr/>
            <h2>샘플2</h2>
            <div>
                <TextField id="filled-basic" label="Filled" variant="filled"  size="small" ref={textInput}/>
                <Button variant={"outlined"}  onClick={ClickBtn}>ref X</Button>

                <br />
                <br />
                <TextField id="filled-basic" label="Filled" variant="filled"  size="small" ref={textInput}/>
                <Button variant={"outlined"}  onClick={handleClickBtn}>ref O</Button>

            </div>

        </div>
    );
}