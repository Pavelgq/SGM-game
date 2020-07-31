import Cube from '../map/cube.js';
import Sector from '../map/sector.js';
import Galaxy from '../map/galaxy.js';
import Playfield from './playfield.js';

const root = document.querySelector(".root");
export default class View {

  constructor(model) {
    this.model = model;
    this.playfield = new Playfield(root, 320, 400, this.model.map);

    this.screens = document.querySelector('.playfield--wrapper').children;
  }

  renderPlayfield() {
    this.playfield.renderMap();
  }

  showPage(className) {
    let canv =  document.getElementById('canvas');
    for(let i = 0; i < this.screens.length; i++) {
      if (this.screens[i].classList.contains(className)) {
        this.screens[i].classList.remove("visually-hidden");
        if (className == "map") {
          canv.style.display = "block";
          this.renderPlayfield();
        }else {
          canv.style.display = "none";
        }
      }else {
        this.screens[i].classList.add("visually-hidden");
        if (className != "map") {
          canv.style.display = "none";
        }
      }
      
    }
  }


}