
const {query} = require('../../../api/DBAPI');

exports.companyInfo = (req,res)=>{
    const code = req.query["code"];
    let sql = "select * from company_info limit 10 ";
    if(code)
        sql = "select * from company_info where 1=1 and code =?  limit 10 ";

    query(sql, [447690]).then((rows)=>{
        console.log(rows);
        res.send(rows);
    });
};