const { fetchBattleMetrics } = require("../utils/fetchUtil");

module.exports = async (
  message,
  query,
  serverSearchResults,
  selectedServers
) => {
  if (!query) {
    return message.reply(
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

      message.reply(`Server "${server.name}" has been selected.`);
      selectedServers[message.channel.id] = serverId;
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
        return message.reply("No servers found with that name.");
      } else if (servers.length === 1) {
        message.reply(`Server "${servers[0].name}" has been selected.`);
        serverSearchResults[message.channel.id] = [servers[0]];
      } else {
        serverSearchResults[message.channel.id] = servers;
        const serverList = servers
          .map((s, i) => `${i + 1}. ${s.name}`)
          .join("\n");
        message.reply(
          `Multiple servers found:\n${serverList}\n\nUse \`!select <number>\` to select.`
        );
      }
    }
  } catch (error) {
    console.error("Error searching servers:", error);
    message.reply("An error occurred while searching for servers.");
  }
};
