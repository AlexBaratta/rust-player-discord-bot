const { fetchBattleMetrics } = require("../utils/fetchUtil");
const { selectedServers } = require("../cache");

module.exports = async (interaction) => {
  const serverId = selectedServers[interaction.channelId];

  if (!serverId) {
    return interaction.reply(
      "Please select a server first using `!server <name>`."
    );
  }

  try {
    const data = await fetchBattleMetrics(`/servers/${serverId}`);
    const { players, maxPlayers } = data.data.attributes;
    interaction.reply(`The server currently has ${players}/${maxPlayers} players.`);
  } catch (error) {s
    console.error("Error fetching server population:", error);
    interaction.reply("An error occurred while fetching the server population.");
  }
};
