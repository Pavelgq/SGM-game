import Sector from "./sector.js";
import func from "../utils/functions.js";
import Cube from "../map/cube.js"

const {makeCounter} = func;

export default class Galaxy {

  param = {
    width: 8,
    heidth: 12,
    radius: 4
  }
  /**
   * Создаем карту с центральным сектором и радиусом
   */
  constructor() {
    this.sectors = [];

  }

  /**
   * Заполняет массив секторов для карты желаемого радиуса
   */
  getSectors() {
    const cube = new Cube(0, 0, 0);
    this.sectors.push(new Sector(cube, 0)); //Where is state?

    let counter = makeCounter();
    let counterNow;

    for (let i = 0; i < this.param.heidth; i++) {
      let newNeighbors = [];
      for (let j = 0; j < this.param.width-1; j++) {
        counterNow = counter();
        let neighbor = this.sectors[i*this.param.width+j].cube.neighbor(0);
        let newSector = new Sector(neighbor, counterNow);
        
        this.sectors.push(newSector);
      }
      const odd = i % 2 ? 5:4;
      if (i != this.param.heidth-1) {
        this.sectors.push(new Sector(this.sectors[i*this.param.width].cube.neighbor(odd), counter()))
      }

    }

  }


}