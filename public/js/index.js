$('body').scrollspy({
    target: '#scroll'
})

var socket = io();
socket.on('connect', () => {
    console.log('Connected to the servers');
});

socket.on('disconnect', () => {
    console.log('Disconected from the server');
});

socket.on('welcomeMessage', (data) => {
    newMsg(data.from,data.text, data.createdAt);
    // console.log(data);
});

socket.on('welcomeUserMessage', (data) => {
    newMsg(data.from,data.text, data.createdAt);
    // console.log(data);
});

socket.on('newMessage', (data) => {
    newMsg(data.from,data.text, data.createdAt);
    // console.log(`${data.from}: ${data.text}.  ${data.createdAt}`);


});

function newMsg(from,text,data){
    var msg = $(`<li class="list-group-item">
    <div class="row">
        <div class="col-2">
        ${from}:
        </div>
        <div class="col-6">
        ${text}
        </div>
        <div class="col">
        ${data}
        </div>
    </div>
</li>`);
    $('#chat').append(msg);
}


$('.btn').on('click', () => {
    var message = {
        from: 'User',
        text: $('input[type=text]').val()
    }
    socket.emit('createMessage', message, function (data) {
        console.log(data);
    });
    $('input[type=text]').val("");
})