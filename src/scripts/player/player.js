import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Player {

  constructor() {
    this.place = 0;
    this.hangar = {};
    this.state = {
      exp: 0,
      money: 0,
      plane: {},

    };
    this.relationship = [];

  }

  
}