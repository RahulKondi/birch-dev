//libraries
var irc = require('slate-irc');
var net = require('net');

//data
var connections = {};
/* connections data structure
connections = {
userID = {
server = {
nick : nick,
channels = [],
client : client,
}
}
}
*/

//APIs

// CONNECT
var connectUser = function(arguments, callback) {
  var client;
  var userID = arguments.userID;
  var server = arguments.server;
  var channel = arguments.channel;

  //new connection
  if (!connections[userID]) {
    var stream = net.connect({
      port: 6667,
      host: 'irc.freenode.org'
    });
    client = irc(stream, function () {
      console.log("[*] Connected to stream : " + client);
      connections[userID] = {};
      connections[userID][server]= {
        nick: "defaultNick",
        channels: [],
        client : client
      }; //closing connections object
      client.user(userID, "whois : " );
      client.nick(userID, function (){
        client.on('data', function (data) {
          if (data.command === 'ERR_NICKNAMEINUSE'){
            client.nick(userID + '_');
            connections[userID][server].nick = nickname + '_';
            console.log("[X]\t " + userID + "registered as " + connections[nickname][server].nick);
          } //closing if
          else {
            connections[userID][server].nick = userID;
            console.log("[*]\t" + userID + " registerd as " + userID);
          } //closing else
        }); //closing client.on(data, {});
      }); //closing client.nick({});

      if (arguments.channel) {
        client.joinChannel(userID, server, channel);
      } //closing if (arguments.channel)
    }); //closing irc(stream {});
  } //closing if (!connections[userID])
  else {
    if (connections[userID][server]) {
      client = connections[userID][server].client;
      client.joinChannel(userID, server, channel);
    }
  }
  client.on('message', handleMessage);
  if (callback) callback(client);
}

var joinChannel = function (userID, server, channel, callback) {
  if (connections[userID][server].channels.indexOf(channel) === -1) {
    var client = connections[nickname][server].client;
    client.join(channel, null, function(err){
      if (!err) {
        connections[nickname][server].channels.push(channel);
        console.log(userID + " joined channel : " + channel);
      }
      if (callback) callback(err);
    });
  }
  else {
    Process.nextTick(function(){
      if (callback)callback(new Error("ERROR: ALREADY JOINED"));
    });
  }
}

var connectBirch = function(userID, server, channel, callback) {
  var birchBot = connectUser({userID : userID, server : server, channel: channel}, function(birch) {
    birch.on('message', handleMessage(nickname, server));
  });
  if (callback) callback();
}
var handleMessage = function (message) {
  console.log(message);
}

//EXPOSING FUCNTIONS
module.exports = {
  connectBirch,
  connectUser
}
