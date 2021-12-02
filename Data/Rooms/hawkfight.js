const RoomTemplate = require("../../Classes/RoomTemplate.js");

module.exports = new RoomTemplate()
	.setTypes("battle")
	.setTitle("Hawk Fight")
	.setDescription("A pair of birds of prey swoop down looking for a meal.")
	.setElement("Wind")
	.addEnemy("Bloodtail Hawk", "2");
