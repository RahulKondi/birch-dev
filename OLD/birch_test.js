var birch = require('./birch2Pure');

birch.connectBirch({
  userID: 'birchBot',
  server: 'irc.freenode.net',
  channel: '#birch2'}, function () {
  console.log("\n[ * ]Birch connected\n");
});

birch.connectUser({
  userID: 'ChachaChaudhary',
  server: 'irc.freenode.org',
  channel: '#birch2'}, function () {
  console.log("\n[ * ] User connected\n");
});
