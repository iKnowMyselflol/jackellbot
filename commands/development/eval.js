const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const { inspect } = require("util");

module.exports = {
  name: "eval", 
  category: "development",
  aliases: ["e"],
  description: "Sends a kool meme!",
  run: async (client, message, args) => {

// Put your userID here
          if (message.author.id !== '495506911257427979') return;
          try {
            console.log(args.join(' '));
            let evaled = await eval(args.join(' '));
            message.channel.send("`" + inspect(evaled) + "`");
          }
          catch (err) {
            function CatchError(err, message) {
                message.channel.send("**Error** \`\`\`" + err + "\`\`\`");
            }
            CatchError(err, message);
          }
        }
}
