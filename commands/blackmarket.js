const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

exports.run = async (client, prefix, entire, message, args, config) => {


    let timeout = 86400000 // 24 hours in milliseconds, change if you'd like.
    let timeoutweek = 604800000
    let timeoutmonth = 2419200000

    let c4AMT = 5
    let crossbowAMT = 100
    let pistolAMT = 100
    // random amount: Math.floor(Math.random() * 1000) + 1;

    let daily = await db.fetch(`blackmarketD_${message.guild.id}_${message.author.id}`);
    let weekly = await db.fetch(`blackmarketW_${message.guild.id}_${message.author.id}`);
    let monthly = await db.fetch(`blackmarketM_${message.guild.id}_${message.author.id}`);

    let silver = await db.fetch(`silver_${message.guild.id}_${message.author.id}`);
    let gold = await db.fetch(`gold_${message.guild.id}_${message.author.id}`);
    let plat = await db.fetch(`plat_${message.guild.id}_${message.author.id}`);

    if (args[0] == 'C4') {
        if (plat < c4AMT ) return message.channel.send('You need at least ' + c4AMT + ' platinum to purchase C4.')
            else if (daily !== null && timeout - (Date.now() - daily) > 0) {
                let time = ms(timeout - (Date.now() - daily))
                    message.channel.send(`You already bought C4 today, you can come back and buy more in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    }
            else {
                let embed = new Discord.MessageEmbed()
                .setAuthor(`Black Market`, message.author.displayAvatarURL)
                .setColor("BLACK")
                .setDescription(`**C4 Explosives**`)
                .addField(`Bought For: `, c4AMT)
            
                message.channel.send(embed)
                db.subtract(`plat_${message.author.id}`, c4AMT)
                db.add(`c4_${message.guild.id}_${message.author.id}`, 1)
                db.set(`blackmarketD_${message.guild.id}_${message.author.id}`, Date.now())
            } 
}



    else if(args[0] == 'crossbow') {
        if (silver < crossbowAMT ) return message.channel.send('You need at least ' + crossbowAMT + ' silver to purchase a crossbow.')
            else if (monthly !== null && timeoutmonth - (Date.now() - monthly) > 0) {
                let time2 = ms(timeoutmonth - (Date.now() - monthly))
                    message.channel.send(`You already bought a crossbow today, you can come back and buy another in **${time2.hours}h ${time2.minutes}m ${time2.seconds}s**!`)
}
                    else {
                        let embed = new Discord.MessageEmbed()
                        .setAuthor(`Black Market`, message.author.displayAvatarURL)
                        .setColor("BLACK")
                        .setDescription(`**Crossbow**`)
                        .addField(`Bought For: `, crossbowAMT)
                    
                        message.channel.send(embed)
                        db.subtract(`silver_${message.guild.id}_${message.author.id}`, crossbowAMT)
                        db.add(`crossbow_${message.guild.id}_${message.author.id}`, 1)
                        db.set(`blackmarketM_${message.guild.id}_${message.author.id}`, Date.now())
    }
}
    else if(args[0] == 'pistol') {
        if (gold < pistolAMT ) return message.channel.send('You need at least ' + pistolAMT + ' gold to purchase a pistol.')
            else if (daily !== null && timeoutweek - (Date.now() - weekly) > 0) {
                let time3 = ms(timeoutweek - (Date.now() - weekly))
                    message.channel.send(`You already bought a pistol today, you can come back and buy another in **${time3.hours}h ${time3.minutes}m ${time3.seconds}s**!`)
    }
                else {
                    let embed = new Discord.MessageEmbed()
                    .setAuthor(`Black Market`, message.author.displayAvatarURL)
                    .setColor("BLACK")
                    .setDescription(`**Pistol**`)
                    .addField(`Bought For: `, pistolAMT)
                
                    message.channel.send(embed)
                    db.subtract(`gold_${message.guild.id}_${message.author.id}`, pistolAMT)
                    db.add(`pistol_${message.guild.id}_${message.author.id}`, 1)
                    db.set(`blackmarketW_${message.guild.id}_${message.author.id}`, Date.now())
                }
}
        else {
        let embed = new Discord.MessageEmbed()
    .setAuthor(`Black Market`, message.author.displayAvatarURL)
    .setColor("BLACK")
    .setDescription(`**Available**`)
    .addField(`C4`, c4AMT + ' Platinum',)
    .addField(`Pistol`, pistolAMT + ' Gold')
    .addField(`Crossbow`, crossbowAMT + ' Silver')
            message.channel.send(embed)
}

    }