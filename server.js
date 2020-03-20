const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(202);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//Just some random code..

//Starts here

const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const Discord = require("discord.js");
const mongoose = require('mongoose')


const client = new Client

client.commands = new Collection();
client.aliases = new Collection();


client.on('ready', async () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  let interval = setInterval(function() {
    client.user.setPresence({
      game: {
        name: `${client.users.size} users | ${client.guilds.size} guilds`,
        type: "WATCHING"
      }
    });
  }, 25000);
})

config({
  path: __dirname + "/.env"
});

["command"].forEach(x => {
  require(`./handlers/${x}`)(client);
});

client.on('message', async message => {
  const prefix = "!!";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args);
  
  
})

client.login(process.env.TOKEN);
