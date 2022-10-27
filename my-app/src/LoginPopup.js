

function LoginPopup(){
    return (
        <>
            <div className="login-popup">
                <div className="login-popup__content">
                    <div className="login-popup__close">
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="login-popup__title">
                        <h2>로그인</h2>
                    </div>
                    <div className="login-popup__form">
                        <form action="">
                            <div className="login-popup__form__input">
                                <input type="text" placeholder="아이디"/>
                            </div>
                            <div className="login-popup__form__input">
                                <input type="password" placeholder="비밀번호"/>
                            </div>
                            <div className="login-popup__form__input">
                                <input type="submit" value="로그인"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}

export default LoginPopup;