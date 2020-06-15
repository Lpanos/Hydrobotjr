const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {

    adminRole = db.get(`adminRole${message.guild.id}`)
    if(adminRole == null){
      var adminRole = 'Hydro'
    }

    if(!message.member.roles.cache.some(r=>adminRole.includes(r.name)) ){
        message.reply('You don\'t have permissions to execute this command. Please use ' + prefix + 'help for more info.')
    }


    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because you can only bulk delete messages that are under 14 days old.`));
    }
