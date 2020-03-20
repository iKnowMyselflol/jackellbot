const { RichEmbed } = require('discord.js')

module.exports = {
  name: "help",
  category: "moderation",
  description: "Says your the input you give and sends it via the bot.",
  usage: "say <input>",
  run: async (client, message, args) => {
    
      let hEmbed = new RichEmbed()
        .setColor("#ffff00")
        .setTitle("Help/Documentation")
        .setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL)
        .setDescription(`Staff Command:\n\`!!say <embed> [text]\n!!shift\n!!training\n!!purge <amount>\n!!kick <user> <reason>\n!!ban <user> <reason>\n!!softban <user> <reason>\n!!mute <user>\n!!tempmute <user> <time(s/h/d)>\n!!unmute <user>\``)
        .setTimestamp()
        .setFooter(`Help`, client.user.displayAvatarURL);
      message.channel.send({embed: hEmbed})
  
    
    
  }
}