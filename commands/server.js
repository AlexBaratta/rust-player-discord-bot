const { fetchBattleMetrics } = require('../utils/fetchUtil');

module.exports = async (message, query, serverSearchResults) => {
  if (!query) {
    return message.reply('Please provide a server name. Usage: `!server <name>`');
  }

  try {
    const data = await fetchBattleMetrics(`/servers?filter[search]=${encodeURIComponent(query)}&filter[game]=rust`);
    const servers = data.data.map((server) => ({
      id: server.id,
      name: server.attributes.name,
    }));

    if (servers.length === 0) {
      return message.reply('No servers found with that name.');
    } else if (servers.length === 1) {
      message.reply(`Server "${servers[0].name}" has been selected.`);
    } else {
      serverSearchResults[message.channel.id] = servers;
      const serverList = servers.map((s, i) => `${i + 1}. ${s.name}`).join('\n');
      message.reply(`Multiple servers found:\n${serverList}\n\nUse \`!select <number>\` to select.`);
    }
  } catch (error) {
    console.error('Error searching servers:', error);
    message.reply('An error occurred while searching for servers.');
  }
};
