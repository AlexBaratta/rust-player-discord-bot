require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const searchServer = require("./commands/server");
const selectServer = require("./commands/select");
const serverPop = require("./commands/pop");
const isOnline = require("./commands/offline");
const playerList = require("./commands/players");
const helpCommand = require("./commands/help");
const pop = require("./commands/pop");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// const TOKEN = process.env.DISCORD_TOKEN;
const TOKEN = process.env.DISCORD_TOKEN_DEV;

client.login(TOKEN);

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "help":
      await helpCommand(interaction);
      break;
    case "server":
      await searchServer(interaction);
      break;
    case "select":
      await selectServer(interaction);
      break;
    case "pop":
      await pop(interaction);
      break;
    case "list":
      await playerList(interaction);
      break;
    default:
      await interaction.reply({ content: "Unknown command.", ephemeral: true });
  }
});
