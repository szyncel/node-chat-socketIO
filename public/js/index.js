// $("#chat").animate({
//     scrollTop: $(document).height()
// }, "slow");


var socket = io();
socket.on('connect', () => {
    console.log('Connected to the servers');
});

socket.on('disconnect', () => {
    console.log('Disconected from the server');
});

socket.on('newMessage', (data) => {
    newMsg(data.from, data.text, data.createdAt);
});

socket.on('newLocationMessage',(data) => {
    locationMsg(data.from,data.url,data.createdAt);
});

$('.btn.btn-success').on('click', () => {
    updateChat();
    
});



$(document).keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        updateChat();
    }
    // $("#chat").animate({
    //     scrollTop: $(document).height()
    // }, "slow");
});

$('.btn.btn-danger').on('click',() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {

            socket.emit('createLocationMessage', {
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            });

            // console.log(`Latitude: ${position.coords.latitude}, longitude ${position.coords.longitude}`);
          },() => {
             alert('Unable to fetch location'); 
          });
      } else {
        /* geolocation IS NOT available */console.log('geolocation IS NOT available');
      }
});

function newMsg(from, text, data) {
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
    // $('#chat').append(msg);
     //$('#chat').append($('<li>asdasdasdasdasdasds</li>'));

     //test test test test
   $('.test').append(`<div class="message"><div class="row-fix">
   <div class="col-2 messageForm">
   ${from}:
   </div>
   <div class="col-6 messageForm">
   ${text}
   </div>
   <div class="col messageForm">
   ${data}
   </div></div>
</div>`);
   $(".test").stop().animate({ scrollTop: $(".test")[0].scrollHeight}, 1000);
};

function locationMsg(from,url,data) {
    var msg = $(`<li class="list-group-item">
    <div class="row">
        <div class="col-2">
        ${from}:
        </div>
        <div class="col-6">
        <a href="${url}" target="_blank">Moja lokalizacja</a>   
        </div>
        <div class="col">
        ${data}
        </div>
    </div>
</li>`);
    $('#chat').append(msg);
    // $("#chat").animate({
    //     scrollTop: $(document).height()
    // }, "slow");
};

function updateChat(){
    var message = {
        from: 'User',
        text: $('input[type=text]').val()
    }
    socket.emit('createMessage', message, function (data) {
        console.log(data);
    });
    $('input[type=text]').val("");
    // var $chat = $("#chat");
    // $chat.scrollTop($chat.prop('scrollHeight'));
}