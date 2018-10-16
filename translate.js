const botconfig = require("./botconfig.json");
const tokenfile = require("./translatetoken.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
var translate = require('node-google-translate-skidz');

bot.on("ready", () => {
    console.log('bot is online!');
    bot.user.setActivity("-help", {type: "PLAYING"});
});

bot.on("message", message => {
  if (message.author.bot) return;

  var prefix = botconfig.prefix;
  var messageArray = message.content.split(" ");
  var cmd = messageArray[0];
  var args = messageArray.slice(1);
  var translateee = args.join(" ");

  if (cmd === `${prefix}help`)
  return message.channel.send({embed: {
        color: 0xffffff,
        title: "Help:",
        description: "This is a bot made by Cody#5507 that is used to translate any language to any language, do -codes for the language list and -usage to learn how to use the bot.",
        timestamp: new Date(),
        footer: {
          text: message.author.tag
        }
      }
    });

    if (cmd === `${prefix}usage`)
    return message.channel.send({embed: {
          color: 0xffffff,
          title: "Usage:",
          description: "To use this bot, you need to know language codes, if you do not know them do -codes. Then you can use the bot, to translate use code1-code2, an example is (en-es Hello my name is cody) to translate from english to spanish.",
          timestamp: new Date(),
          footer: {
            text: message.author.tag
          
          }
        }
      });

      if (cmd === `${prefix}codes`)
      return message.channel.send({embed: {
            color: 0xffffff,
            title: "Codes:",
            description: "Amharic	am,            Arabic	ar,            Basque	eu,            Bengali	bn,            English (UK)	en-GB,            Portuguese (Brazil)	pt-BR,            Bulgarian	bg,            Catalan	ca,            Cherokee	chr,            Croatian	hr            Czech	cs,            Danish	da,            Dutch	nl,            English (US)	en,            Estonian	et,            Filipino	fil,            Finnish	fi,            French	fr,            German	de,,            Greek	el,            Gujarati	gu,            Hebrew	iw,            Hindi	hi,            Hungarian	hu,            Icelandic	is,            Indonesian	id,            Italian	it,            Japanese	ja,            Kannada	kn,            Korean	ko,            Latvian	lv,            Lithuanian	lt,            Malay	ms,            Malayalam	ml,            Marathi	mr,            Norwegian	no,            Polish	pl,            Portuguese (Portugal)	pt-PT,            Romanian	ro,            Russian	ru,            Serbian	sr,            Chinese (PRC)	zh-CN,            Slovak	sk,            Slovenian	sl,            Spanish	es,            Swahili	sw,            Swedish	sv,            Tamil	ta,            Telugu	te,            Thai	th,            Chinese (Taiwan)	zh-TW,            Turkish	tr,            Urdu	ur,            Ukrainian	uk,            Vietnamese	vi,            Welsh	cy,",
            timestamp: new Date(),
            footer: {
              text: message.author.tag
            }
          }
        });
  

  try {
  {
   var sourcee;
   var targett;
   var cmdSpl = cmd.split(" ")[0].split("-");
   sourcee = cmdSpl[0];
   targett = cmdSpl[1];
     return translate({
       text: translateee,
       source: sourcee,
       target: targett
     }, function(result) {
       console.log(message.author.tag + ' in ' + message.guild.name + ', requested ' + result.translation);
       message.channel.send(result.translation);
     });
   }
 }
 catch(err) {
     return;
 }


});

bot.login(tokenfile
    .token);
