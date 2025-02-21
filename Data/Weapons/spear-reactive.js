const Weapon = require('../../Classes/Weapon.js');
const { dealDamage, addModifier, calculateTotalSpeed } = require("../combatantDAO.js");

module.exports = new Weapon("Reactive Spear", 2, "*Strike a foe for @{damage} (+@{bonusDamage} if foe went first) @{element} damage*\nCritical Hit: Inflict 1 Stagger", "Light", effect, ["Lethal Spear", "Sweeping Spear"])
	.setTargetingTags({ target: "single", team: "enemy" })
	.setCost(350)
	.setUses(10)
	.setDamage(100)
	.setBonusDamage(75);

function effect(target, user, isCrit, adventure) {
	let { element: weaponElement, damage, bonusDamage } = module.exports;
	if (calculateTotalSpeed(target) > calculateTotalSpeed(user)) {
		damage += bonusDamage;
	}
	if (user.element === weaponElement) {
		addModifier(target, "Stagger", 1);
	}
	if (isCrit) {
		addModifier(target, "Stagger", 1);
	}
	return dealDamage(target, user, damage, weaponElement, adventure);
}
