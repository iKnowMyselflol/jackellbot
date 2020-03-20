const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require('quick.db');

module.exports = {
  name: "kick",
  catergory: "Moderation",
  usage: "!!kick <@user>/<userid> <reason>",
  run: async (client, message, args) => {
    
    const devmode = db.get("devmode")
    if(devmode === "enabled") return message.channel.send("The bot is in maintenance right now. Please check again later!")
    
    const tEmbed = new RichEmbed()
      .setColor("BLUE")
      .setTitle("Command: !!kick")
      .setDescription("**Aliases:** None\n**Usage:** !!kick <@user> <reason>");

    if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You don't have the following permission: ` KICK_MEMBERS `"
      );

    let kickMember =
      message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.member(args[0]);
    if (!kickMember) return message.channel.send(tEmbed);

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "I dont have the following permission: ` KICK_MEMBERS `"
      );

    kickMember
      .send(
        `Hello! You have been kicked from ${message.guild.name} for: ${reason}`
      )
      .then(() => {
        kickMember.kick().catch(err => console.log(err));
      });


    let sChannel = message.guild.channels.find(c => c.name === "Modlogs");
  }
};
