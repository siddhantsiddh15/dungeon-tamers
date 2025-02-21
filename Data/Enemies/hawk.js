const Enemy = require("../../Classes/Enemy.js");
const { dealDamage, addModifier } = require("../combatantDAO.js");
const { selectRandomFoe, nextRepeat } = require("../enemyDAO.js");

module.exports = new Enemy("Bloodtail Hawk")
	.setHp(200)
	.setSpeed(105)
	.setElement("Wind")
	.setStaggerThreshold(1)
	.setFirstAction("Rake")
	.addAction({ name: "Rake", effect: rakeEffect, selector: selectRandomFoe, next: nextRepeat })
	.setBounty(25);

function rakeEffect(target, user, isCrit, adventure) {
	let damage = 50;
	if (isCrit) {
		damage *= 2;
	}
	addModifier(target, "Stagger", 1);
	return dealDamage(target, user, damage, user.element, adventure);
}
