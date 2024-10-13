const { fetchBattleMetrics } = require('../utils/fetchUtil');

module.exports = async (message, selectedServers) => {
  const serverId = selectedServers[message.channel.id];

  if (!serverId) {
    return message.reply('Please select a server first.');
  }

  try {
    const data = await fetchBattleMetrics(`/players?filter[servers]=${serverId}&filter[online]=true&page[size]=100`);
    const players = data.data.map((p) => p.attributes.name).join('\n');

    if (players.length > 1990) {
      return message.reply('Player list too long to display.');
    }

    message.channel.send(`\`\`\`\n${players}\n\`\`\``);
  } catch (error) {
    console.error('Error fetching player list:', error);
    message.reply('An error occurred while fetching the player list.');
  }
};
