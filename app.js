var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.dataArray = [];
// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// planner page 
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2&date=1941
app.get('/planner', function(req, res) {
    let id = req.param('id');
    let date = req.param('date');
    let time = req.param('time');
    if(id != null){
        let aEvent = {
            id: id,
            date: date,
            time: time
        }
    app.dataArray.push(aEvent);
    }
    res.render('pages/planner', { 
        dataArray: app.dataArray
     });
  });

// doing this in www bin file to make Azure happy
//app.listen(443);  // not setting port number in www.bin, simple to do here
//console.log('443 is the magic port');

module.exports = app;
