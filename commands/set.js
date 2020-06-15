const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {
  var syntax = 'Invalid Syntax. Proper syntax is:' + db.get(`prefix${message.guild.id}`) + 'set <thing> <parameters>'
  
  adminRole = db.get(`adminRole${message.guild.id}`)
  if(adminRole == null){
    var adminRole = 'Hydro'
  }

var prefix2 = args[1]

if(args[0] == 'prefix'){
  if(message.member.roles.cache.some(r=>["Admin", "Mod", "Hydro", "Hydrants"].includes(r.name)) ) {
      if(args[1] == null){
          message.reply(syntax)
    }
      else{
        message.reply('Are you sure you want to proceed? This cannot be reversed. <y/n>').then(() => {
          const filtered = m => message.author.id === m.author.id;
            message.channel.awaitMessages(filtered, {max: 1, time: 10000}).then(collected => {
              if(collected.first().content.toLowerCase() == 'y') {
                console.log('y')
                db.set(`prefix${message.guild.id}`, prefix2)
                message.reply('Prefix set to: ' + prefix2)    
                }
        else{
          message.reply('Prefix change cancelled');      
            }    
          })
  
            .catch(() => {
              message.reply('No answer after 10 seconds, operation canceled.');
              });
  
        });
      }
    }
else if(args[0] == 'adminrole'){
  if(message.member.roles.cache.some(r=>["Admin", "Mod", "Hydro", "Hydrants"].includes(r.name)) ) {
    if(args[1] == null){
        message.reply(syntax)
  }
    else if(args[1] == 'add'){
      message.reply('Are you sure you want to proceed? This cannot be reversed. <y/n>').then(() => {
        const filtered = m => message.author.id === m.author.id;
          message.channel.awaitMessages(filtered, {max: 1, time: 10000}).then(collected => {
            if(collected.first().content.toLowerCase() == 'y') {
              console.log('y')
              db.add(`adminRole${message.guild.id}`, args[2])
              message.reply('Gave role ' + args[2] + ' HydroBot Admin Permissions')    
              }
      else{
        message.reply('Bot admin permissions change cancelled');      
          }    
        })

          .catch(() => {
            message.reply('No answer after 10 seconds, operation canceled.');
            });

      });
    }
    else if(args[1] == 'remove'){
      message.reply('Are you sure you want to proceed? This cannot be reversed. <y/n>').then(() => {
        const filtered = m => message.author.id === m.author.id;
          message.channel.awaitMessages(filtered, {max: 1, time: 10000}).then(collected => {
            if(collected.first().content.toLowerCase() == 'y') {
              console.log('y')
              db.remove(`adminRole${message.guild.id}`, args[2])
              message.reply('Took role\'s ' + args[2] + ' HydroBot Admin Permissions')    
              }
      else{
        message.reply('Bot admin permissions change cancelled');      
          }    
        })

          .catch(() => {
            message.reply('No answer after 10 seconds, operation canceled.');
            });

      });
    
  }
}


else{
      return message.reply('You don\'t have permissions set things.')
        }
    }
  }
}
