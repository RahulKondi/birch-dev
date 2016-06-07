var BeBot = require('./my-irc-bouncer-one');



BeBot.connect('irc.freenode.org', 'zeBot', 'kondirahul');
BeBot.join('#birch');
BeBot.say('#birch', "Let's Bounce!"); //message into the channel
//BeBot.leave ('#birch');
//BeBot.disconnect("irc.freenode.org", "Bye bye!");
/*
+ create client- server name username list of roooms on server
+
