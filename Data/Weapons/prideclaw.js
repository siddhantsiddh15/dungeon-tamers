const Weapon = require('../../Classes/Weapon.js');
const { dealDamage } = require('../combatantDAO.js');

module.exports = new Weapon("prideclaw", "Deal a large amount of damage that won't strike elemental weakness (crit: more damage)", "element", effect, [])
	.setTargetingTags({ target: "single", team: "enemy" })
	.setUses(10);

function effect(target, user, isCrit, element, adventure) {
	let damage = 150;
	if (user.element === element) {
		damage *= 1.5;
	}
	if (isCrit) {
		damage *= 2;
	}
	return dealDamage(target, user, damage, "untyped", adventure);
}
