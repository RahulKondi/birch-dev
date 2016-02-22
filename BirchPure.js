//libraries
var irc = require('slate-irc');
var net = require('net');

//Data
var connections = {};

//APIs
var connectUser = function(userID, server, channel) {
  var client;
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
