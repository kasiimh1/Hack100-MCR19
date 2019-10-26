require('dotenv').config()

API = process.env.API
SMS = process.env.SMS_Number

DBHOST = process.env.dbhost
DBUSER = process.env.dbuser
DBPASSWORD = process.env.dbpassword
DB = process.env.db

// setup Database Connection 
var mysql = require('mysql')
var users = new Array()
var connection = mysql.createConnection({
    DBHOST,
    DBUSER,
    DBPASSWORD,
    DB
})

console.log('[ENV Log] ' + API + ' [ENV Log] ' + SMS)

// Send Message PAGE
exports.message = function (req, res, next) {
    connection.connect()
    connection.query('SELECT * FROM users', function (err, rows, fields) {
        for (let i = 0; i < users.length; i++) {
            users.push(users[i])
            console.log('[DEBUG] ' + users[i])
        }
        res.render('sendMessage', {
            title: 'Send Message',
            usersArr: users
        });
    });
    connection.end();
};

exports.sendMessage = function (req, res, next) {

    var clockwork = require('clockwork')({
        key: API
    });
    // Send a message
    clockwork.sendSms({
        To: '',
        Content: 'Test!'
    }, function (error, resp) {
        if (error) {
            console.log('Something went wrong', error);
        } else {
            console.log('Message sent to', resp.responses[0].to);
            console.log('MessageID was', resp.responses[0].id);
        }
    })
};