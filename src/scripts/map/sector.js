import func from '../utils/functions.js';

const {randomNumber} = func;

//TODO: Прописать зависимости типов от возможных ресурсов и населения. Чтобы заброшенный сектор содержал мало ресурсов, а сингулярность не может иметь жителей
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
    this.state = this.generateState();
  }

  /**
   * Стэйт включает в себя 
   * тип клетки, соотвецтвенный цвет клетки 
   * ресурсы клетки и их количество (много, средне, мало)
   * принадлежность клетки (раса, необитаемая или пираты)
   */
  generateState() {
    const numType = randomNumber(0, MAS_TYPES.items.length-1);
    const quantRes = randomNumber(1, 4);
    const numInmates = randomNumber(0, MAS_INMATES.items.length-1);
    let resources = [];
    for (let i = 0; i < quantRes; i++) {
      resources.push(MAS_RESOURCES[randomNumber(0, MAS_RESOURCES.length-1)])
    }
    let type = MAS_TYPES.items[numType];
    let borderColor = MAS_TYPES.colors[numType];
    let inmates = MAS_INMATES.items[numInmates];
    let backColor = MAS_INMATES.colors[numInmates];
    return {
        type: type,
        resources: resources,
        inmates: inmates,
        borderColor: borderColor,
        backColor: backColor
    }
  }
}