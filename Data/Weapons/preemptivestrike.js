const Weapon = require('../../Classes/Weapon.js');
const { takeDamage, addBlock } = require('../combatantDAO.js');

module.exports = new Weapon("preemptivestrike", "Deal more damage if the target has lower speed than you (crit: gain block)", "water", effect)
	.setTargetingTags({ target: "single", team: "enemy" })
	.setUses(10);

function effect(target, user, isCrit, element, adventure) {
	let damage = 50;
	let block = 0;
	if (target.speed + target.roundSpeed < user.speed + user.roundSpeed) {
		damage += 100;
	}
	if (user.element === element) {
		damage *= 1.5;
	}
	if (isCrit) {
		block += 75;
	}
	addBlock(user, block);
	return takeDamage(target, damage, element, adventure);
}