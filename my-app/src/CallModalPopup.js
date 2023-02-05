import axios from "axios";

import {useState} from "react";

function CallModalPopup({showPopup}){


    const [msg,setMsg] = useState("")

    const callModalPopupOnClick = () => {
        //alert('callModalPopupOnClick');
        showPopup();
    };

    const callLoginPopupOnClick = () => {

        axios(
            {
                method:'GET',
                url:'/api-service/oauth/getApiKey',
                headers:{
                    "Access-Control-Allow-Credentials":true,
                    "action":"getApiKey",
                },
                responseType: 'json'
            }
        ).then(res =>{
            /*인가 코드 요청*/
            const apiKey = res.data.restApiKey;
            const redirectUrl = res.data.redirectUrl;
            const url = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code`;

            //window.open(url, "target", 'top=100, left=300, width=500, height=600, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=no');
            window.location.href = url;
        }).catch(err =>{
            setMsg(`[getApiKey]${err.message}`);
        })


    };

    return (
        <>
            <p>모달팝업 테스트</p>
            <button onClick={callModalPopupOnClick}>버튼</button>
            <button onClick={callLoginPopupOnClick}
                    style={btnLoginStyle}></button>
            <div>{msg}</div>
        </>
    );
}

/*카카오 로그인 버튼 스타일 */
const btnLoginStyle = {
    backgroundImage: 'url(./images/kakao_login_medium_narrow.png)',
    width: '222px',
    height: '48px',
    border: 'none',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '10px',
    marginBottom: '10px',
};
export default CallModalPopup;