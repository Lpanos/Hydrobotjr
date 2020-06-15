const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {

    var prefix = db.get(`prefix${message.guild.id}`)


     
    let embed = new Discord.MessageEmbed()
    .setTitle(`Hydro Bot`)
    .setDescription('**Jobs**')
    .addField(prefix + `work miner`, '`Mine for coal and take some home`')
    .addField(prefix + `work slave`, '`Pick cotton for coal. IDK why coal.`')
    .addField (prefix + `work programmer`, '`Fix Fortnite and get paid in ninja coal.`')
    .setColor("PINK") 

    message.channel.send(embed)

}