const { fetchBattleMetrics } = require("../utils/fetchUtil");
const { selectedServers } = require("../cache");
module.exports = async (interaction) => {
  const serverId = selectedServers[interaction.channel.id];

  if (!serverId) {
    return interaction.reply("Please select a server first.");
  }

  try {
    const data = await fetchBattleMetrics(
      `/players?filter[servers]=${serverId}&filter[online]=true&page[size]=100`
    );
    const players = data.data.map((p) => p.attributes.name).join("\n");

    if (players.length > 1990) {
      return interaction.reply("Player list too long to display.");
    }

    interaction.channel.send(`\`\`\`\n${players}\n\`\`\``);
  } catch (error) {
    console.error("Error fetching player list:", error);
    interaction.reply("An error occurred while fetching the player list.");
  }
};
