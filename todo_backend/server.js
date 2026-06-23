const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}))

const todoRoutes = require('./routes/todo')

app.use('/api/todos', todoRoutes)
app.use(express.json())

const port = process.PORT || 4000
app.listen(port, '0.0.0.0', () => {
    console.log(`Server started at port ${port}`)
})