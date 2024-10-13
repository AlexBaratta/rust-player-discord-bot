const { fetchBattleMetrics } = require('../utils/fetchUtil');

module.exports = async (message, selectedServers) => {
  const serverId = selectedServers[message.channel.id];

  if (!serverId) {
    return message.reply('Please select a server first using `!searchserver`.');
  }

  try {
    const data = await fetchBattleMetrics(`/servers/${serverId}`);
    const { players, maxPlayers } = data.data.attributes;
    message.reply(`The server currently has ${players}/${maxPlayers} players.`);
  } catch (error) {
    console.error('Error fetching server population:', error);
    message.reply('An error occurred while fetching the server population.');
  }
};
