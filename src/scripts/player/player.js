import Hangar from './hangar.js';

import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Player {

  constructor(place, creatures) {
    this.place = place;
    this.hangar = new Hangar();
    this.state = {
      exp: 0,
      money: 0,
    };
    this.relationship = this.setRelationship(creatures);

  }

  /**
   * Устанавливает начальные отношение между играком и npc
   * @param {Object} creatures 
   */
  setRelationship(creatures) {
    let result = {};
    for (const key in creatures) {
      result[key] = randomNumber(0, 10);
    }
    return result;
  }



}