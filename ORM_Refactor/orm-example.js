/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var mysql = require('mysql');
var sequelize = new Sequelize("chat", "root", ""); //{
  // dialect: "mysql",
  // port: 3000});

sequelize.authenticate();
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  username: Sequelize.STRING
});

var Message = sequelize.define('messages', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,

});


/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
Message.sync().complete(function(err) {
  if(!!err){
    console.log('error in message.sync');
  } else {
  console.log('message table created');
  }
  var newMessage = Message.build({text: "First message"});
  newMessage.save().complete(function(){
    console.log('new message');
  })
});


User.sync().complete(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({username: "Jean Valjean"});
  newUser.save().complete(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {username: "Jean Valjean"} }).complete(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

Message.belongsTo(User);

