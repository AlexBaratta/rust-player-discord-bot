const { serverSearchResults, selectedServers } = require("../cache");

module.exports = async (interaction) => {
  console.log("Interaction", interaction.options);
  try {
    const i = interaction.options.getInteger("number") - 1; // offset 
    console.log(i);
    const servers = serverSearchResults[interaction.channelId];
    console.log("ServerSearchRes", serverSearchResults);
    console.log("Servers", servers);

    if (!servers || !servers[i]) {
      return interaction.reply("Invalid selection. Please try again.");
    }

    const selectedServer = servers[i];
    selectedServers[interaction.channel.id] = selectedServer.id;
    interaction.reply(`Server "${selectedServer.name}" has been selected.`);
  } catch (e) {
    interaction.reply("Error ", e);
  }
};
