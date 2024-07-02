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
// const {Server} = require('socket.io');
// const io = new Server(server)
// const port = 5000

const socketIo = require('socket.io');
const io = socketIo(server);
const port = 5000

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    req.io = io
    // res.set('Cache-Control', 'no-store')
    next()
})

// Express
const path = require('path')// default package to make path of directory 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/get', function (req, res, next) {
    res.render('index');
})

app.get('/about', function (req, res, next) {
    res.render('about');
})


let count = 0 ; // count global variable 
io.on('connection',(socket)=>{
    console.log('connected')

    //socket.emit('updatecount',count) // this is used to send a event and count here is parameter we can send as many parameter we want 
    // Listening the event and performing logic here 
    socket.on('increment',()=>{
        count++;
        io.emit('updatecount',count)
    })
    // when a client disconnect this function is called 
    socket.on('disconnect',()=>{
        console.log('server disconnected')
    })
})

// app.listen(5000,()=>{
//     console.log('server started')
// })

server.listen(port, () => {
    console.log(`Server websocket is running on http://localhost:${port}`);
});