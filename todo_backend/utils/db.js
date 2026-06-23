const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'manager',
    database: process.env.DB_NAME || 'todolist',
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
})

pool.on('error', (err) => {
    console.error('MySQL pool error:', err.message)
})

async function testConnection() {
    const connection = await pool.getConnection()
    connection.release()
}

module.exports = { pool, testConnection }
