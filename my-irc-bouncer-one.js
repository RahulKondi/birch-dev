//this program assumes that there wull only be one connection and hence 'client' is a global variable
//it also expects the export methods to be called in a particular order

// Bouncer module
var irc = require('slate-irc');
var net = require('net');
var client; //a global variable
var explicit_list = ['yolo', 'mofo', 'dodo'];

// connect receives a variable that specifies the stream to connect to, in this case 'irc.freenode.org'
var connect = function (ircStream, nickname, username) {
  var stream = net.connect({
    port: 6667,
    host: ircStream
  });

  client = irc(stream);
  client.nick(nickname);
  client.user(username, 'I iz InternKumar from Scrollback');
  client.on("message", handleMessage);
  client.on("data", handleData);
}
//join accepts args: channel, nick and username -- in this order. Will add arg for 'realname' later, for now it's hardcoded
var join = function (channel) {
    if (client.join(channel)) {
      console.log("Joined " + channel + " as " + nickname);
    }
}

//acceppts target as either channel or user with a message
var say = function (target, message) {
  if (client.send(target, message))
    console.log("Done talkin'");
}

//to leave a specified channel with a message
var leave = function (channel, message) {
  if (client.part(channel, message))
    console.log('Left channel ' + channel);
}

//disconnect expects the irc stream -- 'irc.freenode.org' for example
var disconnect = function (ircStream, message) {
    if (client.quit(message))
      console.log("Left network " + ircStream);
}

//listening for events
function handleMessage (message) {
  console.log(message);
}

function handleData (msg) {
    console.log(msg);

    if (msg.command == 'PRIVMSG') {
      var split_message = msg.trailing.split(' ');
      for (i in split_message) {
          if (split_message.indexOf(explicit_list[i]) ) {
              console.log("Somebody swore!");
              say("#birch", "No swearing mothefucka!");
          }
      }
    }
}

module.exports = {
    connect,
    join,
    disconnect,
    leave,
    say
}
