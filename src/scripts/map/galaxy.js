import Sector from "./sector.js";
import func from "../utils/functions.js";
import Cube from "../map/cube.js"
import Planets from './planet.js';

const {
  planetNames
} = Planets;
const {
  randomNumber
} = func;
const {
  makeCounter
} = func;
const PARAMS_MAP = {
  width: 8,
  heidth: 12,
  radius: 4
}
const QUANT_PLAYERS = 4
const SECTOR_TYPES = [
  {
    type: "заброшенный",
    color: "#FFBF00",
    quant: randomNumber(5, 10),
    planets: randomNumber(1, 5),
    resources: 0
  },
  {
    type: "сингулярность",
    color: "#AAAFFF",
    quant: randomNumber(1, 3),
    planets: 0,
    resources: 0
  },
  {
    type: "необитаемый",
    color: "#876ED7",
    quant: 99,
    planets: randomNumber(0, 10),
    resources: randomNumber(1, 5)
  }
];
const MAS_RESOURCES = ['железо', 'руда', 'кварц', 'брилианты', 'наноботы', 'еда', 'топливо', 'вода' ];
export default class Galaxy {


  /**
   * Создаем карту с центральным сектором и радиусом
   */
  constructor() {
    this.sectors = [];

  }

  /**
   * Заполняет массив секторов для карты размер, которой указан в PARAMS_MAP
   */
  getSectors() {
    const cube = new Cube(0, 0, 0);
    this.sectors.push(new Sector(cube, 0)); //Where is state?

    let counter = makeCounter();
    let counterNow;

    for (let i = 0; i < PARAMS_MAP.heidth; i++) {
      let newNeighbors = [];
      for (let j = 0; j < PARAMS_MAP.width - 1; j++) {
        counterNow = counter();
        let neighbor = this.sectors[i * PARAMS_MAP.width + j].cube.neighbor(0);
        let newSector = new Sector(neighbor, counterNow);

        this.sectors.push(newSector);
      }
      const odd = i % 2 ? 5 : 4;
      if (i != PARAMS_MAP.heidth - 1) {
        this.sectors.push(new Sector(this.sectors[i * PARAMS_MAP.width].cube.neighbor(odd), counter()))
      }

    }

  }

  /**
   * Получаем для каждого сектора соседние сектора (один раз для удобства)
   */
  getNeighbor() {
    this.sectors.forEach(element => {

      for (let i = 0; i < 6; i++) {
        const coord = element.cube.neighbor(i);
        this.sectors.some((neighbor, index, arr) => {
          if (neighbor.cube.equal(coord)) {
            element.neighbors.push(neighbor);
            return true;
          }
        })
      }
    });
  }
/**
 * Генерируем состояния секторов
 */
  setState() {
    this.sectors.forEach(element => {
      let type = '';
      let quantRes = 0;
      let quantPlanet = 0;
      
      while (type == '') {
        const numType = randomNumber(0, SECTOR_TYPES.length - 1);
        if (SECTOR_TYPES[numType].quant > 0) {
          type = SECTOR_TYPES[numType].type;
          SECTOR_TYPES[numType].quant -= 1;
          quantRes = SECTOR_TYPES[numType].resources;
          quantPlanet = SECTOR_TYPES[numType].planets;
          element.state.backColor = SECTOR_TYPES[numType].color;
        } 
      }
      element.state.type = type;
      element.state.resources= [];
      this.generateResources(element, quantRes);
      element.state.planets= [];

      for (let i = 0; i < quantPlanet; i++) {
        let name = this.generatePlanets(element);
      }
      
      let borderColor = "#eeeeee"; //Применим при фокусе сектора
      
      
    });
  }

  /**
   * Генерирует планеты для сектора
   * @param {Sector} sector
   */
  generatePlanets(sector) {
        planetNames.then( function (res) {
          let num = randomNumber(0, res.length-1);
          sector.state.planets.push(res[num].name);
        })
  }

  /**
   * Генерирует ресурсы для сектора
   * @param {Sector} sector
   * @param {Number} quant 
   */
  generateResources(sector, quant) {
    for (let i = 0; i < quant; i++) {
      sector.state.resources.push(MAS_RESOURCES[randomNumber(0, MAS_RESOURCES.length - 1)])
      //Чтобы ресурсы не повторялись
    }
  }

  /**
   * Заполняем сектора NPC игроками
   * @PARAMS_MAP {Array} Inmates Объекты обитателей секторов
   */
  setСolonization([...arg]) {
    //Здесь будем популяцию создавать
  }
}