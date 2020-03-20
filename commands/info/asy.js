const { RichEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast", "announce"],
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
      
      
     let sChannel = message.guild.channels.find(c => c.id === "651339090104680478");   
      
    const devmode = db.get("devmode")
    if(devmode === "enabled") return message.channel.send("The bot is in maintenance right now. Please check again later!")
    
    const mod = db.get(`funmodule_${message.guild.id}`)
    if(mod == 'disabled') return;  
      
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.highestRole.hexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor('#FFFF00');

            sChannel.send(embed);
        } else {
            sChannel.send(args.join(" "));
        }
    }
}