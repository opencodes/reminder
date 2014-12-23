"use strict"
var reminders = require('./reminders');
var fs = require('fs');

var router = function(app){
    /* GET home page. */
    app.get('/', function(req, res) {
        fs.readFile( __dirname +'/../data.json', function(err, data){
            if (err) throw err;
            var reminders = JSON.parse(data);
            res.render('index', { title: 'Reminder APP',"reminders":reminders });
        });
    });

    app.get('/reminders/new', reminders.renderform);
    app.post('/reminders/addnew', reminders.addnew, reminders.updateJson);

}
module.exports = router;
