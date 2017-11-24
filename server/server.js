const path = require('path');
var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');

// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

io.on('connection', function (socket) {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Witamy na chacie'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Nowy użytkownik połączony'));

    socket.on('createMessage', (message, callback) => {
        // console.log(`${message.from}: ${message.text}`);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is form the server');
    });

    socket.on('createLocationMessage',(position) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',position));
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});



app.use(express.static(publicPath));

http.listen(port, () => {
    console.log(`Started on port ${port}`);
});