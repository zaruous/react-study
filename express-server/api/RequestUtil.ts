"use strict";
import axios, {AxiosRequestConfig, AxiosProxyConfig, Axios} from "axios";
const configjson = require("../config");

/**
 * 외부 서버와 통신하기 위한 api, 모든 요청에서 프록시 설정을 통합하기 위해, 아래 함수를 사용
 */
export default class RequestUtil {

    config :AxiosRequestConfig = {} as AxiosRequestConfig;
    constructor(config? :AxiosRequestConfig) {
        if(config)
            this.config = config;
    }

    /**
     * Axios 인스턴스를 리턴 <br/>
     * 생성자로 받은 프록시 설정보단 해당 함수의 프록시 설정을 우선시.
     */
    public request = () => {
        if("Y" === configjson.proxy.useYn){
            this.config.proxy = {} as AxiosProxyConfig;
            this.config.proxy.host = configjson.proxy.host;
            this.config.proxy.port = configjson.proxy.port;
            if(configjson.proxy.auth)
                this.config.proxy.auth = configjson.proxy.auth;
            if(configjson.proxy.protocol)
                this.config.proxy.protocol = configjson.proxy.protocol;
        }
        return axios(this.config);
    };

}



