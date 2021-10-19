const { calculateTotalSpeed } = require("../Data/combatantDAO");

module.exports = class Move {
	constructor() {
		this.name = "";
		this.speed = 0;
		this.element = "";
		this.isCrit = false;
		this.userTeam = ""; //TODO convert to array to support joint/combo moves
		this.userIndex = "";
		this.targets = [];
	}

	setSpeed(combatant) {
		this.speed = calculateTotalSpeed(combatant);
		return this;
	}

	setElement(elementInput) {
		this.element = elementInput;
		return this;
	}

	setIsCrit(boolean) {
		this.isCrit = boolean;
		return this;
	}

	setMoveName(weaponNameInput) {
		this.name = weaponNameInput;
		return this;
	}

	setUser(team, index) {
		this.userTeam = team;
		this.userIndex = index;
		return this;
	}

	addTarget(team, index) {
		this.targets.push({ team: team, index: index });
		return this;
	}

	setEffect(effectFunction) {
		this.effect = effectFunction;
		return this;
	}
}
