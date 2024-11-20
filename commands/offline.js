const { fetchBattleMetrics } = require('../utils/fetchUtil');

module.exports = async (message, playerName, selectedServers) => {
  const serverId = selectedServers[message.channel.id];

  if (!serverId) {
    return message.reply('Please select a server first.');
  }

  try {
    const data = await fetchBattleMetrics(`/players?filter[servers]=${serverId}&filter[search]=${playerName}&filter[online]=true`);

    if (data.data.length === 0) {
      message.reply(`${playerName} is not online.`);
    } else {
      const matchingPlayers = data.data.map(player => player.attributes.name);
      message.reply(`Users: ${matchingPlayers.join(', ')}`);
    }
  } catch (error) {
    console.error('Error checking player status:', error);
    message.reply('An error occurred while checking player status.');
  }
};