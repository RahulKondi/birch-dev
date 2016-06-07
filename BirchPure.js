//libraries
var irc = require('slate-irc');
var net = require('net');

//Data
var connections = {};
/* connections data structure
connections = {
  userID = {
    server = {
      nickname : ,
      channels = [],
      client : client,
    }
  }
}
*/

//APIs
var connectBirch = function(arguments, callback) {
  connectUser(arguments, function (client) {
    client.on('message', handleMessage);
  });
  if (callback) callback();
}

var connectUser = function(arguments, callback) {
  var userID = arguments.userID,
      server = arguments.server,
      channel= arguments.channel;

  var stream = net.connect({
    port : 6667,
    host : server
  }, function (stream) {
    console.log("Connected to stream 1: " + stream);
  });

	console.log("2" + stream);
  if (!connections[userID]) {
    var client = irc(stream);
    connections[userID] = {};
    connections[userID][server]= {
      client: client,
      channels: []
      };

    client.user(userID, "WHOIS");
    client.nick(userID, function (){
      client.on('data', function (data) {
        if (data.command === 'ERR_NICKNAMEINUSE') {
          console.log("[ X ]\tNick in use. Trying : " + userID + "_");
          client.nick(userID+"_");
          client.join(channel);
          connections[userID][server].nickname = userID+"_";
        }
        else connections[userID][server].nickname = userID;
      });
    });
  }
  else {
    var client = connections[userID][server].client;
  }

  client.join(channel, null, function(){
    client.on('data', function (data) {
      if (data.command == 'RPL_ENDOFNAMES') {
        //console.log(data);
        connections[userID][server].channels.push(channel);
        console.log("Joined channel : " + channel);
      }
    });
  });

  if (callback) callback(client);
}//connectUser()

var say = function (arguments, callback) {
  var userID = arguments.userID,
      server = arguments.server,
      channel = arguments.channel,
      message = arguments.message;

  var client = connections[userID][server].client;
  client.send(channel, message, function () {
  });
} // say()

var part = function (arguments, callback) {
  var client = connections[arguments.userID][arguments.server].client;
  client.part(arguments.channel, arguments.message);
  if (callback) callback();
} // part()

/* var userAway = function (arguments, callback) {
  var client = connections[arguments.userID][arguments.server].client;
  client.away(arguments.message);
  console.log(connections[arguments.userID][arguments.server]);
}
*/
// NAMES
var namesList = function (arguments, callback) {
  var client = connections[arguments.userID][arguments.server].client;
  var namesInChannel = client.names(arguments.channel);
  console.log(namesInChannel);
}

//HANDLERS
var handleMessage = function (message) {
  if (connections[message.hostmask.nick]) {
    console.log("delivered");
  }
  else {
    console.log("\n@" + message.hostmask.nick + " : " + message.message);
    client.names(channel, function (error, names){
      console.log(error);
    });
  }
}

//EXPOSING FUCNTIONS
module.exports = {
  connectBirch,
  connectUser,
  say,
  part,
  namesList
}
