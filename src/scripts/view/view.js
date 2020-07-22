import Cube from '../map/cube.js';
import Sector from '../map/sector.js';
import Galaxy from '../map/galaxy.js';
import Playfield from './playfield.js';

export default class View {
  root = document.querySelector(".root");
  constructor(model) {
    this.model = model;
    this.playfield = new Playfield(this.root, 320, 400);
  }

  createPlayfield() {
    const cube = new Cube(0, 0, 0);

    const map = new Galaxy(new Sector(cube, 0), 4);
    map.getSectors();
    this.playfield.renderMap(map);

  }
}