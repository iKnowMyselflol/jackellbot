module.exports = {
  name: "ping",
  aliases: ["bc", "broadcast"],
  category: "moderation",
  description: "Says your the input you give and sends it via the bot.",
  usage: "say <input>",
  run: async (client, message, args) => {
const msg = await message.channel.send(`🏓 Pinging...`)
    


    msg.edit(`🏓 Pong!\nLatency is \`${Math.floor(msg.createdAt - message.createdAt)}\` ms\nAPI Latency \`${Math.round(client.ping)}\` ms`)
  }
}