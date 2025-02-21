const Move = require('../../Classes/Move');
const Select = require('../../Classes/Select.js');
const { getAdventure, checkNextRound, updateRoundMessage, endRound, setAdventure } = require('../adventureDAO');
const { getWeaponProperty } = require('../Weapons/_weaponDictionary');
const { getFullName } = require("./../combatantDAO.js");

module.exports = new Select("weapon");

module.exports.execute = async function (interaction, [weaponName]) {
	// Add move object to adventure
	let adventure = getAdventure(interaction.channel.id);
	let user = adventure.delvers.find(delver => delver.id === interaction.user.id);
	if (weaponName === "Punch" || user.weapons.some(weapon => weapon.name === weaponName && weapon.uses > 0)) {
		// Add move to round list (overwrite exisiting readied move)
		let userIndex = adventure.delvers.findIndex(delver => delver.id === interaction.user.id);
		let [targetTeam, targetIndex] = interaction.values[0].split("-");
		user.actionSpeed = getWeaponProperty(weaponName, "speedBonus") || 0;
		let newMove = new Move()
			.setSpeed(user)
			.setIsCrit(user.crit)
			.setMoveName(weaponName)
			.setUser(user.team, userIndex)
			.addTarget(targetTeam, targetIndex);

		let overwritten = false;
		for (let i = 0; i < adventure.room.moves.length; i++) {
			let move = adventure.room.moves[i];
			if (move.userTeam === user.team && move.userIndex === userIndex) {
				await adventure.room.moves.splice(i, 1, newMove);
				overwritten = true;
				break;
			}
		}
		if (!overwritten) {
			await adventure.room.moves.push(newMove);
		}

		// Send confirmation text
		let target;
		if (targetTeam === "ally") {
			target = adventure.delvers[targetIndex];
		} else if (targetTeam === "enemy") {
			target = adventure.room.enemies[targetIndex];
		}
		interaction.reply(`${interaction.user} ${overwritten ? "switches to ready" : "readies"} **${weaponName}** to use on **${getFullName(target, adventure.room.enemyTitles)}**.`).then(() => {
			setAdventure(adventure);
			updateRoundMessage(interaction.channel.messages, adventure);
			if (checkNextRound(adventure)) {
				endRound(adventure, interaction.channel);
			}
		}).catch(console.error);
	} else {
		// Needed to prevent crashes in case users keep weapon menus around and uses one with a broken weapon
		interaction.reply({ content: `You don't have a ${weaponName} with uses remaining.`, ephemeral: true })
			.catch(console.error);
	}
}
