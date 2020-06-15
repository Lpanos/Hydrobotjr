const Discord = require('discord.js');
const https = require("https");
const config = require('./config.json')
const token = (config.token)
const client = new Discord.Client();
const db = require('quick.db')
var prefix = '!'

//FOR VOICE COMMANDS: npm install discord.js ffmpeg fluent-ffmpeg @discordjs/opus ytdl-core --save

client.on('message', message => {
    if (message.author.bot) return;

    if(db.get(`prefix${message.guild.id}`) == null){
        db.set(`prefix${message.guild.id}`, '/')
        console.log(db.get(`prefix${message.guild.id}`))
    }
    else{
       var prefix = db.get(`prefix${message.guild.id}`)
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const entire = message.content
    const command = args.shift().toLowerCase();
    
    if (message.content.indexOf(prefix) !== 0) return;

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, prefix, entire, message, args, config)
    } catch (err) {
        console.log(err)
        return;
    }
})

//Initializing Bot

client.on('ready',()=>{
    console.log('Hydro bot JR. is online');
});

client.login(token);