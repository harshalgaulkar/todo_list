const express = require('express')
const cors = require('cors')
const { testConnection } = require('./utils/db')

const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}))
app.use(express.json())

const todoRoutes = require('./routes/todo')

app.use('/api/todos', todoRoutes)

const port = process.env.PORT || 4000

async function start() {
    try {
        await testConnection()
        console.log('Connected to MySQL')
    } catch (err) {
        console.error('Could not connect to MySQL:', err.message)
        console.error('1. Start MySQL on your machine')
        console.error('2. Run: mysql -u root -p < schema.sql')
        console.error('3. Update credentials in utils/db.js if needed')
        process.exit(1)
    }

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server started at port ${port}`)
    })
}

start()
