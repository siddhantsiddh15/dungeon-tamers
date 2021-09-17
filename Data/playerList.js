const Player = require("../Classes/Player.js");
const { getGuild, saveGuild } = require("./guildList.js");
const fs = require("fs");

var filePath = "./Saves/players.json";
var requirePath = "./../Saves/players.json";
var playerDictionary = new Map();

exports.loadPlayers = function () {
	return new Promise((resolve, reject) => {
		if (fs.existsSync(filePath)) {
			var players = require(requirePath);
			players.forEach(player => {
				playerDictionary.set(player.id, player);
			})
			resolve();
		} else {
			if (!fs.existsSync("./Saves")) {
				fs.mkdirSync("./Saves", { recursive: true });
			}
			fs.writeFile(filePath, "[]", "utf8", error => {
				if (error) {
					console.error(error);
				}
			})
			resolve();
		}
	})
}

exports.getPlayer = function (playerId, guildId) {
    if (!playerDictionary.has(playerId)) {
        exports.setPlayer(new Player(playerId));
        var guildProfile = getGuild(guildId);
        guildProfile.userIds.push(playerId);
        saveGuild(guildProfile);
    }
    return playerDictionary.get(playerId);
}

exports.setPlayer = function (player) {
    playerDictionary.set(player.id, player);
    exports.savePlayers();
}

exports.savePlayers = function () {
    if (!fs.existsSync("./Saves")) {
		fs.mkdirSync("./Saves", { recursive: true });
	}
	fs.writeFile(filePath, JSON.stringify(Array.from((playerDictionary.values()))), "utf8", error => {
		if (error) {
			console.error(error);
		}
	})
}