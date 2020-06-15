const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {
    
    var prefix = db.get(`prefix${message.guild.id}`)

    let coal = db.fetch(`money_${message.guild.id}_${message.author.id}`)
    let silver = db.fetch(`silver_${message.guild.id}_${message.author.id}`)
    let gold = db.fetch(`gold_${message.guild.id}_${message.author.id}`)
    let plat = db.fetch(`plat_${message.guild.id}_${message.author.id}`)

    let silverpurchasecost = 100
    let goldpurchasecost = 10
    let platpurchasecost = 10

    if(args[0] == undefined){
        message.channel.send('Invalid syntax. Proper syntax is ' + prefix + 'buy <item> <amount>')
    }

    if(isNaN(args[0]) == false ){
        message.channel.send('Invalid syntax. Proper syntax is ' + prefix + 'buy <item> <amount>')
    }

    if (args[0] == 'silver') {
        if (coal < silverpurchasecost * args[1]){ return message.channel.send('You need at least ' + silverpurchasecost * args[1] + ' Coal to purchase ' + args[1] + ' Silver Coin')}
        else{
        db.subtract(`money_${message.guild.id}_${message.author.id}`, silverpurchasecost * args[1])
        message.channel.send(message.author.tag + ' You successfully bought ' + args[1] + ' Silver Coin, at a cost of ' + silverpurchasecost * args[1] + ' Coal!')
        db.add(`silver_${message.guild.id}_${message.author.id}`, args[1])
        }
    } else if(args[0] == 'gold') {
        if (silver < goldpurchasecost * args[1]){ return message.channel.send('You need at least ' + goldpurchasecost * args[1] + ' Silver Coin to purchase ' + args[1] + ' Gold Coin')
    } else{
        db.subtract(`silver_${message.guild.id}_${message.author.id}`, goldpurchasecost * args[1])
        message.channel.send(message.author.tag + ' You successfully bought ' + args[1] + ' Gold Coin, at a cost of ' + goldpurchasecost * args[1] + ' Silver Coin!')
        db.add(`gold_${message.guild.id}_${message.author.id}`, args[1])
        }
    }
    else if(args[0] == 'platinum') {
        if (gold < platpurchasecost * args[1]){ return message.channel.send('You need at least ' + platpurchasecost * args[1] + ' Gold Coin to purchase ' + args[1] + ' Platinum')
    }

    else{
        db.subtract(`gold_${message.guild.id}_${message.author.id}`, platpurchasecost * args[1])
        message.channel.send(message.author.tag + ' You successfully bought ' + args[1] + ' Platinum Coin, at a cost of ' + platpurchasecost * args[1] + ' Gold Coin!')
        db.add(`plat_${message.guild.id}_${message.author.id}`, args[1])
    }
}



}