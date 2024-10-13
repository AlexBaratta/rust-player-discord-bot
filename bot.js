require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const searchServer = require('./commands/server');
const selectServer = require('./commands/select');
const serverPop = require('./commands/pop');
const isOnline = require('./commands/offline');
const playerList = require('./commands/players');
const helpCommand = require('./commands/help');
// new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// in-memory storage
const selectedServers = {}; // { 'channel_id': 'server_id' }
const serverSearchResults = {}; // { 'channel_id': [{ id, name }, ...] }

const TOKEN = process.env.DISCORD_TOKEN;

client.login(TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith('!')) return; // ignore bot messages

  const [command, ...args] = message.content.trim().split(/\s+/);

  switch (command) {
    case '!server':
      await searchServer(message, args.join(' '), serverSearchResults);
      break;
    case '!select':
      await selectServer(message, args[0], serverSearchResults, selectedServers);
      break;
    case '!pop':
      await serverPop(message, selectedServers);
      break;
    case '!online':
      await isOnline(message, args[0], selectedServers);
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
