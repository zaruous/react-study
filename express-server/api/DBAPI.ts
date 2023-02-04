"use strict";
import {Pool, PoolConnection, QueryError, OkPacket } from "mysql2";

const mysql = require("mysql2")
const config = require("../config.json")

/**
 * create new connection pool.
 */
const pool: Pool = mysql.createPool({
    host: config.db.mysql.host,
    user: config.db.mysql.user,
    password: config.db.mysql.password,
    database: config.db.mysql.database,
    connectTimeout : config.db.mysql.timeout,
    connectionLimit: 10
});
console.log("create pool.");

const close  = () => {
    getPool().end();
}

/**
 * returns pool
 */
const getConnection = (): Promise<PoolConnection> => {
    return new Promise((resolve, reject) => {
        getPool().getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(connection);
        });
    });
};

const getPool  =  (): Pool => {
    return pool;
}

/**
 * execute query
 * @param sql
 * @param params
 */


const query = (sql : string, params : any|any[]|{ [param: string]: any }): Promise<OkPacket> =>{
    return new Promise((resolve, reject) => {
        getPool().query<OkPacket>(sql ,params , (err: QueryError|null, rows : OkPacket ) => {
            if(err) {  console.log(err); reject(err); return; }
            resolve(rows);
        });
    });
};

/**
 *
 * @param sql
 * @param params
 */
function update(sql : string, params : any|any[]|{ [param: string]: any }){
    return new Promise((resolve, reject) => {

        getPool().query<OkPacket>(sql ,params ,(err, results) => {
            if(err) {  console.log(err); reject(err); return; }
            resolve(results);
            console.log(`result ${results.affectedRows} row(s)`);
        });

    });
}

const newTransaction = async (cb: (connection: PoolConnection) => Promise<void>) => {

    try {
        await getConnection().then( (pool : PoolConnection)=>{
            pool.beginTransaction(err =>{ throw err; });
            cb(pool);
            pool.commit();
            pool.release();
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { query, update, newTransaction , getPool, close};

