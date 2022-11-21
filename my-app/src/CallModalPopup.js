import axios from "axios";


function CallModalPopup({showPopup}){

    const callModalPopupOnClick = () => {
        //alert('callModalPopupOnClick');
        showPopup();
    };

    const callLoginPopupOnClick = () => {
        /*인가 코드 요청*/

        axios.get('http://localhost:8190/api-service/oauth/authorize?client_id=client&response_type=code&redirect_uri=http://localhost:3000/oauth2/redirect');
    };

    return (
        <>
            <p>모달팝업 테스트</p>
            <button onClick={callModalPopupOnClick}>버튼</button>
            <button onClick={callLoginPopupOnClick}
                    style={btnLoginStyle}></button>

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