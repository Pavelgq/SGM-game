import Creatures from './creatures.js';

export default class Turkeys extends Creatures {
    constructor() {
        super();
        this.name = "Индюки";
        this.description = "Дюк и Инд";
        this.colors = "#80FF00";
        this.sectors = [];
        this.relationship = [];
        this.state = {};
    }
}