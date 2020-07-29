import Creatures from './creatures.js';

import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Marins extends Creatures {
  constructor() {
    super();
    this.name = "Марины";
    this.description = "Обитатели пустоши";
    this.color = "#81B98E";
    this.sectors = [];
    this.relationship = [];
    this.state = {};
  }

  /**
   * Особенность колонизации - строятся около сингулярности
   * @param {Array} sectors 
   */
  colonization(sectors) {
    let j = 0;
    while (j < sectors.length - 1) {
      let quant = this.quant;
      if (sectors[j].state.type != 'сингулярность') {
        j += 1;
        continue;
      }
      const coloniz = [sectors[j]];
      for (const k of coloniz) {
        let mas = [];
        for (let i = 0; i < k.neighbors.length; i++) {
          mas[i] = i;
        }
        while (quant > 0 && mas.length > 0) {
          let num = randomNumber(0, mas.length - 1);
          let curent = k.neighbors[mas[num]];
          let type = curent.state.type;
          if (type == 'необитаемый') {
            curent.state.type = 'жилой';
            curent.state.backColor = this.color;
            curent.inmates = this;

            quant -= 1;
            coloniz.push(curent);
          }
          mas.splice(num, 1);
        }
        if (quant <= 0) break;
      }
      if (quant <= 0) break;
    }

  }
}