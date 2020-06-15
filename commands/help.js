const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {

if(args[0] == undefined){
    return message.channel.send('Specify what commands you want to see: economy or general?')
}

    if(args[0] == "economy"){     

    let embed = new Discord.MessageEmbed()
    .setTitle(`Hydro Bot`)
    .setDescription('**Commands**')
    .addField(prefix + `inventory`, '`Shows you the current items in your inventory.`')
    .addField (prefix + `work`, '`The main way of getting money. Do ' + prefix + 'jobs to list jobs.`')
    .addField(prefix + `daily | ` + prefix +  `weekly | ` + prefix +  `monthly`, '`Claim these to get more coal.`')
    .addField (prefix + `rob`, '`Steal someones money... if have what it takes...`')
    .addField (prefix + `pay`, '`Give someone else some of your money`')
    .addField (prefix + `store`, '`Lists items you can buy.`')
    .addField (prefix + `blackmarket`, '`Items you can buy on the black market.`')
    .setColor("PINK") 

    message.channel.send(embed)
    }
    else if(args[0] == "general"){

        let embed = new Discord.MessageEmbed()
        .setTitle(`Hydro Bot`)
        .setDescription('**Commands**')
        .addField (prefix + `set`, '`This command is for server config options (Prefix, Admin Roles)`')
        .addField (prefix + `syntax <command>`, '`Use this command to get the correct syntax for another command`')
        .addField (prefix + `clear <number>`, '`Clears the channel of a set amount of messages`')
        .addField (prefix + `reactionrole <argument> <role/emoji>`, '`Create a role reaction message`')
        .addField (prefix + `stats`, '`See Hydrobot\s stats`')
        //.addField (prefix + ``, '``')
        //.addField (prefix + ``, '``')
        .addField (prefix + `swagtest <user>`, '`See what % swag someone is`')
        .addField (prefix + `quote and/or <add/remove>`, '`Get a random quote from your server`')
        .addField(prefix + `meme`, '`Use this command and specify a subreddit to generate a trending post`')
        .setColor("PINK") 
    
        message.channel.send(embed)
    }

    else{
        return message.channel.send('Something went wrong, proper syntax is ' + prefix + 'help <general or economy>')
    }
}