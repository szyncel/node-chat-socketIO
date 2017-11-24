var moment = require('moment');

var generateMessage=(from,text) => {
    var date = new Date();
    var formattedDate = moment(date).format('YYYY-MM-DD hh:mm:ss');
    return {
        from,
        text,
        createdAt:formattedDate
    };
};

var generateLocationMessage=(from,position) => {
    var date = new Date();
    var formattedDate = moment(date).format('YYYY-MM-DD hh:mm:ss');
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