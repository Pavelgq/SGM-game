
import Creatures from './creatures.js';

import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Pirates extends Creatures {
    constructor() {
        super();
        this.name = "Пираты";
        this.description = "Мы бандито";
        this.color = "#BF4030";
        this.sectors = [];
        this.relationship = {
          player: randomNumber(-100, 20),
          
        };
        this.state = {
          money: 0,
          science: 0,
          army: 0,
          economy: 0
        };
    }
}