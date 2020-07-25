import Sector from "./sector.js";
import func from "../utils/functions.js";
import Cube from "../map/cube.js"

const {makeCounter} = func;
const   param = {
  width: 8,
  heidth: 12,
  radius: 4
}
export default class Galaxy {


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

    for (let i = 0; i < param.heidth; i++) {
      let newNeighbors = [];
      for (let j = 0; j < param.width-1; j++) {
        counterNow = counter();
        let neighbor = this.sectors[i*param.width+j].cube.neighbor(0);
        let newSector = new Sector(neighbor, counterNow);
        
        this.sectors.push(newSector);
      }
      const odd = i % 2 ? 5:4;
      if (i != param.heidth-1) {
        this.sectors.push(new Sector(this.sectors[i*param.width].cube.neighbor(odd), counter()))
      }

    }

  }


}