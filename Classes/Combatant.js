module.exports = class Combatant {
	constructor() { }
	name = "Placeholder";
	team = "";
	hp = 10;
	maxHp = 30;
	block = 0;
	speed = 10;
	roundSpeed = 0;
	crit = false;
	element = "water";

	setHp(integer) {
		this.hp = integer;
		this.maxHp = integer;
		return this;
	}

	addBlock(integer) {
		this.block = integer;
		return this;
	}

	clearBlock() {
		this.block = 0;
		return this;
	}

	setSpeed(integer) {
		this.speed = integer;
		return this;
	}

	setElement(elementInput) {
		this.element = elementInput;
		return this;
	}

	static getWeaknesses(element) {
		switch (element) {
			case "light":
				return ["fire", "earth"];
			case "dark":
				return ["wind", "water"];
			case "fire":
				return ["earth", "dark"];
			case "water":
				return ["wind", "light"];
			case "earth":
				return ["water", "dark"];
			case "wind":
				return ["light", "fire"];
			default:
				return ["none"];
		}
	}

	static getResistances(element) {
		switch (element) {
			case "light":
				return ["wind", "water"];
			case "dark":
				return ["earth", "fire"];
			case "fire":
				return ["light", "wind"];
			case "water":
				return ["dark", "earth"];
			case "earth":
				return ["fire", "light"];
			case "wind":
				return ["water", "dark"];
			default:
				return ["none"];
		}
	}
}