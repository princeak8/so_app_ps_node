require('dotenv').config();
const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 10,
    password: process.env.PASSWORD,
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT
});

module.exports = conn;