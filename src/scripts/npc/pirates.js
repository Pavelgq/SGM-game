
import Creatures from './creatures.js';

export default class Pirates extends Creatures {
    constructor() {
        super();
        this.name = "Пираты";
        this.description = "Мы бандито";
        this.colors = "#80FF00";
        this.sectors = [];
        this.relationship = [];
        this.state = {};
    }
}