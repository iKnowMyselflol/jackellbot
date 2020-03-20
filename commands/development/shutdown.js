const { config } = require("dotenv");

module.exports = {
  name: "shutdown",
  category: "Development",
  description: "Shuts down the bot!",
  usage: "!!shutdown",
  run: async (client, message, args) => {
  
  if (message.author.id !== '495506911257427979') return;
  message.channel.send('The bot is now offline.').then(() => {
    client.destroy();
})
    
 }
}