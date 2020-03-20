const { RichEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Show's info about the server!",
  usage: "!!serverinfo",
  run: async (client, message, args) => {
  
    const done = "\<:done:685790820854399004>"
    const x = "\<:x:685790834893127691>"
    
    // Get stuff 
    // Embed(s)
    
      const tEmbed = new RichEmbed()
      .setColor("BLUE")
      .setTitle("Command: !!kick")
      .setDescription("**Aliases:** None\n**Usage:** !!kick <@user> <reason>");
    
    // Some stuff

    
    let kickMember =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    
    let reason = args.slice(1).join(" ");
    
    
    // If statements
    
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to use this command!")
    
    if(kickMember.id == message.author.id) return message.channel.send(`${x} Sorry, you cannot ban yourself!`)
    
    if(!kickMember.bannable) return message.channel.send(`${x} I cannot ban that user.`)
    
    if(!reason) reason = "No reason given!"
    
    // ban
    
    kickMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() => {
      message.guild.ban(kickMember, { days: 1, reason: reason}).catch(err => console.log(err))})
    
    message.channel.send(done + ` **${kickMember.user.tag}** has been banned!`)
    
  }
}
