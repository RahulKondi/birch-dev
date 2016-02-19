var irc = require('slate-irc');
var net = require('net');

//Data
//var client;
var connections = {};

//birch_bot
var connect_bot = function(nickname, server) {
  var bot = connect(nickname, server, function(botObj) {
    botObj.on('message', handleMessage(nickname, server));
    });
}

//APIs
var connect = function (nickname, server, callback) {
  var stream = net.connect({
    port: 6667,
    host: server
  });
  var client = irc(stream);
  console.log("Connected to stream : " + stream);
  connections[nickname] = {};
  connections[nickname][server]= {
    nick: nickname,
    client: client,
    channels: []
  };
  client.user(nickname, 'whois-info');
  client.nick(nickname, function (){
    connections[nickname][server].nick = nickname;
    console.log("Registered nickname :" + nickname);
  });

  client.on('nick', function (nick) {
    console.log("Server assigned a new nickname for " + nickname + " : " + nick);
    connections[nickname][server].nick = nick;
  });
  if (callback) callback(client);
}//connect

var join = function (nickname, server, channel, callback) {
  if (connections[nickname][server].channels.indexOf(channel) === -1) {
    var client = connections[nickname][server].client;
    //client.join(channel);
    client.join(channel, null, function(err){
      if (!err) {
        connections[nickname][server].channels.push(channel);
        //connections[nickname][server].nick = nickname;
        console.log("Joined channel : " + channel);
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

var say = function (nickname, server, channel, target, message) {
  var client = connections[nickname][server].client;
  client.send(target, message, function () {
    //client.on('message', handleMessage(nickname, server));
    console.log(nickname + " Done talkin'\n");
  });
}

var part = function (nickname, server, channel, message) {
  client.part(channel, message, function () {
    console.log(nickname + ' left channel ' + channel + '\nsaying : ' + message);
    var channelIndex = connections[nickname][server].channels.indexOf(channel);
    console.log(connections[nickname][server].channels.splice(channelIndex));
    console.log(connections[nickname][server].channels);
  });
}

var disconnect = function (nickname, server) {
  client.quit(message)
  console.log("Left network " + server);
}

var handleMessage= function (nickname, server) {
  //console.log(arguments);
  return function (message) {
    if (connections[nickname][server].nick === message.hostmask.nick) {
      console.log("message delivered");
    }
    else {
      console.log(message.hostmask.nick + " : " + message.message);
    }
  }
}

  //if (connections.hasOwnProperty(message.hostmask.nick))



module.exports = {
  connect_bot,
  connect,
  join,
  say,
  part,
  disconnect
}
