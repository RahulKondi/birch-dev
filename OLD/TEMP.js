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
var connectUser = function (arguments, callback) {
  var client,
  userID = arguments.userID,
  server = arguments.server,
  channel = arguments.channel;

  // if a connection does not exists
  if (connections[userID]) {
    var stream = net.connect({
      port: 6667,
      host: 'irc.freenode.org'
    });
    client = irc(stream, streamCallback);
  }
  // if a connection exists
  else {
    var client = connections[userID][server].client;
    streamCallback(client);
  }
  // if a channel is specified
  if (channel) {
    var client = connections[userID][server].client;
    client.join (channel, null, function(err){
      if (!err) {
        connections[nickname][server].channels.push(channel);
        //connections[nickname][server].nick = nickname;
        console.log("Joined channel : " + channel);
      }
      if (callback) callback(err);
    });
  } // if(channel)
} //closing connectUser()


// EXPERIMENTAL
var streamCallback = function (client) {
  console.log("[ * ]\tConnected to stream : " + client);
  //pushing connection
  connections[nickname] = {};
  connections[nickname][server]= {
    nick: nickname,
    client: client,
    channels: []
  };
  //registering user + nick
  client.user(userID, "WHOIS");
  client.nick(userID, function (data) {
    if (data.command === 'ERR_NICKNAMEINUSE') {
      client.nick(userID + '_');
      connections[userID][server].nick = userID + '_';
      console.log("[ * ]\tNick in use.\n\t" + userID + "registered as " + connections[nickname][server].nick + " instead");
    }
    else {
      connectins[userID][server].nick = userID;
      console.log("[ * ]\t" + userID + " registered as : " + connections[nickname][server].nick);
    }
  });
}
