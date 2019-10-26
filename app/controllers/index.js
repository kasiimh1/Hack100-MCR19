// Home Page
exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
};

// Send Message PAGE
exports.message = function(req, res, next) {
  // Database Connection
  var mysql = require('mysql');
  var users = new Array();
  //var users;
  var connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'Om6tq8deNg',
    password: 'oaOJKcV2V7',
    database: 'Om6tq8deNg'
  })

  connection.connect();

  connection.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) throw err

    
    for (let i = 0; i < rows.length; i++)
    {
      users.push(rows[i]);
    }
    //console.log('The solution is: ', rows[0])
    console.log(users);

    res.render('sendMessage',
    {title: 'Send Message',
    usersArr: users});

    
  });

  connection.end();
  
}

// Send Message - PERFORMS MESSAGE SEND
exports.sendMessage = function(req, res, next) {



  var clockwork = require('clockwork')({key:''});
  // Send a message
  clockwork.sendSms({ To: '', Content: 'Test!'}, function(error, resp) {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log('Message sent to',resp.responses[0].to);
    console.log('MessageID was',resp.responses[0].id);
}
});
};