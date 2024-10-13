module.exports = async (message, index, serverSearchResults, selectedServers) => {
    const servers = serverSearchResults[message.channel.id];
    const selectedIndex = parseInt(index) - 1;
  
    if (!servers || !servers[selectedIndex]) {
      return message.reply('Invalid selection. Please try again.');
    }
  
    const selectedServer = servers[selectedIndex];
    selectedServers[message.channel.id] = selectedServer.id;
    message.reply(`Server "${selectedServer.name}" has been selected.`);
  };
  