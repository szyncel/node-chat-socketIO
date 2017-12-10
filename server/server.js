const path = require('path');
var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
var {
    isRealString
} = require('./utils/validation');
var {
    Users
} = require('./utils/users');
var users = new Users();



const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

io.on('connection', function (socket) {

    socket.on('createMessage', (message, callback) => {
        var user=users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback('This is form the server');
    });

    socket.on('createLocationMessage', (position) => {
        var user=users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, position));
        }
        
    });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name  are required')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', `Witamy na chacie: ${params.name}`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} dołączył do czatu`));

        callback();
    });

    socket.on('disconnect', function () {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} wyszedł z chatu.`));
        }

        console.log('user disconnected');
    });
});



app.use(express.static(publicPath));

http.listen(port, () => {
    console.log(`Started on port ${port}`);
});