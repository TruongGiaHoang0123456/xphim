import mysql from 'mysql2'
import 'dotenv/config'

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_DB,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    namedPlaceholders: true,
});

export default pool