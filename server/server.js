const path = require('path');
var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

io.on('connection', function (socket) {
    console.log('a user connected');

    // io.emit('newMessage', {
    //     from: 'Mtteu',
    //     text: 'Cześć nieznajomy',
    //     createdAt: "123123"
    // });

    socket.on('createMessage', (message) => {
        console.log(`${message.from}: ${message.text}`);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});



app.use(express.static(publicPath));

http.listen(port, () => {
    console.log(`Started on port ${port}`);
});