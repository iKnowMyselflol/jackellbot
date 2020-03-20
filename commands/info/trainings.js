const { RichEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "tstart",
    aliases: ["trainings"],
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
      
      let sChannel = message.guild.channels.find(c => c.id === "651339245671153684");  
      
      
      if(message.channel.id !== "689240891248214026") return message.channel.send("Wrong channel! :x:689240891248214026") 

      let tEmbed = new RichEmbed()
      .setTitle(`**[TRAINING]**`)
      .setDescription(`A training is hosted by: **${message.author.tag}**\nHead down to the [training center](https://www.roblox.com/games/4485563570/Jackell-Cafe-Training-Centre) to get a chance for your next rank!`)
      .setColor("#FFFF00")
      
      sChannel.send(tEmbed)
      sChannel.send("@everyone")
    }
}