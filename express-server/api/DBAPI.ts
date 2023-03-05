"use strict";
import {Pool, PoolConnection, QueryError, OkPacket, Query } from "mysql2";
import {FieldPacket, ResultSetHeader, RowDataPacket} from "mysql2/typings/mysql/lib/protocol/packets";

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


const query = (sql : string, params : any|any[]|{ [param: string]: any }): Promise<OkPacket[]> =>{
    return new Promise((resolve, reject) => {
        getPool().query<OkPacket[]>(sql ,params , (err: QueryError|null, rows : OkPacket[] ) => {
            if(err) {  console.log(err); reject(err); return; }
            resolve(rows);
        });
    });
};

const update = (sql : string, params : any|any[]|{ [param: string]: any }): Promise<OkPacket> =>{
    return new Promise((resolve, reject) => {
        getPool().query<OkPacket>(sql ,params , (err: QueryError|null, rows : OkPacket ) => {
            if(err) {  console.log(err); reject(err); return; }
            resolve(rows);
        });
    });
};




/**
 *
 */
type DbApiPoolCallback = (pollConnection : PoolConnection) => void;

/**
 *
 * @param cb
 */
const newTransaction = (callback: DbApiPoolCallback) => {
    return getConnection().then((pool: PoolConnection) => {
        pool.beginTransaction(async (err) => {
            if (err) {
                throw err;
            } else {
                try {
                    await callback(pool);
                    pool.commit();
                    pool.release();
                } catch (error) {
                    pool.rollback((err) => {
                        console.error(err);
                    });
                    console.log("database  roolback.");
                    throw error;
                }
            }
        });
    });
};

export { query, update, newTransaction , getPool, close , DbApiPoolCallback};

