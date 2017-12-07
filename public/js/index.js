
var socket = io();
socket.on('connect', () => {
    console.log('Connected to the servers');
});

socket.on('disconnect', () => {
    console.log('Disconected from the server');
});

socket.on('newMessage', (message) => {
    // newMsg(message.from, message.text, message.createdAt);
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: message.createdAt
    });
    $('.test').append(html);

    $(".test").stop().animate({
        scrollTop: $(".test")[0].scrollHeight
    }, 1000);
});

socket.on('newLocationMessage', (data) => {
    locationMsg(data.from, data.url, data.createdAt);
});

$('.btn.btn-success').on('click', () => {
    updateChat();
});



$(document).keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        updateChat();
    }
});

$('.btn.btn-danger').on('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {

            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

            // console.log(`Latitude: ${position.coords.latitude}, longitude ${position.coords.longitude}`);
        }, () => {
            alert('Unable to fetch location');
        });
    } else {
        /* geolocation IS NOT available */
        console.log('geolocation IS NOT available');
    }
});

function locationMsg(from, url, data) {
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: from,
        url: url,
        data: data
    });
    $('.test').append(html);

    $(".test").stop().animate({
        scrollTop: $(".test")[0].scrollHeight
    }, 1000);
};

function updateChat() {
    var message = {
        from: 'User',
        text: $('input[type=text]').val()
    }
    socket.emit('createMessage', message, function (data) {
        console.log(data);
    });
    $('input[type=text]').val("");
}