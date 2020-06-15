const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {

    var prefix = db.get(`prefix${message.guild.id}`)


     
    let embed = new Discord.MessageEmbed()
    .setTitle(`Hydro Bot Store!`)
    .setDescription('**Use ' + prefix + 'buy <item> <amount> to buy!**')
    .addField(`Silver`, '`100`\nPurchase 1 Silver For 100 Coal!')
    .addField(`Gold`, '`10`\nPurchase 1 Gold For 10 Silver!')
    .addField (`Platinum`, '`10` \nPurchase 1 Platinum For 10 Gold!') //can add up to 25(I believe)
    .setColor("RANDOM") 

    message.channel.send(embed)



}