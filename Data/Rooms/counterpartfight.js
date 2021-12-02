const RoomTemplate = require("../../Classes/RoomTemplate.js")

module.exports = new RoomTemplate()
	.setTypes("finalboss")
	.setTitle("Hall of Mirrors")
	.setDescription("A long hall of wavy mirrors sits silently between the party and the door... until a bunch of shadows step out of the mirror and attack the party!")
	.setElement("Darkness")
	.addEnemy("@{clone}", "n");
