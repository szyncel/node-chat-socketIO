var moment = require('moment');

var generateMessage=(from,text) => {
    moment.locale('pl'); 
    var formattedDate = moment().format('LTS'); 
    return {
        from,
        text,
        createdAt:formattedDate
    };
};

var generateLocationMessage=(from,position) => {
    moment.locale('pl'); 
    var formattedDate = moment().format('LTS'); 
    var url=`http://www.google.pl/maps?q=${position.latitude},${position.longitude}`;

    return {
        from,
        url,
        createdAt:formattedDate
    };
}


module.exports={
    generateMessage,
    generateLocationMessage
}