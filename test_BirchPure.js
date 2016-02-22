var birch = require('./BirchPure');

/*birch.connectBirch({
  userID: 'birchBot',
  server: 'irc.freenode.net',
  channel: '#birch2'}, function () {
  console.log("\n[ * ]Birch connected\n");
});

birch.connectUser({
  userID: 'ChachaChaudhary',
  server: 'irc.freenode.org',
  channel: '#birch'}, function () {
  console.log("\n[ * ] User connected\n");
});

*/
birch.connectUser('ChachaChaudhary', 'irc.freenode.org', '#birch');
