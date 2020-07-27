import Creatures from './creatures.js';

export default class Bugs extends Creatures {
    constructor() {
        super();
        this.name = "Жуки";
        this.description = "Летаем и убиваем";
        this.colors = "#80FF00";
        this.sectors = [];
        this.relationship = [];
        this.state = {};
    }
}