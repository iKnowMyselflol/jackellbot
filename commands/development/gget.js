const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const db = require('quick.db')
const { inspect } = require("util");

module.exports = {
  name: "ginfo", 
  category: "development",
  aliases: ["gget"],
  description: "Sends a kool meme!",
  run: async (client, message, args) => {
    
    if (message.author.id !== '495506911257427979') return;
    
    const sGuild = client.guilds.get(args[0])
    
    let large = sGuild.large ? "Yes" : "No"
    
    let code = sGuild.fetchVanityCode
    
    let uEmbed = new RichEmbed()
        .setColor("BLUE")
        .setTitle("**Server info**", sGuild.iconURL)
        .setAuthor(`${sGuild.name} info`, sGuild.iconURL)
        .setThumbnail(sGuild.iconURL)
        .addField("**Server Name:**", `${sGuild.name}`, true)
        .addField("**Server Owner:**", `${sGuild.owner}`, true)
        .addField("**Server OwnerID:**", sGuild.ownerID, true)
        .addField("**Member Count:**", `${sGuild.memberCount}`, true)
        .addField("**Large Server:**", `${large}`, true)
        .addField("**Verification Level:**", sGuild.verificationLevel, true)
        .addField("**Role Count:**", `${sGuild.roles.size}`, true)
        .addField("**Channel Count:**", sGuild.channels.size, true)
        .addField("**Server Invite:**", `https://discord.gg/${code}.join('\n')`)
        .setTimestamp()
    message.channel.send(uEmbed)
    
  }
}