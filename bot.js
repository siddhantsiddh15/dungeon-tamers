//#region Imports
const { Client } = require("discord.js");
const fs = require("fs");
const versionData = require('./Config/versionData.json');
const { commandDictionary, slashData } = require(`./Data/Commands/_commandDictionary.js`);
const { selectDictionary } = require("./Data/Selects/_selectDictionary.js");
const { buttonDictionary } = require("./Data/Buttons/_buttonDictionary.js");
const { loadPlayers } = require("./Data/playerDAO.js");
const { guildSetup, getPremiumUsers, ensuredPathSave } = require("./helpers.js");
const { loadGuilds } = require("./Data/guildDAO.js");
const { loadAdventures } = require("./Data/adventureDAO.js");
//#endregion

//#region Executing Code
const client = new Client({
	retryLimit: 5,
	presence: {
		activities: [{
			name: "/tutorial",
			type: "LISTENING"
		}]
	},
	intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
});

loadGuilds().then(() => {
	loadAdventures().then(() => {
		loadPlayers().then(() => {
			client.login(require("./Config/auth.json").token);
		});
	})
})
//#endregion

//#region Event Handlers
client.on("ready", () => {
	console.log(`Connected as ${client.user.tag}`);
	// Delete Completed Adventure Channels
	new Promise((resolve, reject) => {
		if (fs.existsSync("./Saves/completedAdventures.json")) {
			var completedAdventures = require("./Saves/completedAdventures.json");
			Object.keys(completedAdventures).forEach(channelId => {
				client.guilds.fetch(completedAdventures[channelId]).then(guild => { //BUG #26 crash if completed adventure channel deleted while bot is down
					guild.channels.fetch(channelId).then(channel => {
						channel.delete("adventure completed");
					}).catch(console.error);
				})
			})
		}
		resolve();
	}).then(() => {
		ensuredPathSave("./Saves", "completedAdventures.json", "{}");
	})

	//TODO #2 upload slash commands gloabally
	//TODO #3 post version notes
})

client.on("interactionCreate", interaction => {
	if (interaction.inGuild()) {
		if (interaction.isCommand()) {
			var command = commandDictionary[interaction.commandName];
			if (!command.premiumCommand || !getPremiumUsers().includes(interaction.user.id)) {
				if (!command.managerCommand || !interaction.member.manageable) {
					command.execute(interaction);
				} else {
					interaction.reply(`The \`/${interaction.commandName}\` command is restricted to bot managers (users with permissions above the bot).`)
						.catch(console.error);
				}
			} else {
				interaction.reply(`The \`/${interaction.commandName}\` command is a premium command. Use \`/premium\` for more information.`)
					.catch(console.error);
			}
		} else if (interaction.isButton()) {
			var args = interaction.customId.split("-");
			buttonDictionary[args[0]].execute(interaction, args);
		} else if (interaction.isSelectMenu()) {
			let args = interaction.customId.split("-");
			let command = args.shift();
			args = args.concat(interaction.values[0].split("-"));
			selectDictionary[command].execute(interaction, args);
		}
	} else {
		interaction.reply({ content: "Direct message commands are not supported at this time.", ephemeral: true })
			.catch(console.error);
	}
})

client.on("guildCreate", guild => {
	guildSetup(guild);
})
//#endregion
