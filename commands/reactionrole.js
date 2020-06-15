const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')
const token = (config.token)
const { Client, MessageEmbed, Emoji, MessageReaction } = require('discord.js');
const CONFIG = require('./config');

exports.run = async (client, prefix, entire, message, args, config) => {

const syntax = 'Incorrect syntax. Try ' + db.get(`prefix${message.guild.id}`) + 'reactionrole <command> <command/text> <text>'

    adminRole = db.get(`adminRole${message.guild.id}`)
    if(adminRole == null){
      var adminRole = 'Hydro'
    }


if(args[0] == 'create'){
    if(message.member.roles.cache.some(r=>adminRole.includes(r.name)) ) { 
            var embed = true

            var initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`,

            embedMessage = 'React to the emoji that matches the role you wish to receive. If you would like to remove the role, simply remove your reaction!'
    
	var embedFooter = "Role Reactions"

    var embedColor = "#dd9323",


    embedThumbnail = false
    
    var embedThumbnailLink = ""

            if (token === '')
                throw new Error("The 'botToken' property is not set in the config.js file. Please do this!");

             createrolemessage = entire.replace(db.get(`prefix${message.guild.id}`), '')


            // If there isn't a reaction for every role, alert the user
            if (db.get(`roleList${message.guild.id}`).length !== db.get(`reactionList${message.guild.id}`).length)
                throw "Roles list and reactions list are not the same length! Please double check this in the config.";


            // Function to generate the role messages, based on your settings
            function generateMessages() {
                return db.get(`roleList${message.guild.id}`).map((r, e) => {
                    return {
                        role: r,
                        message: `React below to get the **"${r}"** role!`, //DONT CHANGE THIS,
                        emoji: db.get(`reactionList${message.guild.id}`)[e]
                    };
                });
            }

            // Function to generate the embed fields, based on your settings and if you set "const embed = true;"
            function generateEmbedFields() {
                return db.get(`roleList${message.guild.id}`).map((r, e) => {
                    return {
                        emoji: db.get(`reactionList${message.guild.id}`)[e],
                        role: r
                    };
                });
            }

            // Handles the creation of the role reactions. Will either send the role messages separately or in an embed
                
                // Make sure bots can't run this command
                // We don't want the bot to do anything further if it can't send messages in the channel
                if (message.guild && !message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES')) return;

                const missing = message.channel.permissionsFor(message.guild.me).missing('MANAGE_MESSAGES');
                // Here we check if the bot can actually add recations in the channel the command is being ran in
                if (missing.includes('ADD_REACTIONS'))
                    throw new Error("I need permission to add reactions to these messages! Please assign the 'Add Reactions' permission to me in this channel!");

                if (!embed) {
                    if (!initialMessage || (initialMessage === '')) 
                        throw "The 'initialMessage' property is not set. Please do this!";

                    message.channel.send(initialMessage);

                    const messages = generateMessages();
                    for (const { role, message: msg, emoji } of messages) {
                        if (!message.guild.roles.cache.find(r => r.name === role))
                            throw `The role '${role}' does not exist!`;

                        message.channel.send(msg).then(async m => {
                            const customCheck = message.guild.emojis.find(e => e.name === emoji);
                            if (!customCheck) await m.react(emoji);
                            else await m.react(customCheck.id);
                        }).catch(console.error);
                    }
                } else {
                    if (!embedMessage || (embedMessage === ''))
                        throw "The 'embedMessage' property is not set. Please do this!";
                    if (!embedFooter || (embedMessage === ''))
                        throw "The 'embedFooter' property is not set. Please do this!";

                    const roleEmbed = new MessageEmbed()
                        .setDescription(embedMessage)
                        .setFooter(embedFooter);

                    if (embedColor) roleEmbed.setColor(embedColor);

                    if (embedThumbnail && (embedThumbnailLink !== '')) 
                        roleEmbed.setThumbnail(embedThumbnailLink);
                    else if (embedThumbnail && message.guild.icon)
                        roleEmbed.setThumbnail(message.guild.iconURL);

                    const fields = generateEmbedFields();
                    if (fields.length > 25) throw "That maximum roles that can be set for an embed is 25!";

                    for (const { emoji, role } of fields) {
                        if (!message.guild.roles.cache.find(r => r.name === role))
                            throw `The role '${role}' does not exist!`;

                        const customEmote = client.emojis.cache.find(e => e.name === emoji);
                        
                        if (!customEmote) roleEmbed.addField(emoji, role, true);
                        else roleEmbed.addField(customEmote, role, true);
                    }

                    message.channel.send(roleEmbed).then(async m => {
                        for (const r of db.get(`reactionList${message.guild.id}`)) {
                            const emoji = r;
                            const customCheck = client.emojis.cache.find(e => e.name === emoji);
                            
                            if (!customCheck) await m.react(emoji);
                            else await m.react(customCheck.id);
                        }
                    });
                }

            // This makes the events used a bit more readable
            const events = {
                MESSAGE_REACTION_ADD: 'messageReactionAdd',
                MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
            };

            // This event handles adding/removing users from the role(s) they chose based on message reactions
            client.on('raw', async event => {
                if (!events.hasOwnProperty(event.t)) return;

                const { d: data } = event;
                const user = client.users.cache.get(data.user_id);
                const channel = client.channels.cache.get(data.channel_id);

                const message = await channel.messages.fetch(data.message_id);
                const member = message.guild.members.cache.get(user.id);

                const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
                let reaction = message.reactions.cache.get(emojiKey);

                if (!reaction) {
                    // Create an object that can be passed through the event like normal
                    const emoji = new Emoji(client.guilds.cache.get(data.guild_id), data.emoji);
                    reaction = new MessageReaction(message, emoji, 1, data.user_id === client.user.id);
                }

                let embedFooterText;
                if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

                if (
                    (message.author.id === client.user.id) && (message.content !== CONFIG.initialMessage || 
                    (message.embeds[0] && (embedFooterText !== CONFIG.embedFooter)))
                ) {

                    if (!embed && (message.embeds.length < 1)) {
                        const re = `\\*\\*"(.+)?(?="\\*\\*)`;
                        const role = message.content.match(re)[1];

                        if (member.id !== client.user.id) {
                            const guildRole = message.guild.roles.cache.find(r => r.name === role);
                            if (event.t === "MESSAGE_REACTION_ADD") member.roles.add(guildRole.id);
                            else if (event.t === "MESSAGE_REACTION_REMOVE") member.roles.remove(guildRole.id);
                        }
                    } else if (embed && (message.embeds.length >= 1)) {
                        const fields = message.embeds[0].fields;

                        for (const { name, value } of fields) {
                            if (member.id !== client.user.id) {
                                const guildRole = message.guild.roles.cache.find(r => r.name === value);
                                if ((name === reaction.emoji.name) || (name === reaction.emoji.toString())) {
                                    if (event.t === "MESSAGE_REACTION_ADD") member.roles.add(guildRole.id);
                                    else if (event.t === "MESSAGE_REACTION_REMOVE") member.roles.remove(guildRole.id);
                                }
                            }
                        }
                    }
                }
            });

            process.on('unhandledRejection', err => {
                const msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
                console.error("Unhandled Rejection", msg);
                message.reply(("Unhandled Rejection: Missing Permissions"))
            });
                    }
    }

var reactionList = db.get(`reactionList${message.guild.id}`)
var roleList = db.get(`roleList${message.guild.id}`)
var replaced = entire.replace(db.get(`prefix${message.guild.id}`) + 'reactionrole ' + args[0] + ' ', '')
var replaced2  = entire.replace(db.get(`prefix${message.guild.id}`) + 'reactionrole ' + args[0] + ' ' + args[1] + ' ', '')

 if(args[0] == null){
    return message.channel.send(syntax)
}

if(args[0] == 'list'){
    message.reply('Emojis: ' + db.get(`reactionList${message.guild.id}`) + ' Roles: ' + db.get(`roleList${message.guild.id}`))
}

if(args[0] == 'add'){
  if(message.member.roles.cache.some(r=>adminRole.includes(r.name)) ) { 
    if(args[1] == null){
        message.reply(syntax)
  }
    else{
      message.reply('Are you sure you want to proceed? This cannot be reversed. <y/n>').then(() => {
        const filtered = m => message.author.id === m.author.id;
         message.channel.awaitMessages(filtered, {max: 1, time: 10000}).then(collected => {
            if(collected.first().content.toLowerCase() == 'y') {

                if(args[1] == 'role'){
                    db.push(`roleList${message.guild.id}`, replaced2)
              message.reply('Role added: ' + replaced2)    
                }

                else if(args[1] == 'emoji')
                db.push(`reactionList${message.guild.id}`, replaced2)
              message.reply('Emoji added: ' + replaced2)    
            }

      else{
        message.reply('Operation cancelled sucessfully.');      
          }    
        })

          .catch(() => {
            message.reply('No answer after 10 seconds, operation canceled.');
            });

      });
    }
  }

  else{
    return message.reply('You don\'t have permissions to edit reaction roles.')
      }
}


if(args[0] == 'remove'){

    if(reactionList != null){
        var reactionList2 = reactionList.filter(e => e !== replaced2)
    }
    if(roleList != null){
        var roleList2 = roleList.filter(e => e !== replaced2);
    }

  if(message.member.roles.cache.some(r=>adminRole.includes(r.name)) ) {
    if(args[1] == null){
      message.reply(syntax)
  }

  else{
    message.reply('Are you sure you want to proceed? This cannot be reversed. <y/n>').then(() => {
      const filter = m => message.author.id === m.author.id;
        message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 10000}).then(collected => {
          if (collected.first().content.toLowerCase() == 'y') {

            if(args[1] == 'role'){
                db.set(`roleList${message.guild.id}`, roleList2)
          message.reply('Role removed: ' + replaced2)    
            }

            else if(args[1] == 'emoji')
          db.set(`reactionList${message.guild.id}`, reactionList2)
          message.reply('Emoji removed: ' + replaced2)    
        }

          else{
            message.reply('Quote cancelled sucessfully.');
              }
            })
            
            .catch(() => {
              message.reply('No answer after 10 seconds, operation canceled.');
              });
      });
   }

   if(args[0] == 'list'){
   message.reply('Roles: ' + roleList + ' ' + ' Reactions '  + reactionList)
    }
}
}
}