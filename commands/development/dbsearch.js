const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const db = require('quick.db')
const { inspect } = require("util");

module.exports = {
  name: "db", 
  category: "development",
  aliases: ["sdb"],
  description: "Sends a kool meme!",
  run: async (client, message, args) => {
    
    if (message.author.id !== '495506911257427979') return;
    
    let searched = args[0];
    
    let ds = db.get(`${searched}`);
    message.channel.send(`${ds}`)
    
  }
}