require('dotenv').config({path:'../.env'});

const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.on('error', (err) => {
    console.error('Pool error', err.message, err.code, err.stack)
})

pool.getConnection()
.then( connection => {
    console.log("Database pool connected.");
    connection.release();
})
.catch( err => {
    console.error('Error connecting to the database pool:', err.stack);
})

module.exports = pool;