//libraries
var irc = require('slate-irc');
var net = require('net');

//Data
var connections = {};

//APIs
var connectBirch = function(arguments) {
  connectUser(arguments, function (client) {
    client.on('message', handleMessage);
  });
}

var connectUser = function(arguments) {
  var client,
      userID = arguments.userID,
      server = arguments.server,
      channel= arguments.channel;

  var stream = net.connect({
    port : 6667,
    host : server
  }, function (stream) {
    console.log("Connected to stream : " + server);
  });
  client = irc(stream);
  connections[userID] = {};
  connections[userID][server]= {
    nickname: userID,
    client: client,
    channels: []
  };

  client.user(userID, "WHOIS");
  client.nick(userID);
  client.join(channel, null, function(){
    connections[userID][server].channels.push(channel);
    console.log("Joined channel : " + channel);
  });

  client.on('data', function (data) {
    if (data.command == 'RPL_ENDOFNAMES') {
    console.log(data);
  }
  if (data.command === 'ERR_NICKNAMEINUSE') {
    console.log("[ X ]\tNick in use. Trying : " + userID + "_");
    client.nick(userID+"_");
    client.join(channel);
    connections[userID][server].nickname = userID+"_";
  }
});
}//connectUser()


var handleMessage = function (message) {
  console.log(message.hostmask.nick + " : " + message.message);
}
//EXPOSING FUCNTIONS
module.exports = {
  connectBirch,
  connectUser
}
