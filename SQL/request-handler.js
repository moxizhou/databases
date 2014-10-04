var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;


exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;

  var resultsCallback = function (userid, username) {
      var chat = {
        message: message.text,
        userid: userid,
      };

      saveMessage(chat.message, chat.userid, function () {
        serverHelpers.sendResponse(res, message);
      });
  };

  parseData(req, function(_, msg) {
      // db.saveMessage()
      message = msg;
      // console.log('in parseData')
      // console.log(message)
      findUser(msg.username, function (err, results) {
        // no results/0 results
        if (!results || !results.length) {

          // create the user, then post the message
          saveUser(message.username, resultsCallback);
        } else {
          // user exists, post the message to this user
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  console.log("got to getmessages")
  findMessages(function(err, messages) {
      var objToSend = {results: messages};
    console.log(objToSend.results);
      serverHelpers.sendResponse(res, objToSend);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
