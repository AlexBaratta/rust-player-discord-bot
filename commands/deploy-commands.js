require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID; 
const GUILD_ID = process.env.GUILD_ID; 

const commands = [
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Search for Rust servers by name')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Server name')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('select')
    .setDescription('Select a server from search results')
    .addIntegerOption(option =>
      option.setName('number')
        .setDescription('Server number from search results')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('pop')
    .setDescription('Get the current population of the selected server'),
  new SlashCommandBuilder()
    .setName('online')
    .setDescription('Check if a player is online on the selected server')
    .addStringOption(option =>
      option.setName('player')
        .setDescription('Player name')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('list')
    .setDescription('Display the full list of online players on the selected server'),
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display the list of available commands')
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands.map(cmd => cmd.toJSON()) }
    );
    console.log('Slash commands registered successfully.');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
})();
