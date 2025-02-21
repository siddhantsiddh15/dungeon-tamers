const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Button = require('../../Classes/Button.js');
const { getWeaponProperty } = require('../Weapons/_weaponDictionary.js');
const { getAdventure } = require("./../adventureDAO.js");

module.exports = new Button("upgrade");

module.exports.execute = (interaction, args) => {
	// Present the user with an opportunity to upgrade a weapon
	let adventure = getAdventure(interaction.channel.id);
	let user = adventure.delvers.find(delver => delver.id === interaction.user.id);
	if (user) {
		let weaponOptions = [];
		user.weapons.forEach((weapon, index) => {
			let upgrades = getWeaponProperty(weapon.name, "upgrades");
			if (upgrades.length > 0) {
				weaponOptions.push({
					label: weapon.name,
					description: `Results: ${upgrades.join(", ")}`,
					value: `${weapon.name}-${index}`
				})
			}
		})
		if (adventure.room.loot.forgeSupplies > 0) {
			if (weaponOptions.length > 0) {
				let upgradeSelect = new MessageActionRow().addComponents(
					new MessageSelectMenu().setCustomId(`randomupgrade-${interaction.message.id}`)
						.setPlaceholder("Pick a weapon to randomly tinker with...")
						.setOptions(weaponOptions)
				)
				interaction.reply({ content: `You can pick a weapon to tinker with, but you're not sure what you'll get:`, components: [upgradeSelect], ephemeral: true });
			} else {
				interaction.reply({ content: "You don't have any weapons that can be tinkered with.", ephemeral: true });
			}
		} else {
			interaction.reply({ content: "The forge's supplies have been exhausted.", ephemeral: true });
		}
	} else {
		interaction.reply({ content: "Please tinker with weapons in adventures you've joined.", ephemeral: true });
	}
}
