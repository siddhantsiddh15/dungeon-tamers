module.exports = class Room {
    constructor(typeInput, titleInput, descriptionInput) {
        this.type = typeInput; // enum: "battle", "merchant", "event", "rest", "boss"
        this.title = titleInput;
        this.description = descriptionInput;
        this.components = [];
        this.enemies = {};
    }

    addEnemy(enemyInput, countInput) {
        this.enemies[enemyInput] = countInput
        return this;
    }
}
