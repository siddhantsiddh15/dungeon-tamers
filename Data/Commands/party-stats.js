const Command = require('../../Classes/Command.js');
const { MessageEmbed } = require('discord.js');
const { getAdventure } = require('../adventureDAO.js');

module.exports = new Command("party-stats", "Get info about the current adventure", false, false);

module.exports.execute = (interaction) => {
	// Show user the party stats
	let adventure = getAdventure(interaction.channel.id);
	if (adventure) {
		let embed = new MessageEmbed()
			.setTitle("Party Stats")
			.setDescription(`${adventure.name} - Depth: ${adventure.depth}`)
			.addField(`${adventure.lives} Lives Remain`, "When a player runs out of HP, a life will be lost and they'll be returned to max HP. When all lives are lost, the adventure will end.")
			.addField(`${adventure.gold} Gold`, "Gold is exchanged for goods and services within adventures. Gold *will be lost when an adventure ends*.")
			.addField("Scouting", `Final Boss: ${adventure.scouting.finalBoss ? adventure.finalBoss : "???"}\nArtifact Guardians (${adventure.scouting.artifactGuardiansEncountered} encountered so far): ${adventure.artifactGuardians.slice(0, adventure.scouting.artifactGuardians).map((encounter, index) => {
				if (adventure.scouting.artifactGuardiansEncountered === index) {
					return `**${encounter}**`;
				} else {
					return encounter;
				}
			}).join(", ")}...`)
			//TODO list difficulty options
			.setFooter({ text: "Imaginary Horizons Productions", iconURL: "https://cdn.discordapp.com/icons/353575133157392385/c78041f52e8d6af98fb16b8eb55b849a.png" });
		interaction.reply({ embeds: [embed], ephemeral: true })
			.catch(console.error);
	} else {
		interaction.reply({ content: "This channel doesn't appear to be an adventure's thread.", ephemeral: true });
	}
}