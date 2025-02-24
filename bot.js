require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Import your existing command modules
const searchServer = require('./commands/server');
const selectServer = require('./commands/select');
const serverPop = require('./commands/pop');
const isOnline = require('./commands/offline');
const playerList = require('./commands/players');
const helpCommand = require('./commands/help');

// Create a new client instance with the required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// In-memory storage for your command data
const selectedServers = {}; // { 'channel_id': 'server_id' }
const serverSearchResults = {}; // { 'channel_id': [{ id, name }, ...] }

// const TOKEN = process.env.DISCORD_TOKEN;
const TOKEN = process.env.DISCORD_TOKEN_DEV;


client.login(TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Traditional prefix-based commands (e.g., !server, !select, etc.)
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith('!')) return;

  const [command, ...args] = message.content.trim().split(/\s+/);

  switch (command) {
    case '!server':
      await searchServer(message, args.join(' '), serverSearchResults, selectedServers);
      break;
    case '!select':
      await selectServer(message, args[0], serverSearchResults, selectedServers);
      break;
    case '!pop':
      await serverPop(message, selectedServers);
      break;
    case '!online':
      await isOnline(message, args.join(' '), selectedServers);
      break;
    case '!list':
      await playerList(message, selectedServers);
      break;
    case '!help':
      await helpCommand(message);
      break;
    default:
      message.reply('Unknown command. Use `!help` for a list of commands.');
      break;
  }
});

// Slash command handling for application commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Example slash command: /ping
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});
