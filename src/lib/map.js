import Sector from "./sector.js";
import makeCounter from "./functions.js"

export default class Map {
  
  /**
   * Создаем карту с центральным сектором и радиусом
   */
  constructor (sector, rad) {
    this.sector = sector;
    this.rad = rad;
    this.mapData = [sector];
  }
  
  /**
   * Возвращает массив секторов для карты желаемого радиуса
   */
  getSectors() {
    let mas =[this.mapData[0]];
    let counter = makeCounter();
    let counterNow = counter();
    for (let i = 0; i < this.rad; i++) {
        let newNeighbors = [];
        mas.forEach(element => {
          for (let j = 0; j < 6; j++) {
            
            let neighbor = element.cube.neighbor(j)
            let newSector = new Sector(neighbor, counterNow);
            let metka = false;
            this.mapData.forEach(element => {
              if (element.cube.equal(neighbor)) {
                metka = true;
              }
            });
            if (!metka) {
              counterNow = counter();
              this.mapData.push(newSector);
              newNeighbors.push(newSector);
            }
            
          }
        });
      
        mas = newNeighbors;
    }
    
  }
  
  
}

