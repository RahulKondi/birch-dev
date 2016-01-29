//this program assumes that there wull only be one connection and hence 'client' is a global variable
//it also expects the export methods to be called in a particular order

// Bouncer module
var irc = require('slate-irc');
var net = require('net');
var client; //a global variable

// connect receivesa a variable that specifies the stream to connect to, in this case 'irc.freenode.org'
var connect = function (ircStream) {
    client = net.connect({
    port: 6667,
    host: ircStream
  });
console.log("Connected to " + ircStream);
}

//join accepts args: channel, nick and username -- in this order. Will add arg for 'realname' later, for now it's hardcoded
var join = function (channel, nickname, username) {
  client.nick(nickname);
  client.user(username, 'I iz InternKumar from Scrollback');
  client.join(channel);
  console.log("Joined " + channel + " as " + nickname);
}

//acceppts target as either channel or user with a message
var say = function (target, message) {
  client.send(target, message);
  console.log("Done talkin'");
}

//to leave a specified channel with a message
var leave = function (channel, message) {
  client.part(channel, message);
  console.log('Left channel ' + channel);
}

//disconnect expects the irc stream -- 'irc.freenode.org' for example
var disconnect = function (ircStream, message) {
    client.quit(message);
    console.log("Left network " + ircStream);
}

module.exports = {
    connect()
    join()
    disconnect()
    leave()
    say();
}
