const mysql = require("mysql")
const config = require("./config.json")

function newConnection(){
    return mysql.createConnection({
        host: config.db.mysql.host,
        user: config.db.mysql.user,
        password: config.db.mysql.password,
        database: config.db.mysql.database,
        timeout: config.db.mysql.timeout,
    });
}
function query(sql, params) {
    return new Promise((resolve, reject) => {
        const conn = newConnection();
        conn.query(sql ,params,(err, rows, fields) => {
            if(err) {  console.log(err); reject(err); return; };
            resolve(rows);
        });
        conn.end();
    });
}

exports.query = query;
/*
const sql = "select * from company_info where 1=1 and code =?  limit 10 ";
new DBAPI().query(sql, [447690]).then((rows)=>{
    console.log(rows);
});
*/


