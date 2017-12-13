var socket = io();
$('#new').hide();
socket.on('roomList', (roomList) => {
    for (var i = 0; i < roomList.length; i++) {
        $('.selectRoom').append(`<option value="${roomList[i]}">${roomList[i]}</option>`);
    }
});

var e = document.querySelector('.selectRoom');
e.onchange = function () {
    var room = e.options[e.selectedIndex].value;
    if (room == 1) {
        $('#new').fadeIn('slow');
    } else {
        $('#new').hide();
    }
    sessionStorage.setItem('room', room);
}

$('#test').on('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    var name = $('.name').val();

 


    var room = sessionStorage.getItem('room');
    if (room == 1) {
        room = $('#new').val();
    }
    sessionStorage.clear();
   
    var params = {
        name: name,
        room: room
    };

    
    localStorage.setItem('name', params.name);
    localStorage.setItem('room', params.room);



    window.location.href = '/chat.html';
});