const Weapon = require('../../Classes/Weapon.js');
const { addModifier } = require('../combatantDAO.js');

module.exports = new Weapon("Midas Staff", 1, "*Apply @{mod1Stacks} @{mod1} to a foe*\nCritical Hit: @{mod1} x@{critMultiplier}", "Water", effect, [])
	.setTargetingTags({ target: "single", team: "any" })
	.setModifiers([{ name: "Stagger", stacks: 1 }, { name: "Curse of Midas", stacks: 1 }, {name: "Curse of Midas", stacks: 2}])
	.setCost(200)
	.setUses(10);

function effect(target, user, isCrit, adventure) {
	let { element: weaponElement, modifiers: [elementStagger, curse, critCurse] } = module.exports;
	if (user.element === weaponElement) {
		addModifier(target, elementStagger);
	}
	if (isCrit) {
		addModifier(target, critCurse);
	} else {
		addModifier(target, curse);
	}
	return "";
}
