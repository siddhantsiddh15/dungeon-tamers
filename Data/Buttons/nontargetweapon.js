const Button = require('../../Classes/Button.js');
const Move = require('../../Classes/Move');
const { getAdventure, saveAdventures, checkNextRound, updateRoundMessage, nextRandomNumber } = require('../adventureDAO');
const { getFullName } = require("./../combatantDAO.js");

module.exports = new Button("nontargetweapon");

module.exports.execute = (interaction, args) => { //TODO #33 implement non-targeting moves
	// Add move object to adventure
	let adventure = getAdventure(interaction.channel.id);
	let user = adventure.delvers.find(delver => delver.id === interaction.user.id);
	let weaponIndex = args[0];
	let weapon;
	let confirmationText = "";
	if (parseInt(weaponIndex) < user.weapons.length) {
		weapon = user.weapons[weaponIndex];
		weapon.uses--;
		if (weapon.uses === 0) {
			user.weapons.splice(weaponIndex, 1);
			confirmationText += ` Your ${weapon.name} broke!`;
		}

		// Add move to round list (overwrite exisiting readied move)
		let userIndex = adventure.delvers.findIndex(delver => delver.id === interaction.user.id);
		let overwritten = false;
		let newMove = new Move()
			.setSpeed(user.speed)
			.setRoundSpeed(user.roundSpeed)
			.setElement(weapon.element)
			.setIsCrit(user.crit)
			.setMoveName(weapon.name)
			.setUser(user.team, userIndex)
			.setEffect(weapon.effect);

		let targetText = "";
		let targetTeam = weapon.targetingTags.team;
		if (weapon.targetingTags.target === "all") {
			let targetCount = 0;
			if (targetTeam === "ally") {
				targetCount = adventure.delvers.length;
				targetText = "all allies";
			} else if (targetTeam === "enemy") {
				targetCount = adventure.battleEnemies.length;
				targetText = "all enemies";
			}
			for (let i = 0; i < targetCount; i++) {
				newMove.addTarget(targetTeam, i);
			}
		} else if (weapon.targetingTags.target === "random") {
			if (targetTeam === "ally") {
				newMove.addTarget(targetTeam, nextRandomNumber(adventure, adventure.delvers.length, "battle"));
				targetText = "a random ally";
			} else if (targetTeam === "enemy") {
				newMove.addTarget(targetTeam, nextRandomNumber(adventure, adventure.battleEnemies.length, "battle"));
				targetText = "a random enemy";
			}
		}

		for (let i = 0; i < adventure.battleMoves.length; i++) {
			let move = adventure.battleMoves[i];
			if (move.userTeam === user.team && move.userIndex === userIndex) {
				adventure.battleMoves.splice(i, 1, newMove);
				overwritten = true;
				break;
			}
		}
		if (!overwritten) {
			adventure.battleMoves.push(newMove);
		}

		// Send confirmation text
		confirmationText = `Your plan to use **${weapon.name}** on **${targetText}** next round has been recorded.` + confirmationText;
		interaction.reply({ content: confirmationText, ephemeral: true })
			.catch(console.error);
		saveAdventures();
		updateRoundMessage(interaction.channel.messages, adventure);
		checkNextRound(adventure, interaction.channel);
	} else {
		interaction.reply({ content: `You don't have that weapon anymore.`, ephemeral: true })
			.catch(console.error);
	}
}
