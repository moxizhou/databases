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



exports.findAllMessages = function(cb){
};

exports.findUser = function(username, cb){
  var queryString = 'select userid from users where username = ' + username + ';';
  dbConnection.query(queryString, cb);
};

exports.saveUser = function(username, cb){
};

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query('insert into messages (messageid, text, userid) values ("0123", "text message", "111")', function(err, rows){
    console.log(rows);
  })
};
