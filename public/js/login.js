var socket = io();
$('#new').hide();
socket.on('roomList', (roomList) => {
    console.log(roomList);
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
    console.log(room);
}



$('#test').on('click', (e) => {
    localStorage.clear();
    console.log('test');
    var name = $('.name').val();
    var room = sessionStorage.getItem('room');
    if (room == 1) {
        room = $('#new').val();
    }
    sessionStorage.clear();
    e.preventDefault();
    var params = {
        name: name,
        room: room
    }

    console.log(name);

    localStorage.setItem('name', params.name);
    localStorage.setItem('room', params.room);

    window.location.href = '/chat.html';

});