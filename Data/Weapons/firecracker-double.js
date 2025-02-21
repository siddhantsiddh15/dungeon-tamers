const Weapon = require('../../Classes/Weapon.js');
const { dealDamage, addModifier } = require('../combatantDAO.js');

module.exports = new Weapon("Double Firecracker", 2, "*Strike 6 random foes for @{damage} @{element} damage*\nCritical Hit: Damage x@{critMultiplier}", "Fire", effect, ["Mercurial Firecracker", "Toxic Firecracker"])
	.setTargetingTags({ target: "random-6", team: "enemy" })
	.setCost(350)
	.setUses(5)
	.setCritMultiplier(2)
	.setDamage(50);

function effect(target, user, isCrit, adventure) {
	let { element: weaponElement, damage, critMultiplier } = module.exports;
	if (user.element === weaponElement) {
		addModifier(target, "Stagger", 1);
	}
	if (isCrit) {
		damage *= critMultiplier;
	}
	return dealDamage(target, user, damage, weaponElement, adventure);
}
