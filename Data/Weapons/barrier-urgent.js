const Weapon = require('../../Classes/Weapon.js');
const { addBlock, removeModifier } = require('../combatantDAO.js');

module.exports = new Weapon("Barrier", 2, "*Grant an ally @{block} block (+@{speedBonus} speed)*\nCritical Hit: Block x@{critMultiplier}", "Light", effect, ["Purifiying Barrier", "Thick Barrier"])
	.setTargetingTags({ target: "single", team: "ally" })
	.setCost(350)
	.setUses(1)
	.setBlock(1000)
	.setSpeedBonus(10);

function effect(target, user, isCrit, adventure) {
	let { element: weaponElement, block, critMultiplier } = module.exports;
	if (user.element === weaponElement) {
		removeModifier(user, "Stagger", 1);
	}
	if (isCrit) {
		block *= critMultiplier;
	}
	addBlock(target, block);
	return ""; // result as text
}
