import func from '../utils/functions.js';

const {randomNumber} = func;



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


  // /**
  //  * Стэйт включает в себя 
  //  * тип клетки, соотвецтвенный цвет клетки 
  //  * ресурсы клетки и их количество (много, средне, мало)
  //  * принадлежность клетки (раса, необитаемая или пираты)
  //  */
  // generateState() {
    
  //   const numType = randomNumber(0, SECTOR_TYPES.length-1);
  //   const quantRes = randomNumber(1, 4);
  //   const numInmates = randomNumber(0, MAS_INMATES.items.length-1);
  //   let resources = [];
  //   for (let i = 0; i < quantRes; i++) {
  //     resources.push(MAS_RESOURCES[randomNumber(0, MAS_RESOURCES.length-1)])
  //   }
  //   let type = SECTOR_TYPES[numType].name;
  //   let borderColor = MAS_TYPES.colors[numType];
  //   let inmates = MAS_INMATES.items[numInmates];
  //   let backColor = MAS_INMATES.colors[numInmates];
  //   let planets = [];
  //   return {
  //       type: type,
  //       resources: resources,
  //       inmates: inmates,
  //       borderColor: borderColor,
  //       backColor: backColor
  //   }
  // }
}