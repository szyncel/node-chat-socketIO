var socket = io();
socket.on('connect', () => {
    console.log('Connected to the servers');

    
});

socket.on('disconnect', () => {
    console.log('Disconected from the server');
});

socket.on('newMessage', (from) => {
    console.log('new message:', from);

});
var form=document.querySelectorAll('input[type=text]');
var btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    var message={
        from:form[0].value,
        text:form[1].value
    }
    socket.emit('createMessage',message);
}, false);