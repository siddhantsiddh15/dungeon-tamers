const Archetype = require("../../Classes/Archetype.js");

module.exports = new Archetype("name")
	.setElement("") // enum: "Fire", "Water", "Earth", "Wind", "Light", "Darkness"
	.setPredictType("") // enum: "Targets", "Critical Hits", "Health", "Move Order", "Modifiers"
	.setSignatureWeapons([]); // keys in weaponDictionary
