"use strict";
import { Response, Request, NextFunction } from "express";
import {AxiosResponse} from "axios";
const axios = require("axios");
exports.naverNews =  (req : Request, res : Response) => {
    axios.get("https://api.signal.bz/news/realtime").then((response : AxiosResponse) => {
        res.send(response.data);
    });
};