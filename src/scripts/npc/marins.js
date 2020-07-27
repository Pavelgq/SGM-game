
import Creatures from './creatures.js';

export default class Marins extends Creatures {
    constructor() {
        super();
        this.name = "Марины";
        this.description = "Обитатели пустоши";
        this.colors = "#80FF00";
        this.sectors = [];
        this.relationship = [];
        this.state = {};
    }
}