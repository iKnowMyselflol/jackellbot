const { RichEmbed } = require('discord.js');
const ms = require('ms');
const db = require('quick.db');

module.exports = {
  name: "tempmute",
  aliases: ["tempm"],
  category: "moderation",
  description: "Temp mutes a user.",
  run: async (client, message, args) => {
   
    
    const devmode = db.get("devmode")
    if(devmode === "enabled") return message.channel.send("The bot is in maintenance right now. Please check again later!")
    
    const mod = db.get(`mmodule_${message.guild.id}`)
    if(mod == 'disabled') return;   
    
    const tEmbed = new RichEmbed()
    .setColor("BLUE")
    .setTitle("Command: !!tempmute")
    .setDescription("**Aliases:** tempm\n**Usage:** !!tempmute <@user> <time>")
    
   //variables
    
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(tEmbed)
  if(tomute.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You don't have permission to mute them.")
  let muterole = message.guild.roles.find(`name`, "Muted")
  //creatrole start
  if(!muterole){
    try {
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#513f48",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermission(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        })
      })
    }catch(e){
      console.log(e.stack)
    }
  }
   //create role end 
    
    
    
    //mutetime 
    
    let mutetime = args[1];
    if(!mutetime) return message.channel.send("You didn't specify any time!");
    
    await(tomute.addRole(muterole.id));
    
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
    
    setTimeout(function(){
      tomute.removeRole(muterole.id)
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
    
   //end of module 
  }
}