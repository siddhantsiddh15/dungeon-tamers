// Represents a player's overall profile, including unlocked artifacts and archetypes and score
module.exports = class Player {
	constructor(idInput) {
		this.id = idInput;
		this.nextFreeRoll = Date.now(); //TODO #36 roll starting classes randomly
	}
	scores = {};
	artifacts = {};
	archetypes = { "Knight": 1, "Assassin": 1, "Chemist": 1, "Martial Artist": 1, "Hemomancer": 1 };
}
