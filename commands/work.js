const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, prefix, entire, message, args, config) => {


    
    if (args[0] == 'miner') {

        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. whatever you'd like

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, you worked as a miner & stole ${amount} coal from the company! :D`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)

    } else if(args[0] == 'slave') {
        let amount = Math.floor(Math.random() * 10) + 1; // 1-500 random number. whatever you'd like

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, you worked as a slave & got payed ${amount} coal for picking cotton.`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    } else if(args[0] == 'programmer') {
        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. change to whatever you'd like

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, you worked as a programmer for epicgames, you fixed their game & earned ${amount} coal!`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    }
    else{
        message.channel.send('Invalid action. Do ' + prefix + 'jobs to list jobs.')
    }






    // simple work command
    /*
    let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number.

    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}, it payed off!`, message.author.displayAvatarURL) 
    .setDescription(`${message.author}, you've worked and earned ${amount}$ !`)
    .setColor("RANDOM")
    

    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    */


}