import Cube from '../map/cube.js';
import Sector from '../map/sector.js';
import Galaxy from '../map/galaxy.js';
import Playfield from './playfield.js';

const root = document.querySelector(".root");
export default class View {

  constructor(model) {
    this.model = model;
    this.playfield = new Playfield(root, 320, 400, this.model.map);
  }

  createPlayfield() {

    this.playfield.renderMap();

  }


}