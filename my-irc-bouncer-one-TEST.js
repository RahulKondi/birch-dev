var BeBot = require('./my-irc-bouncer-one');

BeBot.connect("irc.freenode.org");
BeBot.join('#birch', 'kondi', 'kondirahul');
BeBot.say('#birch', "Let's Bounce!"); //message into the channel
BeBot.say('@rahulkondi', "Same Pinch"); //message with nickname as target
BeBot.leave ('#birch');
BeBot.disconnect("irc.freenode.org", "Bye bye!");
