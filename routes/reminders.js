"use strict"
var schedule = require('node-schedule');
var fs = require('fs');

var reminders = {

    /**
     * Render add reminder form
     * @param req
     * @param res
     * @param next
     */
    renderform : function(req, res, next){
        res.render('adeditform', { title: 'Reminder APP' });
    },
    /**
     * Add new reminder
     * @param req
     * @param res
     * @param next
     */
    addnew : function(req, res, next){


        if(req.body && req.body.reminderdate && req.body.remindertime){

            var body = req.body;

            var reminderdate = body.reminderdate.split('/');
            var remindertime = body.remindertime.split(":");

            req.reminder = {
                "name" :body.remindername,
                "date" : body.reminderdate,
                "time" : body.remindertime
            }

            //var date = new Date(reminderdate[2], reminderdate[0], reminderdate[1], remindertime[0], remindertime[1], 00);
            var date = new Date(2014, 12, 23, 12, 37, 0);
            var j = schedule.scheduleJob(date, function(){
                console.log('The world is going to end today.');
                next();
            });
        }else{
            next();
        }

    },
    /**
     * Update json
     * @param req
     * @param res
     * @param next
     */
    updateJson : function(req, res, next){
        fs.readFile( __dirname +'/../data.json', function(err, data){
            if (err) throw err;

            var reminders = JSON.parse(data);
                reminders.results.push(req.reminder);

            fs.writeFile(__dirname +'/../data.json', JSON.stringify(reminders), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to data.json");
                }
                res.redirect('/');
            });
        });


    }

}
module.exports = reminders;
