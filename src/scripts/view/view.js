import EventEmitter from '../control/eventEmmiter.js';
import Cube from '../map/cube.js';
import Sector from '../map/sector.js';
import Galaxy from '../map/galaxy.js';
import Playfield from './playfield.js';
import PlaneView from '../player/planeView.js';
import HangarView from '../player/hangarView.js';
import QuestView from '../quests/questView.js';
import func from '../utils/functions.js';

const {
  formatDate
} = func;

const root = document.querySelector(".root");
const map = document.querySelector(".map");
export default class View extends EventEmitter {

  constructor(model) {
    super();
    this.model = model;
    this.playfield = new Playfield(map, 320, 400, this.model.map);

    this.screens = document.querySelector('.playfield--wrapper').children;
    this.time = document.getElementById('date');

    this.questsContainer = document.querySelector(".quest__list");
    this.hangarContainer = document.querySelector(".hangar");

    this.showQuest = this.showQuest.bind(this);
    this.showPlane = this.showPlane.bind(this);
    this.reRenderQuest = this.reRenderQuest.bind(this);
    this.reRenderHangar = this.reRenderHangar.bind(this);
    this.renderHangar = this.renderHangar.bind(this);
    this.renderPlayerState = this.renderPlayerState.bind(this);
    this.on('acceptQuest', this.reRenderQuest);
    this.on('resetQuest', this.reRenderQuest);
    this.on('updatePlane', this.reRenderHangar);
  }


  /**
   * Показывает страницу, которую запрашивает пользователь
   * @param {String} className 
   */
  showPage(className) {
    let canv = document.getElementById('canvas');
    for (let i = 0; i < this.screens.length; i++) {
      if (this.screens[i].classList.contains(className)) {
        this.screens[i].classList.remove("visually-hidden");
        if (className == "map") {
          canv.style.display = "block";
          this.renderPlayfield();
        } else {
          canv.style.display = "none";
        }
      } else {
        this.screens[i].classList.add("visually-hidden");
        // if (className != "map") {
        //   canv.style.display = "none";
        // }
      }
    }
  }

  /**
   * Рендерить поле карты
   */
  renderPlayfield() {
    this.playfield.renderMap();
  }

  /**
   * Рендерить время
   */
  renderTime() {
    this.time.innerText = formatDate(this.model.time);
  }

  /**
   * Рендерить состояние игрока (верхняя панель)
   */
  renderPlayerState() {
    document.getElementById('exp').innerText = this.model.player.state.exp;
    document.getElementById('money').innerText = this.model.player.state.money;
    const container = document.querySelector('.reputation');
    let template = ``;
    const npc = Object.keys(this.model.player.relationship);
    npc.forEach(element => {
      template += `<div class="wrapper">
      <span class="game__title">${this.model.creatures[element].name}:</span>
      <span class="game__repunanion" id="repM">${this.model.player.relationship[element]}</span>
    </div>`;
    });
    container.innerHTML = template;
  }

  /**
   * Рендерит квесты в свернутом виде
   */
  renderQuestList(container, list) {
    container.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
      const quest = list[i];
      this.renderQuest(quest, container);
    }
    const items = container.querySelectorAll(".quest__item");
    items.forEach((item, index) => {
      let minCanvas = item.querySelector(".quest__panel");
      let questPlayfield = new Playfield(minCanvas, 125, 150, this.model.map);
      questPlayfield.renderQuestMap(this.model.quests[index].terms.sectorID);

      const button = item.querySelector(".quest__accordion");
      button.addEventListener('click', (event) => {
        this.emit('showQuest', {
          event: event,
          index: index
        })
      });

      if (container == this.questsContainer) {
        const accept = item.querySelector(".quest__accept");
        accept.addEventListener('click', (event) => {
          this.emit('acceptQuest', {
            index: index,
            event: event
          });
        });

        const reset = item.querySelector(".quest__reset");
        reset.addEventListener('click', (event) => {
          this.emit('resetQuest', {
            index: index,
            event: event
          });
        });
        const select = item.querySelector(".quest__select--plane");
        const options = this.renderSelectPlane();
        select.innerHTML = options;
      }
    });
  }


  /**
   * Рендерить переданный квест в развернутом виде
   * @param {Object} quest 
   * @param {Element} container 
   */
  renderQuest(quest, container) {

    let questView = new QuestView(quest);
    let template = questView.questInQuests();
    container.innerHTML += template;
  }
  renderQuestPlane(quest, container) {

    let questView = new QuestView(quest);
    let template = questView.questInPlaneAction();
    container.innerHTML += template;
  }

  renderHangar(hangar) {
    let hangarView = new HangarView(hangar);
    const template = hangarView.hangarMainTemplate();

    this.hangarContainer.innerHTML = template;
    let targetElement = this.hangarContainer.querySelector(".hangar__list")

    let planesList = '';

    const planes = hangar.planes;
    for (let i = 0; i < planes.length; i++) {
      const plane = planes[i];
      planesList += this.renderPlane(plane, i, targetElement);
    }
    //TODO: здесь кветы можно рендерить у кораблей

    hangar.planes.forEach(plane => {
      let questContainer = this.hangarContainer.querySelector(`.quest-for-${plane.name}`);
      if (Object.keys(plane.currentQuest).length != 0) {
        this.renderQuestPlane(plane.currentQuest, questContainer);
      } else {
        questContainer.innerHTML = `Заданий пока нет..`;
      }
    });

    const item = this.hangarContainer.querySelectorAll(`.plane`);
    item.forEach(element => {
      const button = element.querySelector(".plane__accordion");
      button.addEventListener('click', (event) => {
        this.emit('showPlane', {
          event: event,
        });
      });

      const updateButtons = element.querySelectorAll(".plane__button");
      updateButtons.forEach(element => {
        element.addEventListener('click', (event) => {
          this.emit('updatePlane', hangar);
          this.emit('calcPlane', event);
        });
      });
    });
  }

  renderPlane(plane, index, container) {
    let science = this.model.map.sectors[this.model.map.position].getScience();
    let planeView = new PlaneView(plane);
    let template = planeView.planeInHangar(science);
    container.innerHTML += template;
  }

  showQuest({
    event,
    index
  }) {
    const target = event.target.closest(".quest__item");
    target.querySelector(".quest__panel").classList.toggle("visually-hidden");
    this.model.quests[index].open = !this.model.quests[index].open;
  }

  showPlane({
    event
  }) {
    const target = event.target.closest(".hangar__item");
    const planeName = target.querySelector(".plane__accordion").id;
    target.querySelector(".plane__panel").classList.toggle("visually-hidden");
    this.model.player.hangar.planes.forEach(plane => {
      if (plane.name == planeName) {
        plane.open = !plane.open;
      }
    });
  }

  reRenderQuest(event) {
    setTimeout(() => {
      this.renderQuestList(this.questsContainer, this.model.quests);
    }, 0);
  }
  reRenderHangar(event) {
    setTimeout(() => {
      this.renderHangar(this.model.player.hangar);
    }, 0);
  }

  renderSelectPlane() {
    let select = `<option value = "0">--</option>`;

    for (let i = 0; i < this.model.player.hangar.planes.length; i++) {
      const plane = this.model.player.hangar.planes[i];
      if (plane.status == 'в ангаре') {
        select += `
        <option value = "${plane.name}">Корабль ${plane.name}</option>
        `
      }
    }
    return select;
  }
}