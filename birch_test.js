var bot = require('./birch');

bot.connect_bot('birch_bot', 'irc.freenode.org');
bot.join ('birch_bot', 'irc.freenode.org', '#birch');
bot.say('birch_bot', 'irc.freenode.org', '#birch', '#birch', 'I am a Wobot');

bot.connect('kondi123', 'irc.freenode.org');
bot.join('kondi123', 'irc.freenode.org', '#birch');
bot.say('kondi123', 'irc.freenode.org', '#birch', '#birch', 'yolo');
/*
bot.connect('rahulkondi', 'irc.freenode.org');
bot.join('rahulkondi', 'irc.freenode.org', '#birch');
bot.say('rahulkondi', 'irc.freenode.org', '#birch', '#birch', 'FRAUD!!');
*/
bot.connect('harish123', 'irc.freenode.org');
bot.join('harish123', 'irc.freenode.org', '#birch');
bot.say('harish123', 'irc.freenode.org', '#birch', '#birch', 'I am a Complan boy');

//bot.part('harish123', 'irc.freenode.org', '#birch', 'byebye');
