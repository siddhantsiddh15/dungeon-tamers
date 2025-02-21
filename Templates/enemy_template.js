const Enemy = require("../../Classes/Enemy.js");

module.exports = new Enemy("name")
	.setHp()
	.setSpeed()
	.setElement() // enum: "Fire", "Water", "Earth", "Wind", "Light", "Darkness", "@{adventure}", "@{adventureOpposite}"
	.setStaggerThreshold()
	.setFirstAction()
	.addAction() // {name: string, effect: function, selector: function, next: function}
	.setBounty();
