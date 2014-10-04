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
      message = msg;
      findUser(msg.username, function (err, results) {
        if (!results || !results.length) {
          saveUser(message.username, resultsCallback);
        } else {
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  findMessages(function(err, messages) {
      db.userName(messages, function(rows){
        for (var i = 0; i < messages.length; i++) {
          var id = messages[i].userid;
          for ( var j = 0; j < rows.length; j++) {
            if (rows[j].userid === id) {
              messages[i].username = rows[j].username;
              break;
            }
          }
        }
        var objToSend = {results: messages};
        serverHelpers.sendResponse(res, objToSend);
      })
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
