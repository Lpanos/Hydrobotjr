const db = require('quick.db')
const Discord = require('discord.js')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {
  adminRole = db.get(`adminRole${message.guild.id}`)
  if(adminRole == null){
    var adminRole = 'Hydro'
  }

console.log(adminRole)

try{
let role = message.guild.roles.cache.find(r => r.name === adminRole);
}

catch(TyperError){
message.channel.send("No 'Hydro' or Admin roles on server")
}

var quote = db.get(`quote_${message.guild.id}`)
var syntax = 'Incorrect syntax. Try ' + prefix + 'quote <command> <text> -<author>'
var newquote = entire.replace(prefix + 'quote ' + args[0] + ' ', '')

console.log(adminRole)

 if(args[0] == null){
   var max = quote.length;
   var num = Math.floor(Math.random() * max)
   var selectQuote = quote[num];
     return message.channel.send(selectQuote)
}


if(args[0] == 'add'){
  if(message.member.roles.cache.some(r=>adminRole.includes(r.name)) ) { 
    if(args[1] == null){
        message.reply(syntax)
  }
    else{
      message.reply('Are you sure you want to proceed? This cannot be reversed. <y/n>').then(() => {
        const filtered = m => message.author.id === m.author.id;
          message.channel.awaitMessages(filtered, {max: 1, time: 10000}).then(collected => {
            if(collected.first().content.toLowerCase() == 'y') {
              db.push(`quote_${message.guild.id}`, newquote)
              message.reply('Quote added: ' + newquote)    
            }
      else{
        message.reply('Quote cancelled sucessfully.');      
          }    
        })

          .catch(() => {
            message.reply('No answer after 10 seconds, operation canceled.');
            });

      });
    }
  }

  else{
    return message.reply('You don\'t have permissions to edit quotes.')
      }
}


if(args[0] == 'remove'){
  var removeQuote = quote.filter(e => e !== newquote);
  if(message.member.roles.cache.some(r=>adminRole.includes(r.name)) ) {
    if(args[1] == null){
      message.reply(syntax)
  }

  else{
    message.reply('Are you sure you want to proceed? This cannot be reversed. <y/n>').then(() => {
      const filter = m => message.author.id === m.author.id;
        message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 10000}).then(collected => {
          if (collected.first().content.toLowerCase() == 'y') {
            db.set(`quote_${message.guild.id}`, removeQuote)
            message.reply('Quote removed: ' + newquote)    
        }
          else{
            message.reply('Quote cancelled sucessfully.');
              }
            })
            
            .catch(() => {
              message.reply('No answer after 10 seconds, operation canceled.');
              });
      });
   }
  }
}

}