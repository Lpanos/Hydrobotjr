const db = require('quick.db')
const Discord = require('discord.js')


exports.run = async (client, prefix, entire, message, args, config) => {
    // just copy & paste it in here.

    let user = message.mentions.members.first() || message.author
    let coal = db.fetch(`money_${message.guild.id}_${user.id}`)
    let silver = db.fetch(`silver_${message.guild.id}_${user.id}`)
    let gold = db.fetch(`gold_${message.guild.id}_${user.id}`)
    let platinum = db.fetch(`plat_${message.guild.id}_${user.id}`)


    if (!message.member.hasPermission('MANAGE_GUILD')) { // if message.author / member does not have the permission MANAGE_GUILD, return.
        return message.channels.send('You\'re missing the permission `MANAGE_GUILD` to use this command.').then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 2500); // delete after 2.5 seconds.
        })
    }


    if (isNaN(args[1] && args[0] != "all")) return message.channel.send(`${message.author}, you need to input a valid number to remove.`) // if args[0] (first input) is not a number, return.
    

    if(args[0] == "coal"){
        db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    }

    else if(args[0] == "silver"){
        db.subtract(`silver_${message.guild.id}_${user.id}`, args[1])
    }

    else if(args[0] == "gold"){
        db.subtract(`gold_${message.guild.id}_${user.id}`, args[1])
    }

    else if(args[0] == "platinum"){
        db.subtract(`plat_${message.guild.id}_${user.id}`, args[1])
    }

    else if(args[0] == "all"){
        db.subtract(`money_${message.guild.id}_${user.id}`, coal)
        db.subtract(`silver_${message.guild.id}_${user.id}`, silver)
        db.subtract(`gold_${message.guild.id}_${user.id}`, gold)
        db.subtract(`plat_${message.guild.id}_${user.id}`, platinum)
    }
     else{
         return message.channel.send(`${message.author}, something went wrong. Correct syntax is ` + prefix + `take <item> <amount> <user>.`)
     }

    let embed = new Discord.MessageEmbed()
    .setAuthor(`Removed Money!`, message.author.displayAvatarURL)
    .addField(`Amount`, `${args[1]} ${args[0]}`)
    .setColor("RED") // random = "RANDOM"
    .setTimestamp()

    message.channel.send(embed)

}