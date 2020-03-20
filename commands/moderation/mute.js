const { Discord, RichEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "mute",
  description: "Mutes a member in the discord server!",
  usage: "!mute <@user> <reason>",
  run: async (bot, message, args) => {
    
    const devmode = db.get("devmode")
    if(devmode === "enabled") return message.channel.send("The bot is in maintenance right now. Please check again later!")
    
    const mod = db.get(`mmodule_${message.guild.id}`)
    if(mod == 'disabled') return;
    
    const tEmbed = new RichEmbed()
    .setColor("RANDOM")
    .setTitle("Command: !!mute")
    .setDescription("**Aliases:** None\n**Usage:** !!mute <@user> <reason>") 
    .setTimestamp()
    
   
    
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You are missing the permission: `MANAGE_ROLES`")
  
  if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I am missing the following permission: `MANAGE_ROLES`")
  
  let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mutee) return message.channel.send(tEmbed);
 
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason given"
  
  let muterole = message.guild.roles.find(r => r.name === "Muted")
  if(!muterole) {
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#513f48",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        })
      })
    } catch(e) {
    console.log(e.stack)
  }
    
  }
  
  
mutee.addRole(muterole.id).then(() => {
  mutee.send(`Hello, you have been muted in ${message.guild.name} for:  ${reason}`)
  message.channel.send(`${mutee.user.username} was successfully muted.`)
})
  
  let embed = new RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
  .addField("Moderation:", "Mute")
  .addField("Muted:", mutee.user.username)
  .addField("Moderator:", message.author.username)
  .addField("Date:", message.createdAt.toLocaleString())
  
  let sChannel = message.guild.channels.find(c => c.name === "modlogs")
  sChannel.send(embed)
    }

  } 