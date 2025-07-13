const { fetchBattleMetrics } = require("../utils/fetchUtil");

module.exports = async (interaction, serverSearchResults, selectedServers) => {
  const query = interaction.options.getString("name");
  console.log("query", query);
  if (!query) {
    return interaction.reply(
      "Please provide a server name or URL. Usage: `!server <name|URL>`"
    );
  }

  try {
    let servers;

    if (query.startsWith("https://www.battlemetrics.com/servers/rust/")) {
      const serverId = query.split("/").pop();

      const data = await fetchBattleMetrics(`/servers/${serverId}`);
      const server = {
        id: data.data.id,
        name: data.data.attributes.name,
      };

      interaction.reply(`Server "${server.name}" has been selected.`);
      selectedServers[interaction.channel.id] = serverId;
      // serverSearchResults[message.channel.id] = [server];
      return;
    } else {
      const data = await fetchBattleMetrics(
        `/servers?filter[search]=${encodeURIComponent(query)}&filter[game]=rust`
      );
      servers = data.data.map((server) => ({
        id: server.id,
        name: server.attributes.name,
      }));

      if (servers.length === 0) {
        return interaction.reply("No servers found with that name.");
      } else if (servers.length === 1) {
        interaction.reply(`Server "${servers[0].name}" has been selected.`);
        serverSearchResults[interaction.channel.id] = [servers[0]];
      } else {
        serverSearchResults[interaction.channel.id] = servers;
        const serverList = servers
          .map((s, i) => `${i + 1}. ${s.name}`)
          .join("\n");
        interaction.reply(
          `Multiple servers found:\n${serverList}\n\nUse \`!select <number>\` to select.`
        );
      }
    }
  } catch (error) {
    console.error("Error searching servers:", error);
    interaction.reply("An error occurred while searching for servers.");
  }
};
