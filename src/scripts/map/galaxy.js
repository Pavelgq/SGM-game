import Sector from "./sector.js";
import makeCounter from "../utils/functions.js";
import Cube from "../map/cube.js"

export default class Galaxy {

  param = {
    width: 5,
    heidth: 5,
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
    this.sectors.push(new Sector(cube, 1)); //Where is state?

    let counter = makeCounter();
    let counterNow = counter();

    for (let i = 0; i < this.param.heidth; i++) {
      let newNeighbors = [];
      for (let j = 0; j < this.param.width; j++) {
        let neighbor = this.sectors[i*this.param.width+j].cube.neighbor(0);
        let newSector = new Sector(neighbor, counterNow);
        counterNow = counter();
        this.sectors.push(newSector);
      }
      this.sectors.push(new Sector(this.sectors[i*this.param.width].cube.neighbor(1), counter()))



      // let metka = false;
      // this.mapData.forEach(element => {
      //   if (element.cube.equal(neighbor)) {
      //     metka = true;
      //   }
      // });

      // counterNow = counter();
      // this.mapData.push(newSector);
      // this.sectors.push(newSector);

    }

  }


}