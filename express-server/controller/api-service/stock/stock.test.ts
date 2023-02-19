
import {close} from "../../../api/DBAPI";
import {getCompanyInfo, CompanyInfo} from "./stock";

test("data read test.",()=>{
    return getCompanyInfo("411080",  (c : CompanyInfo[]) =>{
         console.log(c);
    });


} );
afterAll(() => {
    close();
});