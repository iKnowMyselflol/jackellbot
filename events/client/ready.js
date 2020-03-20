module.exports = async client => {
  
  console.log(`Hi, ${client.user.username} is now online!`);

  let interval = setInterval(function() {
    client.user.setPresence({
      game: {
        name: `${client.users.size} users | ${client.guilds.size} guilds`,
        type: "WATCHING"
      }
    });
  }, 25000);
};