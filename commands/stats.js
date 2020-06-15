const { Client } = require('discord.js');
const client = new Client();

exports.run = async (client, prefix, entire, message, args, config) => {

    return message.channel.send(`Server count: ${client.guilds.cache.size}`);

}