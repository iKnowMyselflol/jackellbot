const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require('quick.db');

module.exports = {
  name: "module",
  aliases: ["modules"],
  catergory: "Moderation",
  usage: "!!kick <@user>/<userid> <reason>",
  run: async (client, message, args) => {
    
    const devmode = db.get("devmode")
    if(devmode === "enabled") return message.channel.send("The bot is in maintenance right now. Please check again later!")
    
    if(!message.member.hasPermissions(["MANAGE_GUILD", "ADMINISTRATOR"])) {
      return message.channel.send(":x: You don't have permissions to use this command. \n You need: `MANAGE_GUILD`")
    }
    
    let moderationmodule = db.get(`mmodule_${message.guild.id}`)
    if(moderationmodule == null) {
      db.set(`mmodule_${message.guild.id}`, 'enabled')
      return;
    }
    
    const funmodule = db.get(`funmodule_${message.guild.id}`)
    if(funmodule == null) {
      db.set(`funmodule_${message.guild.id}`, 'enabled');
      return;
    }
    
    if(args[0] == 'fun') {
      if(funmodule == 'enabled') {
        db.set(`funmodule_${message.guild.id}`, 'disabled')
        message.channel.send("Successfully disabled the `fun` module!")
      }else {
        if(funmodule == 'disabled') {
          db.set(`funmodule_${message.guild.id}`, 'enabled');
          message.channel.send("Successfully enabled `fun` module!")
        };
      };
    };
    
    if(args[0] == 'moderation') {
      if(moderationmodule == 'enabled') {
        db.set(`mmodule_${message.guild.id}`, 'disabled')
        message.channel.send("Successfully disabled `moderation` module")
      }else{
        if(moderationmodule == 'disabled') {
          db.set(`mmodule_${message.guild.id}`, 'enabled')
          message.channel.send("Successfully enabled `moderation` module")
        }
      }
    }
  
    let embed = new RichEmbed()
    .setColor("GREEN")
    .setAuthor(`${message.guild.name} - Modules`, message.guild.iconURL)
    .setTimestamp()
    .setDescription(`**Command Usage:** \`!!module <module>\`    \n**Usage Example:** \`!!module moderation\`\n\n**Fun Module:** \`${funmodule}\`\n**Moderation Module:** \`${moderationmodule}\``)
    if(!args[0]) return message.channel.send(embed)
  }
}