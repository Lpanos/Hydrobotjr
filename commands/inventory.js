const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, prefix, entire, message, args, config) => {

    let coal = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    let silver = db.fetch(`silver_${message.guild.id}_${message.author.id}`);
    let gold = db.fetch(`gold_${message.guild.id}_${message.author.id}`);
    let plat = db.fetch(`plat_${message.guild.id}_${message.author.id}`);
    let c4 = db.fetch(`c4_${message.guild.id}_${message.author.id}`);
    let pistol = db.fetch(`pistol_${message.guild.id}_${message.author.id}`);
    let crossbow = db.fetch(`crossbow_${message.guild.id}_${message.author.id}`);


if(coal < 1){
coal = 0
}
if(silver < 1){
silver = 0
}
if(gold < 1){
gold = 0
}
if(plat < 1){
plat = 0
}
if(c4 < 1){
    c4 = 0
}
if(pistol < 1){
    pistol = 0
}
if(crossbow < 1){
    crossbow = 0
}

    var user = (message.author.username)
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Player Inventory')
        .setAuthor(user)
        .setThumbnail('https://vignette.wikia.nocookie.net/minecraft/images/b/b3/Chest.png/revision/latest?cb=20191220013856')
        .addFields(
            { name: 'Coal', value: coal },
            { name: 'Silver', value: silver, inline: false },
            { name: 'Gold', value: gold, inline: false },
            { name: 'Platinum', value: plat, inline: false },
            { name: 'C4: ', value: c4, inline: false },
            { name: 'Pistol: ', value: pistol, inline: false },
            { name: 'Crossbow: ', value: crossbow, inline: false },
        )
        .setTimestamp()
        .setFooter('Support The Development Of This Bot');
    
    message.channel.send(exampleEmbed);
    


}