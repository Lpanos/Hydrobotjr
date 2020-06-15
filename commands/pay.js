const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, prefix, entire, message, args, config) => {



    let user = message.mentions.members.first() 

    let member = db.fetch(`plat_${message.guild.id}_${message.author.id}`)


    if (!user) {
        return message.channel.send('you forgot to mention somebody.')
    }
    if (!args[1]) {
        return message.channel.send('Please specify an amount.')
    }
    if (message.content.includes('-')) { // if the message includes "-" do this.
        return message.channel.send('Negative money can not be paid.')
    }

    if (member < args[1]) {
        return message.channel.send(`That's more money than you've got in your balance. try again.`)
    }

    message.channel.send(`${message.author.tag}, You successfully paid ${user.user.username} ${args[1]}$.`)
    db.add(`money_${message.guild.id}_${message.user.id}`, args[1])
    db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])




}