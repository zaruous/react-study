const jwt = require('jsonwebtoken');

/**
 *
 */
interface IToken {
    /**
     *
     */
    secret : string;

    /**
     * generate token.
     * @param payload
     */
    generateToken(payload : {}|[]):string;

    /**
     * vertify token
     * @param token
     */
    verifyToken(token : string ) : any;
}

class DefaultToken implements IToken {
    private _secret: string = "mysecret";

    constructor(secret : string = "") {
        if(secret)
            this._secret = secret;
    }
    get secret(): string {
        return this._secret;
    }
    set secret(value: string) {
        this._secret = value;
    }

    /**
     *
     * @param payload
     */
    public generateToken(payload : {}|[]): string{
        const token = jwt.sign(payload, this.secret);
        return token;
    };

    /**
     *
     * @param token
     */
    public verifyToken(token : string ) : any{
        return jwt.verify(token, this.secret);
    }
}

class ToeknObject{
    email : string | undefined;

}
/**
 * default token class.
 */
class Token {
    tokenImpl : IToken = new DefaultToken("mysecret");

    /**
     *
     * @param tokenImpl token implement
     *
     */
    constructor(tokenImpl? : IToken) {
        if(tokenImpl)
        {
            this.tokenImpl = tokenImpl;
        }
    }

    /**
     *
     * @param payload
     */
    public generateToken  = (payload : {}|[]) : string =>{
        return this.tokenImpl.generateToken(payload);
    }

    /**
     *
     * @param token
     */
    public verifyToken = (token : string ) : any => {
        return this.tokenImpl.verifyToken(token);
    }
}






export default Token;
export {IToken, DefaultToken}
