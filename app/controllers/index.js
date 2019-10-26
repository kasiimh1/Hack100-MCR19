require('dotenv').config()

API = process.env.API
SMS = process.env.SMS_Number

dbhost = process.env.dbhost
dbuser = process.env.dbuser
dbpassword = process.env.dbpassword
db = process.env.db

// setup Database Connection 
var mysql = require('mysql');
var users = new Array();
var connection = mysql.createConnection({
  dbhost,
  dbuser,
  dbpassword,
  db
})

console.log('[ENV Log] ' + API + ' [ENV Log] ' + SMS)

// Home Page
exports.index = function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
};

// Send Message PAGE
exports.message = function (req, res, next) {

  connection.connect();
  connection.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) throw err

    for (let i = 0; i < rows.length; i++) {
      users.push(rows[i]);
    }

    console.log(users);

    res.render('sendMessage', {
      title: 'Send Message',
      usersArr: users
    });
  });

  connection.end();

}

// Send Message - PERFORMS MESSAGE SEND
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
  });
};