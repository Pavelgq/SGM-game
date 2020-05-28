import Sector from "./sector.js";

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
    for (let i = 0; i < this.rad; i++) {
        let newNeighbors = [];
        mas.forEach(element => {
          for (let j = 0; j < 6; j++) {
            let neighbor = element.cube.neighbor(j)
            let newSector = new Sector(neighbor, (i+1)+j*this.rad);
            let metka = false;
            this.mapData.forEach(element => {
              if (element.cube.equal(neighbor)) {
                metka = true;
              }
            });
            if (!metka) {
              this.mapData.push(newSector);
              newNeighbors.push(newSector);
            }
            
          }
        });
      
        mas = newNeighbors;
    }
    
  }

    getId() {
      //TODO количество вызовов метода
    }
  
}

