

function CallModalPopup({showPopup}){

    const callModalPopupOnClick = () => {
        //alert('callModalPopupOnClick');
        showPopup();
    };

    const callLoginPopupOnClick = () => {

    };

    return (
        <>
            <p>모달팝업 테스트</p>
            <button onClick={callModalPopupOnClick}>버튼</button>
            <button onClick={callLoginPopupOnClick}>로그인</button>
        </>
    );
}

export default CallModalPopup;