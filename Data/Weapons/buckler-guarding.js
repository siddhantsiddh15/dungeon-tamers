const Weapon = require('../../Classes/Weapon.js');
const { addBlock, removeModifier } = require('../combatantDAO.js');

module.exports = new Weapon("Guarding Buckler", 2, "*Grant @{block} block to an ally and yourself*\nCritical Hit: Block x@{critMultiplier}", "Earth", effect, ["Heavy Buckler", "Urgent Buckler"])
	.setTargetingTags({ target: "single", team: "ally" })
	.setCost(350)
	.setUses(10)
	.setBlock(75);

function effect(target, user, isCrit, adventure) {
	let { element: weaponElement, block, critMultiplier } = module.exports;
	if (user.element === weaponElement) {
		removeModifier(user, "Stagger", 1);
		removeModifier(target, "Stagger", 1);
	}
	if (isCrit) {
		block *= critMultiplier;
	}
	addBlock(target, block);
	addBlock(user, block);
	return "";
}
