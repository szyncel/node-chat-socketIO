const path = require('path');
var express = require('express')
var app = express()

const publicPath = path.join(__dirname, '../public');
const port=process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);


// app.get('/', function (req, res) {
//     res.send('hello world')
// });

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});