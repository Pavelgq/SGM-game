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

  renderQuestList() {
    ;
  }

//Нужен список зависимостей между названиями ключа в квесте и названием в представлении
  renderQuest(quest) {
    const container = document.querySelector(".quest__panel");
    //сгенерировать награды
    let bonuses = '';
    let bonus = `<div class="wrapper"><span>Свободное место:</span><span class="conditions__first">120</span></div>`;
    //сгенерировать требования
    let checking = '';

    const template = `
    <span class="quest__type">Тип: ${quest.type}</span>
    <p class="quest__description">${quest.params.description}
    </p>
    <div class="quest__bonuses conditions">
      <h4 class="quest__subtitle">Награды</h4>
      <div class="wrapper"><span>Деньги:</span><span class="conditions__money">2823</span></div>
      <div class="wrapper"><span>Опыт:</span><span class="conditions__exp">322</span></div>
      <div class="wrapper"><span>Репутация:</span><span class="conditions__rep">Марины +2</span></div>
    </div>
    <div class="quest__checking conditions">
      <h4 class="quest__subtitle">Требования</h4>
      <div class="wrapper"><span>Свободное место:</span><span class="conditions__first">120</span></div>
      <div class="wrapper"><span>Опыт:</span><span class="conditions__second">20</span></div>
      <div class="wrapper"><span>Репутация Марины:</span><span class="conditions__fhirt">62</span></div>
    </div>
    <div class="wrapper quest__menu">
      <button onclick="${this.model.acceptQuest(quest)}">Принять</button>
      <button onclick="${this.renderQuestList()}">Назад</button>
    </div>
    `;
  }


}