const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const db = require('quick.db')
const { inspect } = require("util");

module.exports = {
  name: "devmode", 
  category: "development",
  aliases: ["dmode"],
  description: "Sends a kool meme!",
  run: async (client, message, args) => {
    
    if (message.author.id !== '495506911257427979') return;
    
    const devmode = db.fetch("devmode")
    if(devmode == null) db.set("devmode", "disabled")
    
    if(args[0] == "true") {
      db.set("devmode", "enabled")
      return message.channel.send("Devmode is now `TRUE`")
    };
    if(args[0] == "false") {
       db.set("devmode", "disabled")
      return message.channel.send("Devmode is now `FALSE`")
     
    }
  }
}