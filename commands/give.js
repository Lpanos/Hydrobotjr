const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {

    let user = message.mentions.members.first() || message.author
    let coal = db.fetch(`money_${message.guild.id}_${user.id}`)
    let silver = db.fetch(`silver_${message.guild.id}_${user.id}`)
    let gold = db.fetch(`gold_${message.guild.id}_${user.id}`)
    let platinum = db.fetch(`plat_${message.guild.id}_${user.id}`)


    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('You do not have enough permission to use this command.')
    }

    if (!args[0]) return message.reply('Something went wrong. Correct syntax is ' + db.get(`prefix${message.guild.id}`) + 'take <item> <amount> <user>..')
    if (isNaN(args[1])) return message.reply('That was not a valid number!')

    if(args[0] == "coal"){
        db.add(`money_${message.guild.id}_${user.id}`, args[1])
    }

    else if(args[0] == "silver"){
        db.add(`silver_${message.guild.id}_${user.id}`, args[1])
    }

    else if(args[0] == "gold"){
        db.add(`gold_${message.guild.id}_${user.id}`, args[1])
    }

    else if(args[0] == "platinum"){
        db.add(`plat_${message.guild.id}_${user.id}`, args[1])
    }

    else{
        return message.channel.send('${message.author}, something went wrong. Correct syntax is ' + db.get(`prefix${message.guild.id}`) + 'take <item> <amount> <user>..')
    }

    message.channel.send('Successfully added ' + args[1] + ' ' + args[0] + ' to ' + user)

}