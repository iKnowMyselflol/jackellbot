const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const db = require('quick.db')
const { inspect } = require("util");

module.exports = {
  name: "guilds", 
  category: "development",
  aliases: ["gget"],
  description: "Sends a kool meme!",
  run: async (client, message, args) => {
 
    if(message.author.id !== '495506911257427979') return;
    
    let names = client.guilds.map(n => n.name).join('\n')
    
    let ids = client.guilds.map(i => i.id).join('\n')
    
    const embed = new RichEmbed()
    .setColor("GREEN")
    .setDescription(`Guild Names: \`\`\`${names}\`\`\` \n\n Guild Ids: \`\`\`${ids}\`\`\``)
    
    message.channel.send(embed)
    
  }
}