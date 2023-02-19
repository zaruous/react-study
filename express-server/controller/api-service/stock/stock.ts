"use strict";
import { Response, Request } from "express";
const {query} = require('../../../api/DBAPI');

type CompanyInfoCallback = (data: CompanyInfo[]) => void;

type CompanyInfo = {
    code: string;
    company: string;
    last_update:  Date;
    businessType: string;
    mainItem: string;
    listingDate: Date;
};

exports.companyInfo = (req: Request, res: Response) => {
    const code = req.query["code"];
    let sql = "SELECT * FROM company_info LIMIT 10";
    if (code) {
        sql = "SELECT * FROM company_info WHERE code = ? LIMIT 10";
        query(sql, [code]).then((rows: any) => {
            const companyInfo: CompanyInfo[] = rows.map((row: any) => ({
                code: row.code,
                company: row.company,
                last_update: new Date(row.last_update),
                businessType: row.business_type,
                mainItem: row.main_item,
                listingDate: new Date(row.listing_date),
            }));
            res.send(companyInfo);
        });
    } else {
        getCompanyInfo([], (companyInfo) => {
            res.send(companyInfo);
        });
    }
};

const getCompanyInfo = async (companyCodes : string | string[], callback : CompanyInfoCallback )=>{
    let _companyCodes: string[] = [];
    if (typeof companyCodes === "string") {
        _companyCodes.push(companyCodes);
    } else if (Array.isArray(companyCodes)) {
        _companyCodes = companyCodes;
    }

    let sql = "SELECT * FROM company_info LIMIT 10";
    if (_companyCodes.length > 0) {
        const placeholders = _companyCodes.map(() => "?").join(",");
        sql = `SELECT * FROM company_info WHERE code IN (${placeholders}) LIMIT 10`;
    }
    await query(sql, _companyCodes ).then((rows : any)=>{
        const companyInfo: CompanyInfo[] = rows.map((row: any) => ({
            code: row.code,
            company: row.company,
            last_update: new Date(row.last_update),
            businessType: row.businessType,
            mainItem: row.mainItem,
            listingDate: new Date(row.listingDate),
        }));
        callback(companyInfo);
    });
};

export {getCompanyInfo, CompanyInfo, CompanyInfoCallback}