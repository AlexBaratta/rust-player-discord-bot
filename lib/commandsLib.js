const { SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Search for Rust servers by name")
    .addStringOption((option) =>
      option.setName("name").setDescription("Server name").setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("select")
    .setDescription("Select a server from search results")
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("Server number from search results")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("pop")
    .setDescription("Get the current population of the selected server"),
  new SlashCommandBuilder()
    .setName("online")
    .setDescription("Check if a player is online on the selected server")
    .addStringOption((option) =>
      option.setName("player").setDescription("Player name").setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("list")
    .setDescription(
      "Display the full list of online players on the selected server"
    ),
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Display the list of available commands"),
];

module.exports = { commands };
