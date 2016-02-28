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
var connectBirch = function(arguments) {
  connectUser(arguments, function (client) {
    client.on('message', handleMessage);
  });
}

var connectUser = function(arguments, callback) {
  var userID = arguments.userID,
      server = arguments.server,
      channel= arguments.channel;

  var stream = net.connect({
    port : 6667,
    host : server
  }, function (stream) {
    console.log("Connected to stream : " + server);
  });


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
  client.on('message', function (message) {
    //empty
  });
  if (callback) callback(client, new Error("\n[ X ]\tSOME ERROR OCURRED"));
}//connectUser()

//HANDLERS
var handleMessage = function (message) {
  console.log(message.hostmask.nick + " : " + message.message);
}

//EXPOSING FUCNTIONS
module.exports = {
  connectBirch,
  connectUser
}
