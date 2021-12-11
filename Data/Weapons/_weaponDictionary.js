const { generateRandomNumber } = require("../../helpers");

var weaponWhitelist = [
	"-punch.js",
	"barrier-base.js",
	"barrier-purifying.js",
	"barrier-thick.js",
	"barrier-urgent.js",
	"battleaxe-base.js",
	"battleaxe-prideful.js",
	"battleaxe-thick.js",
	"battleaxe-thirsting.js",
	"bloodaegis-base.js",
	"bloodaegis-charging.js",
	"bloodaegis-heavy.js",
	"bloodaegis-sweeping.js",
	"bow-base.js",
	"bow-evasive.js",
	"bow-hunters.js",
	"bow-mercurial.js",
	"buckler-base.js",
	"buckler-guarding.js",
	"buckler-heavy.js",
	"buckler-urgent.js",
	"cloak-base.js",
	"cloak-long.js",
	"cloak-swift.js",
	"cloak-thick.js",
	"dagger-base.js",
	"dagger-sharpened.js",
	"dagger-sweeping.js",
	"dagger-wicked.js",
	"firecracker-base.js",
	"firecracker-double.js",
	"firecracker-mercurial.js",
	"firecracker-toxic.js",
	"lifedrain-base.js",
	"lifedrain-reactive.js",
	"lifedrain-urgent.js",
	"potion-base.js",
	"potion-earthen.js",
	"potion-inky.js",
	"potion-watery.js",
	"scythe-base.js",
	"scythe-lethal.js",
	"scythe-toxic.js",
	"sickle-base.js",
	"sickle-hunters",
	"sickle-sharpened",
	"sickle-thick",
	"spear-base.js",
	"spear-lethal.js",
	"spear-reactive.js",
	"spear-sweeping.js",
	"sunflare-base.js",
	"sunflare-evasive.js",
	"sunflare-swift.js",
	"sunflare-tormenting.js",
	"sword-base.js",
	"sword-guarding.js",
	"sword-reckless.js",
	"sword-swift.js",
	"warhammer-base.js"
];

const allWeapons = {};
const weaponElements = {
	Earth: [],
	Wind: [],
	Water: [],
	Fire: [],
	Light: [],
	Darkness: [],
	untyped: []
};

for (const file of weaponWhitelist) {
	const weapon = require(`./${file}`);
	allWeapons[weapon.name] = weapon;
	if (weapon.tier < 2) {
		weaponElements[weapon.element].push(weapon.name);
	}
}

exports.getWeaponProperty = function (weaponName, propertyName) {
	if (!allWeapons[weaponName]) {
		console.error("Fetching property from illegal weapon: " + weaponName);
	} else {
		return allWeapons[weaponName][propertyName];
	}
}

exports.rollWeaponDrop = function (elements, tier, adventure) {
	let pool = elements.reduce((pool, element) => pool.concat(weaponElements[element]), []);
	let weaponName = pool[generateRandomNumber(adventure, pool.length, "general")];
	if (tier > 1) {
		for (let i = exports.getWeaponProperty(weaponName, "tier"); i < tier; i++) {
			let upgrades = exports.getWeaponProperty(weaponName, "upgrades");
			weaponName = upgrades[generateRandomNumber(adventure, upgrades.length, "general")];
		}
	}
	return weaponName;
}
