const Discord = require('discord.js')
const db = require('quick.db')
const config = require('./config.json')
const https = require("https")

exports.run = async (client, prefix, entire, message, args, config) => {
    
    var prefix = db.get(`prefix${message.guild.id}`)
    
    var meme2 = prefix + 'meme '
    var subreddit = message.content;

        subreddit = (subreddit.substring(meme2.length));
            console.log(subreddit);


    
    
https.get(`https://www.reddit.com/r/${subreddit}.json`, res => {
    console.log('Status Code: ' + res.statusCode);
    
let body = ''
    res.on('data', data => {
            body += data;
})
    
res.on('end', ()=>{
                
function getMeme(subreddit){
    try {
                
        var response = JSON.parse(body);

        var children = response.data.children;

        var urls = [];
}

catch (error) {
    return('Invalid Subreddit. Proper Format is: ' + prefix + 'meme [subreddit]')
}

children.forEach((child)=>{
    var values = Object.values(child.data);
        values.forEach((value)=>{
    var key = String(value)
if(key.includes('https://')){
    if(key.includes('redd.it/'))
        urls.push(key);
}
    })
        })



var max = urls.length;

var num = Math.floor(Math.random() * max) + 1  
    console.log('Total Memes:' + max)
    
if(max == 0){
    return('Invalid Or Non-Media Subreddit. Proper Format is: ' + prefix + 'meme [subreddit]')
}

var selectMeme = urls[num];
    console.log('Selected Meme: ' + selectMeme);
                
if(selectMeme == undefined){
                    
    do{

        var max = urls.length;
        var num = Math.floor(Math.random() * max) + 1  
        var selectMeme = urls[num];
         console.log('log if this actually was tried')
         console.log('try 2 ' + selectMeme)  
}

while(selectMeme == undefined)
    return(selectMeme)

}
            
    
    
else
    return(selectMeme)
}

getMeme();

try {
        
    if(getMeme().includes('v.redd.it')){

       var thots = getMeme()

            thots += '/DASH_720'

    console.log(thots)

        message.channel.send(getMeme() + ' || Downloadable Link: ' + thots);
}

    else if(getMeme().includes('.png')){
        message.channel.send('', {files: [getMeme()]});
}

    else if(getMeme().includes('.jpg')){
            message.channel.send('', {files: [getMeme()]});
}

    else{
        message.channel.send(getMeme());
}
    } 

catch (error) {

    ('An error occured, try again or pick a different subreddit.')
}         
    })
        });
            }
