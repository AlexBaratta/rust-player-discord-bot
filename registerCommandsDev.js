require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const { commands } = require("./lib/commandsLib");

const TOKEN = process.env.DISCORD_TOKEN_DEV;
const CLIENT_ID = process.env.DEV_BOT_ID;
const GUILD_ID = process.env.DEV_SERVER_ID;

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering guild commands...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log("✅ Guild commands registered!");
  } catch (err) {
    console.error("❌ Error registering commands:", err);
  }
})();
