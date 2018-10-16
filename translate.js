const botconfig = require("./botconfig.json");
const tokenfile = require("./translatetoken.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
var translate = require('node-google-translate-skidz');

bot.on("ready", () => {
    console.log('bot is online!');
    bot.user.setActivity("with thousands of minecraft accounts.", {type: "PLAYING"});
});

bot.on("message", message => {
  if (message.author.bot) return;

  var prefix = botconfig.prefix;
  var messageArray = message.content.split(" ");
  var cmd = messageArray[0];
  var args = messageArray.slice(1);
  var translateee = args.join(" ");

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
