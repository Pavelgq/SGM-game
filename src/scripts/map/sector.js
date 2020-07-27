import func from '../utils/functions.js';

const {randomNumber} = func;

//TODO: Прописать зависимости типов от возможных ресурсов и населения. Чтобы заброшенный сектор содержал мало ресурсов, а сингулярность не может иметь жителей
const QUANT_PLAYERS = 4
const SECTOR_TYPES = [
  {
    type: "жилой",
    color: "#808080",
    quant: randomNumber(2 * QUANT_PLAYERS,5 * QUANT_PLAYERS),
    planets: randomNumber(1, 5),
    resources: randomNumber(1, 3)
  },
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
    color: "#f234d2",
    quant: 99,
    planets: randomNumber(0, 10),
    resources: randomNumber(1, 5)
  }
];


const MAS_TYPES = {
  items: ['жилой', 'необитаемый', 'пиратский', 'заброшенный', 'сингулярность', 'нечто'],
  colors: ['#80FF00','#FFBF00','#B40404','#A4A4A4','#000000','#FFFFFF']
};
const MAS_INMATES = {
  items: ['Марины', 'Жуки', 'Индюки', 'Пираты', 'Нейтральный'],
  colors: ['#F781BE','#A9D0F5','#CEF6E3','#8A0808','#E6E6E6']
};
const MAS_RESOURCES = ['железо', 'руда', 'кварц', 'брилианты', 'наноботы', 'еда', 'топливо', 'вода' ];


export default class Sector {
  constructor(cube, id) {
    this.cube = cube;
    this.neighbors = [];
    this.id = id;
    this.position = 1;
    this.focus = false;
    this.state = {
      type: '',
      resources: [],
      planets: [],
      borderColor: '',
      backColor: ''
    };
  }


  /**
   * Стэйт включает в себя 
   * тип клетки, соотвецтвенный цвет клетки 
   * ресурсы клетки и их количество (много, средне, мало)
   * принадлежность клетки (раса, необитаемая или пираты)
   */
  generateState() {
    
    const numType = randomNumber(0, SECTOR_TYPES.length-1);
    const quantRes = randomNumber(1, 4);
    const numInmates = randomNumber(0, MAS_INMATES.items.length-1);
    let resources = [];
    for (let i = 0; i < quantRes; i++) {
      resources.push(MAS_RESOURCES[randomNumber(0, MAS_RESOURCES.length-1)])
    }
    let type = SECTOR_TYPES[numType].name;
    let borderColor = MAS_TYPES.colors[numType];
    let inmates = MAS_INMATES.items[numInmates];
    let backColor = MAS_INMATES.colors[numInmates];
    let planets = [];
    return {
        type: type,
        resources: resources,
        inmates: inmates,
        borderColor: borderColor,
        backColor: backColor
    }
  }
}