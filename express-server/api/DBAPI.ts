"use strict";
import {RowDataPacket, QueryError, FieldPacket, Connection, ConnectionOptions, OkPacket } from "mysql2";

const mysql = require("mysql2")
const config = require("../config.json")

/**
 * returns new connection.
 */
function newConnection() : Connection {
    const connConfig : ConnectionOptions = {
        host: config.db.mysql.host,
        user: config.db.mysql.user,
        password: config.db.mysql.password,
        database: config.db.mysql.database,
        connectTimeout : config.db.mysql.timeout
    };
    return mysql.createConnection(connConfig);
}

/**
 * execute query
 * @param sql
 * @param params
 */
function query(sql : string, params : any|any[]|{ [param: string]: any }){
    return new Promise((resolve, reject) => {
        const conn : Connection = newConnection();

        conn.query<OkPacket>(sql ,params , (err, rows ) => {
            if(err) {  console.log(err); reject(err); return; }
            resolve(rows);
        });
        conn.end();
    });
}

exports.query = query;

