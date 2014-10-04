var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/
var messageid = 0;
var userid = 0;


exports.findAllMessages = function(cb){
  // console.log("got to findallmessages")
  var queryString = 'select * from messages;';
  dbConnection.query(queryString, cb);
};

exports.findUser = function(username, cb){
  var queryString = 'select userid from users where username = ' + username + ';';
  dbConnection.query(queryString, cb);
};

exports.userName = function(messageArray, cb) {
  var allUsers = {};
  for (var i = 0; i < messageArray.length; i ++) {
    var queryString = 'select * from users;';
    dbConnection.query(queryString, function(err, rows) {
      if (err) {
        throw err;
      } else {
        cb(rows);
      }
    })
  }
};

exports.saveUser = function(username, cb){
  var queryString = 'insert into users (userid, username) values ('+userid+", '"+username+"');";
  // console.log(queryString);
  dbConnection.query(queryString, function(err, rows){
    if (err) {
      throw err;
    }
    else {
      userid += 1;
      cb((userid-1), username);
    }
  });
};

exports.saveMessage = function(message, userid, cb){
  // console.log(message);
  // console.log('47?');
  var queryString = 'insert into messages (messageid, text, userid) values (' + messageid + ',"' + message + '",' + userid + ');';
  dbConnection.query(queryString, function(err, rows){
    if (err) {
      throw err;
    }
    else {
      messageid += 1;
      cb();
    }
  })
};
