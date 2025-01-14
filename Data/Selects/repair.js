const Select = require('../../Classes/Select.js');
const { getAdventure, setAdventure } = require('../adventureDAO.js');
const { decrementForgeSupplies } = require('../roomDAO.js');
const { getWeaponProperty } = require('../Weapons/_weaponDictionary.js');

module.exports = new Select("repair");

module.exports.execute = (interaction, [roomMessageId]) => {
	// Grant half the selected weapon's max uses
	let adventure = getAdventure(interaction.channel.id);
	if (adventure.room.loot.forgeSupplies > 0) {
		let user = adventure.delvers.find(delver => delver.id === interaction.user.id);
		let [weaponName, weaponIndex, value] = interaction.values[0].split("-");
		user.weapons[weaponIndex].uses += Number(value);
		decrementForgeSupplies(interaction, roomMessageId, adventure).then(() => {
			interaction.reply({ content: `Your ${weaponName} regained ${value} uses.`, ephemeral: true });
			setAdventure(adventure);
		});
	} else {
		interaction.reply({ content: "The forge's supplies have been exhausted.", ephemeral: true });
	}
}
