var birch = require('./BirchPure');

//BOT

birch.connectBirch({
  userID : 'birchBot',
  server : 'irc.freenode.org',
  channel : '#birch'});

//USERS
birch.connectUser({
    userID : 'ABCD',
    server : 'irc.freenode.org',
    channel : '#birch'});

birch.connectUser({
  userID : 'WXYZ',
  server : 'irc.freenode.org',
  channel : '#birch'});
  birch.connectUser({
      userID : 'ABCD',
      server : 'irc.freenode.org',
      channel : '#birch2'});

//MESSAGES
birch.say({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "DING DONG!"
});

birch.say({
  userID : 'WXYZ',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "DING TONG!"
});
