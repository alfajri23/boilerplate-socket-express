/**
 * EXPRESS FOR ROUTING
 */
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

/**
 * SOCKET.IO
 */
const socketIo = require('socket.io');
const io = socketIo(server);
const port = 2100

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    req.io = io
    // res.set('Cache-Control', 'no-store')
    next()
})


const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false,limit: '50mb',parameterLimit: 100000 }))
// parse application/json
app.use(bodyParser.json())

// console.log(process.argv)

io.on('connection', (socket) => {
    console.log('connected')
})
server.listen(port, console.log(`Server run and listening port: ${port}`));

