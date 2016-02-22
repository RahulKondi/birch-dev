//libraries
var irc = require('slate-irc');
var net = require('net');

//Data
var connections = {};

//APIs
var connectUser = function(arguments) {
  var client
      userID = arguments.userID,
      server = arguments.server,
      channel= arguments.channel;

  var stream = net.connect({
    port : 6667,
    host : server
  });
  client = irc(stream);
  client.user(userID, "WHOIS");
  client.nick(userID);
  client.join(channel);
}

//EXPOSING FUCNTIONS
module.exports = {
  //connectBirch,
  connectUser
}
