module.exports = async (interaction) => {
  const helpMessage = `
  **Available Commands:**
  \`/server <name>\` - Search for Rust servers by name.
  \`/select <number>\` - Select a server from search results.
  \`/pop\` - Get the current population of the selected server.
  \`/online <PLAYER_NAME>\` - Check if a player is online on the selected server.
  \`/list\` - Display the full list of online players on the selected server.
  \`/help\` - Display this help message.
  `;

  await interaction.reply(helpMessage);
};
