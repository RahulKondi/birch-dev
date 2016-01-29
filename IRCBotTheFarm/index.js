var irc = require('slate-irc');
var net = require('net');

var stream = net.connect( {
    port: 6667,
    host: 'irc.freenode.org'
});

var client = irc(stream);

client.on('notice', function(notice) {
    console.log(notice.message);
});

client.nick('IRC-BotTheFarm');
client.user('IRC-BotTheFarm', 'Scrollback InternKumar');
client.join('#birch');


client.names('#birch', function(err, names) {
    if (err) throw err;
    names.sort();
    console.log(names.join('n'));

    client.send('#birch', 'yoyoyoyoyo');
});


function pong(){
    return function(irc){
        irc.on('data', function(msg){
            if ('PING' != msg.command) return;
            irc.write('PONG :' + msg.trailing);
        });
    }
}

client.use(function (irc) {
    irc.on('data', function (msg) {
        console.log(msg);

        if (msg.command === 'PRIVMSG') {
            var split = msg.trailing.split(' ');

            if (split[0] === '!kaun-hai') {
                client.whois(split[1], 0, function (resp) {
                    console.log(resp);
                });
            }
        } else if (msg.command.match(/^RPL_WHOIS/)) {
            client.send('#birch', 'WHOIS result: ' + msg.trailing);
        }
    });
});

//client.quit();
