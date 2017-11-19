const path = require('path');
var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

app.use(express.static(publicPath));

http.listen(port, () => {
    console.log(`Started on port ${port}`);
});