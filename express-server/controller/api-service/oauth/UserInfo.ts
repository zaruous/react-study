/**
 *
 */
export default class UserInfo {

    UserEmail : string;
    UserName : string;
    private _loginType : LoginType = LoginType.Default;
    constructor(userEmail : string, userName : string){
        this.UserEmail = userEmail;
        this.UserName = userName;
    }

    get loginType(): LoginType {
        return this._loginType;
    }

    set loginType(value: LoginType) {
        this._loginType = value;
    }
}

enum LoginType{
    Default,
    KAKAO
}

export { LoginType} ;