"use strict";
import { Response, Request, NextFunction } from "express";
import {Axios, AxiosResponse} from "axios";

const axios = require("axios");
exports.exchange = (req : Request, res : Response) => {
    axios.get("https://api.manana.kr/exchange/rate.json").then((response : AxiosResponse) => {
        res.send(response.data);
    });
};