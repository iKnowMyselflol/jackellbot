const db = require('quick.db');

module.exports = {
  name: "clear",
  aliases: ["purge", "p"],
  category: "moderation",
  description: "Purges an amount of messages.",
  run: async (client, message, args) => {
    
    const done = "\<:done:685790820854399004>"
    const x = "\<:x:685790834893127691>"
    
    const devmode = db.get("devmode")
    if(devmode === "enabled") return message.channel.send(x + " The bot is in maintenance right now. Please check again later!")
    
    const mod = db.get(`mmodule_${message.guild.id}`)
    if(mod == 'disabled') return;
  
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(x + " Sorry, you do not have permissions to use that command!").then(m => m.delete(10000));
    }
    
    if (isNaN(args[0]) || Number(args[0]) <= 0) {
      return message.channel.send(x + " I can't purge 0 messages.").then(m => m.delete(10000));
    }
    
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(x + " I don't have permission to delete messages.").then(m => m.delete(10000));
    }
    
    let amount;
    
    if(Number(args[0]) > 100) {
      amount = 100;
    } else {
      amount = Number(args[0]);
    }
    
    if (message.deletable) {
    await message.delete();
    }
    
    await message.channel.bulkDelete(amount, true)
      .then(deleted => message.channel.send(`${done} I deleted \`${deleted.size}\``))
      .then(m => m.delete(5000))
      .catch(err => message.channel.send(`Something went wrong... ${err}`));
  }
}