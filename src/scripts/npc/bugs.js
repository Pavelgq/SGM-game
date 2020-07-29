import Creatures from './creatures.js';

export default class Bugs extends Creatures {
    constructor() {
        super();
        this.name = "Жуки";
        this.description = "Летаем и убиваем";
        this.color = "#80FF00";
        this.sectors = [];
        this.relationship = [];
        this.state = {};
    }
}