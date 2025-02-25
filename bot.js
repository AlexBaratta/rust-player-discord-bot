require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const searchServer = require('./commands/server');
const selectServer = require('./commands/select');
const serverPop = require('./commands/pop');
const isOnline = require('./commands/offline');
const playerList = require('./commands/players');
const helpCommand = require('./commands/help');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const selectedServers = {}; // { 'channel_id': 'server_id' }
const serverSearchResults = {}; // { 'channel_id': [{ id, name }, ...] }

// const TOKEN = process.env.DISCORD_TOKEN;
const TOKEN = process.env.DISCORD_TOKEN_DEV;


client.login(TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case 'help':
      await helpCommand(interaction);
      break;
    default:
      await interaction.reply({ content: 'Unknown command.', ephemeral: true });
  }
});
