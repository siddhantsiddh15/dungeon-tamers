const Weapon = require('../../Classes/Weapon.js');

module.exports = new Weapon("Spell: Heavy Blood Aegis", 2, "*Pay @{hpCost} hp to grant an ally @{block} block*\nCritical Hit: Block x@{critMultiplier}", "Darkness", effect, ["Spell: Charging Blood Aegis", "Spell: Sweeping Blood Aegis"])
	.setTargetingTags({ target: "single", team: "ally" })
	.setCost(350)
	.setUses(10)
	.setHpCost(25)
	.setBlock(250);

function effect(target, user, isCrit, adventure) {
	let { element: weaponElement, block, critMultiplier, hpCost } = module.exports;
	if (user.element === weaponElement) {
		removeModifier(target, "Stagger", 1);
	}
	if (isCrit) {
		block *= critMultiplier;
	}
	addBlock(target, block);
	return dealDamage(user, null, hpCost, "untyped", adventure); // user pays health
}
