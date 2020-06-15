const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, prefix, entire, message, args, config) => {


    let user = message.mentions.members.first()
    let c4 = await db.fetch(`c4_${message.guild.id}_${message.author.id}`) // fetch authors balance
    let crossbow = await db.fetch(`crossbow_${message.guild.id}_${message.author.id}`)
    let pistol = await db.fetch(`pistol_${message.guild.id}_${message.author.id}`)
    let coal = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let silver = await db.fetch(`silver_${message.guild.id}_${user.id}`)
    let gold = await db.fetch(`gold_${message.guild.id}_${user.id}`)
    let plat = await db.fetch(`plat_${message.guild.id}_${user.id}`)

    if (!user) {
        return message.channel.send('Sorry, you forgot to mention somebody.')
    }
    if (c4 < 1 && crossbow < 1 && pistol < 1) { // if the authors balance is less than 250, return this.
        return message.channel.send(":x: You don't the resources for that action... maybe check the black market.")
    }

    if (coal < 0 && silver < 0 && gold < 0 && plat < 0) { // if mentioned user has 0 or less, it will return this.
        return message.channel.send(`:x: ${user.user.username} does not have anything to rob.`)
    }

    let random = Math.floor(Math.random() * coal);
    let random2 = Math.floor(Math.random() * silver);
    let random3 = Math.floor(Math.random() * gold);
    let random4 = Math.floor(Math.random() * plat);

    function gaymer(item){
        list = []
        weapon.forEach((weap) =>{
            if(weap != item){
                list.push(weap)
        }
    })
        weapon = list
}

    var weapon = [
        "c4",
        "crossbow",
        "pistol",
    ];

        if(c4 < 1){
            gaymer("c4")
        }

        if(crossbow < 1){
            gaymer("crossbow")        
        }

        if(pistol < 1){
            gaymer("pistol")        
        }

console.log(weapon)
    var randomweapon = weapon[Math.floor(Math.random() * weapon.length)];
    console.log(Math.random() * weapon.length)


    if(randomweapon == "c4"){
        db.subtract(`c4_${message.guild.id}_${message.author.id}`, 1)
        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author} you blew up ${user}'s safe and got away with: `)
            .setColor("GREEN")
            .addFields(
                { name: 'Coal', value: random },
                { name: 'Silver', value: random2, inline: false },
                { name: 'Gold', value: random3, inline: false },
                { name: 'Platinum', value: random4, inline: false },
            )
            .setTimestamp()
            message.channel.send(embed)
        }
    
    else if(randomweapon == "crossbow"){
        db.subtract(`crossbow_${message.guild.id}_${message.author.id}`, 1)
        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author} you skewered ${user} and got away with: `)
            .setColor("GREEN")
            .addFields(
                { name: 'Coal', value: random },
                { name: 'Silver', value: random2, inline: false },
                { name: 'Gold', value: random3, inline: false },
                { name: 'Platinum', value: random4, inline: false },
            )
            .setTimestamp()
            message.channel.send(embed)
        }

    else if(randomweapon == "pistol"){
        db.subtract(`pistol_${message.guild.id}_${message.author.id}`, 1)
        let embed = new Discord.MessageEmbed()
            .setDescription(`${message.author} you popped a cap in ${user} and got away with: `)
            .setColor("GREEN")
            .addFields(
                { name: 'Coal', value: random },
                { name: 'Silver', value: random2, inline: false },
                { name: 'Gold', value: random3, inline: false },
                { name: 'Platinum', value: random4, inline: false },
            )
            .setTimestamp()
            message.channel.send(embed)
        }
            else{
                return message.channel.send(":x: You don't the resources for that action... maybe check the black market.") 
            }
    db.subtract(`money_${message.guild.id}_${user.id}`, random)
    db.subtract(`silver_${message.guild.id}_${user.id}`, random2)
    db.subtract(`gold_${message.guild.id}_${user.id}`, random3)
    db.subtract(`plat_${message.guild.id}_${user.id}`, random4)
    db.add(`money_${message.guild.id}_${message.author.id}`, random)
    db.add(`silver_${message.guild.id}_${message.author.id}`, random2)
    db.add(`gold_${message.guild.id}_${message.author.id}`, random3)
    db.add(`plat_${message.guild.id}_${message.author.id}`, random4)
}