const Enemy = require("../../Classes/Enemy.js");
const { addModifier, getFullName, dealDamage } = require("../combatantDAO.js");

module.exports = new Enemy("@{adventure} Slime")
	.setHp(200)
	.setSpeed(90)
	.setElement("@{adventure}")
	.setStaggerThreshold(5)
	.addAction({ name: "Tackle", weight: 1, effect: tackleEffect })
	.addAction({ name: "Goop Spray", weight: 1, effect: goopSprayEffect });

function tackleEffect(target, user, isCrit, element, adventure) {
	let damage = 25;
	if (isCrit) {
		damage *= 2;
	}
	addModifier(target, "Stagger", 1);
	return dealDamage(target, user, damage, element, adventure).then(damageText => {
		return damageText;
	});
}

function goopSprayEffect(target, user, isCrit, element, adventure) {
	if (isCrit) {
		addModifier(target, "Slow", 3);
		addModifier(target, "Stagger", 1);
	} else {
		addModifier(target, "Slow", 2);
	}
	return `${getFullName(target, adventure.room.enemyTitles)} is Slowed by the sticky ooze.`;
}