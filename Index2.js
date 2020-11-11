const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "!";
const translate = require('@k3rn31p4nic/google-translate-api');
const JishoApi = require('unofficial-jisho-api');
const jisho = new JishoApi();

bot.on("ready" , () => {
    console.log("ready");
    bot.user.setStatus("Online");
})

bot.on("message", msg => {
   if (msg.channel.id == 773620935512424468) {
     
     if(msg.author.bot) return;
     let args = msg.content.substring(prefix.length).split(" ");
     const tt = msg.content.substring(
     msg.content.lastIndexOf("!translate ") + 11, 
     msg.content.lastIndexOf(' to')
     );
     const kunyomi = msg.content.substring(
      msg.content.lastIndexOf("!kunyomi ") + 9 );
     const onyomii = msg.content.substring(
      msg.content.lastIndexOf("!onyomi ") + 8 );
     const lan = msg.content.substring(
     msg.content.lastIndexOf("to ") +3
     );
    
     switch (args[0]) {
         case "Ping":
             msg.channel.send("Pong");
             break;
         case "clear":
             msg.channel.bulkDelete(args[1]);
             msg.reply("You've just deleted "+args[1]+" messages");
             if (!args[1]) {
               msg.reply("please select a number of the messages you want to delete")
             }
             break;
         case 'translate':
         translate(tt, {to : lan}).then(re => {
           msg.channel.send(re.text);
         });
         break;
         case 'help':
           msg.reply("Hey! I am the Translator-Bot here, i can delete messages and translate every thing from any language to any language 🤗, if you want to translate you can just ask me to translate\nfor example : !translate good morning to Japanese.\nif you want to delete message just type !clear then the number of messages you want to delete\nfor example: !clear 5.\nto get Kunyomi or Onyomi just Type !kunyomi or !onyomi.\nFor example: !kunyomi 笑/!onyomi 何.\nfor full information of a kanji use !kanjiinfo\nfor example: !kanjiinfo 年.");
           break;
         case 'kanjiinfo':
          jisho.searchForKanji(args[1]).then(resu =>{
            if(!resu.found){
              msg.channel.send('There should be one Kanji');
            }else{
            msg.channel.send('Taught in: ' + resu.taughtIn+'\nJLPT level: ' + resu.jlptLevel+'\nStroke count: ' + resu.strokeCount+'\nMeaning: ' + resu.meaning+'\nKunyomi: ' + JSON.stringify(resu.kunyomi)+'\nKunyomi example: ' + JSON.stringify(resu.kunyomiExamples[0])+'\nOnyomi: ' + JSON.stringify(resu.onyomi)+'\nOnyomi example: ' + JSON.stringify(resu.onyomiExamples[0])+'\nRadical: ' + JSON.stringify(resu.radical)+'\nParts: ' + JSON.stringify(resu.parts));
            }
          });
           break;
        
         case 'kunyomi':
           jisho.searchForKanji(args[1]).then(r =>{
             if(!r.found){
               msg.channel.send("Sorry can't find the Kanji, There should be only one kanji");
             }else{
               msg.channel.send('Kunyomi: ' + JSON.stringify(r.kunyomi)+"\n"+'Kunyomi example: ' + JSON.stringify(r.kunyomiExamples[0])+"\nmeaning: "+r.meaning);
             }
           });
           break;
         case 'onyomi':
          jisho.searchForKanji(args[1]).then(result =>{
            if (!result.found) {
              msg.channel.send("Sorry can't find the Kanji, There should be only one kanji");
            }else{
              msg.channel.send('Onyomi: ' + JSON.stringify(result.onyomi)+"\n"+'Onyomi example: ' + JSON.stringify(result.onyomiExamples[0])+"\nmeaning: "+result.meaning);
            }
           });
           break;
           default:
           msg.channel.send("Couldn't find the command\nType the command !help to see the commands") 
         break;
    }
   }
});

bot.login("NjcyNTI3NjQ4NjM4ODk0MDgw.XjMyLg.NTPrlCKrepTCGd79Mg6U7IXDFAg");