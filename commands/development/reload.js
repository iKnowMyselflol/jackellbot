const { config } = require("dotenv");

module.exports = {
  name: "restart",
  aliases: ["reboot", "start", "reload", "re"],
  category: "Development",
  description: "Restarts the bot!",
  usage: "!!restart",
  run: async (client, message, args) => {
  
  if (message.author.id !== '495506911257427979') return;
  message.channel.send('Restarted.').then(() => {
  //client.user.setPresence({
   //     game: {
     //       name: `the loading screen...`,
       //     type: "WATCHING"
       // }
   // })
  process.exit(1);
})
 }
}