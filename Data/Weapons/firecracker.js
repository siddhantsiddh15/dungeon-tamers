const Weapon = require('../../Classes/Weapon.js');
const { takeDamage } = require('../combatantDAO.js');

module.exports = new Weapon("firecracker", "A damaging explosion that hits a random enemy (crit: more damage)", "fire", effect)
	.setTargetingTags({ target: "random", team: "enemy" }) // tagObject {target: ["single", "all", "random", "self"], team: ["ally", "enemy", "any"]}
	.setUses(5);

function effect(target, user, isCrit, element, adventure) {
	let damage = 125;
	if (user.element === element) {
		damage *= 1.5;
	}
	if (isCrit) {
		damage *= 2;
	}
	return takeDamage(target, damage, element, adventure);
}