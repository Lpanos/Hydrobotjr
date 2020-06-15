const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')

exports.run = async (client, prefix, entire, message, args, config) => {

    var prefix = db.get(`prefix${message.guild.id}`)
    let userName = message.mentions.members.first()
    // let embed = new Discord.MessageEmbed()
    // .setTitle(`Hydro Bot`)
    // .setDescription('**Jobs**')
    // .addField('Line1')
    // .addField('Line2')
    // .addField ('Line3')
    // .setColor("PINK") 


    // let embed2 = new Discord.MessageEmbed()
    // .setTitle(`Hydro Bot`)
    // .setDescription('**Jobs**')
    // .addField('Line12')
    // .addField('Line22')
    // .addField ('Line32')
    // .setColor("PINK") 




    //message.channel.send('Loading...')

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// message.channel.send("██ 39%").then((sentMessage) => {
//     wait(1*1000).then((waitDone) => sentMessage.edit("███ 49%")).then((sentMessage) => {
//         wait(1*1000).then((waitDone) => sentMessage.edit("████ 76%")).then((sentMessage) => {
//             wait(1*1000).then((waitDone) => sentMessage.edit("██████ 100%"))
//             })
//         })
//     })

//This is a copy of it blank
// message.channel.send('').then((sentMessage) => {
//     wait(1*1000).then((waitDone) => sentMessage.edit('')).then((sentMessage) => {
//         wait(1*1000).then((waitDone) => sentMessage.edit('')).then((sentMessage) => {
//             wait(1*1000).then((waitDone) => sentMessage.edit(''))
//             })
//         })
//     })
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }  

message.channel.send('Reading Messages...').then((sentMessage) => {
    wait(1*1000).then((waitDone) => sentMessage.edit('Scanning Variables...')).then((sentMessage) => {
        wait(1*1000).then((waitDone) => sentMessage.edit('Determining Outcome...')).then((sentMessage) => {
            wait(1*1000).then((waitDone) => sentMessage.edit('<@' + userName + '> is ' + getRandomInt(100) + '% swag.'))
            })
        })
    })

}
