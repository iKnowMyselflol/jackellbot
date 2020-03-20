const { RichEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "sStart",
    aliases: ["shift"],
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
      
      let sChannel = message.guild.channels.find(c => c.id === "651339245671153684");  
      
      
      if(message.channel.id !== "689240682992632003") return message.channel.send("Help") 

      let tEmbed = new RichEmbed()
      .setTitle(`**[SHIFT]**`)
      .setDescription(`A shift is hosted by: **${message.author.tag}**\nHead down to the [shift](https://web.roblox.com/games/4483496788/Jackell-Cafe-V1?refPageId=6811e693-9681-492a-bf80-9a216a020d2d) to get a chance for your next rank!`)
      .setColor("#FFFF00")
      
      sChannel.send(tEmbed)
      sChannel.send("@everyone")
    }
}