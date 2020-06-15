const Discord = require('discord.js')
const db = require('quick.db')


exports.run = async (client, prefix, entire, message, args, config) => {
    adminRole = db.get(`adminRole${message.guild.id}`)
if(adminRole == null){
  var adminRole = 'Hydro'
}
    if(message.member.roles.cache.some(r=>adminRole.includes(r.name)) ){
        let user = message.mentions.members.first() 
        for(i=0;i<5;i++){
        message.channel.send(user, {files: ['https://cdn.discordapp.com/attachments/640092025836011520/711491419507785728/4b5rkcdgqbt41.png']});
        }
    }
}
