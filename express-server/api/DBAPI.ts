"use strict";
import {Pool, PoolConnection, RowDataPacket, QueryError, FieldPacket, Connection, ConnectionOptions, OkPacket } from "mysql2";

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


/**
 * returns pool
 */
const getConnection = (): Promise<PoolConnection> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(connection);
        });
    });
};

const getPool  =  ():Pool=>{
    return pool;
}

/**
 * execute query
 * @param sql
 * @param params
 */
function query(sql : string, params : any|any[]|{ [param: string]: any }){
    return new Promise((resolve, reject) => {
        getPool().query<OkPacket>(sql ,params , (err, rows ) => {
            if(err) {  console.log(err); reject(err); return; }
            resolve(rows);
        });
    });
}

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

exports.query = query;
exports.newTransaction = newTransaction;
