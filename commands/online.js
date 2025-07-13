const { fetchBattleMetrics } = require("../utils/fetchUtil");
const { selectedServers } = require("../cache");

module.exports = async (interaction) => {
  const serverId = selectedServers[interaction.channelId];
  const playerName = interaction.options.getString("player");
  console.log("playername", playerName);

  if (!serverId) {
    return interaction.reply("Please select a server first.");
  }

  try {
    const data = await fetchBattleMetrics(
      `/players?filter[servers]=${serverId}&filter[search]=${playerName}&filter[online]=true`
    );

    if (data.data.length === 0) {
      await interaction.reply(`${playerName} is not online.`);
    } else {
      const matchingPlayers = data.data.map((player) => player.attributes.name);
      await interaction.reply(`Online users: ${matchingPlayers.join(", ")}`);
    }
  } catch (error) {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(
        "An error occurred while checking player status."
      );
    } else {
      await interaction.reply(
        "An error occurred while checking player status."
      );
    }
  }
};
