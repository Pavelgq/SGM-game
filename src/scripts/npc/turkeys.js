import Creatures from './creatures.js';

export default class Turkeys extends Creatures {
    constructor() {
        super();
        this.name = "Индюки";
        this.description = "Дюк и Инд";
        this.color = "#689AD3";
        this.sectors = [];
        this.relationship = [];
        this.state = {};
    }
}