import EventEmitter from '../control/eventEmmiter.js';
import Cube from '../map/cube.js';
import Sector from '../map/sector.js';
import Galaxy from '../map/galaxy.js';
import Playfield from './playfield.js';
import func from '../utils/functions.js';

const {
  formatDate
} = func;

const root = document.querySelector(".root");
export default class View extends EventEmitter {

  constructor(model) {
    super();
    this.model = model;
    this.playfield = new Playfield(root, 320, 400, this.model.map);

    this.screens = document.querySelector('.playfield--wrapper').children;
    this.time = document.getElementById('date');

    this.questsContainer = document.querySelector(".quest__list");
    this.hangarContainer = document.querySelector(".hangar");

    this.showQuest = this.showQuest.bind(this);
    this.showPlane = this.showPlane.bind(this);
    this.reRenderQuest = this.reRenderQuest.bind(this);
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
        if (className != "map") {
          canv.style.display = "none";
        }
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
    // this.model.quests.forEach(quest => {
    //   this.renderQuest(quest);
    // });
    for (let i = 0; i < list.length; i++) {
      const quest = list[i];
      this.renderQuest(quest, i, container);
    }
    const items = container.querySelectorAll(".quest__item");
    items.forEach((item, index) => {
      const button = item.querySelector(".quest__accordion");
      button.addEventListener('click', this.showQuest);

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

      this.on('acceptQuest', this.reRenderQuest);
    });


  }


  /**
   * Рендерить переданный квест в развернутом виде
   * @param {Object} quest 
   * @param {Number} index 
   * @param {Element} container 
   */
  renderQuest(quest, index, container) {

    //сгенерировать награды
    let bonuses = '';
    if (quest.bonuses.money) {
      bonuses += `<div class="wrapper"><span>Деньги:</span><span class="conditions__money">${quest.bonuses.money}</span></div>`;
    };
    if (quest.bonuses.exp) {
      bonuses += `<div class="wrapper"><span>Опыт:</span><span class="conditions__exp">${quest.bonuses.exp}</span></div>`;
    };
    for (const key in quest.bonuses.relationship) {
      const element = quest.bonuses.relationship[key];
      if (element) {
        bonuses += ` <div class="wrapper"><span>Репутация ${this.model.creatures[key].name}:</span><span class="conditions__rep">${element}</span></div>`;
      }
    }

    //сгенерировать траты
    let spending = '';
    if (quest.spending.fuel) {
      spending += `<div class="wrapper"><span>Топливо:</span><span class="conditions__fuel">${quest.spending.fuel}</span></div>`;
    };
    if (quest.spending.money) {
      spending += `<div class="wrapper"><span>Деньги:</span><span class="conditions__money">${quest.spending.money}</span></div>`;
    };

    //сгенерировать требования
    let checking = '';
    if (quest.checking.fuel) {
      checking += `<div class="wrapper"><span>Топливо:</span><span class="conditions__fuel">${quest.checking.fuel}</span></div>`;
    };
    if (quest.checking.space) {
      checking += `<div class="wrapper"><span>Трюм:</span><span class="conditions__money">${quest.checking.space}</span></div>`;
    };
    if (quest.checking.speed) {
      checking += `<div class="wrapper"><span>Скорость:</span><span class="conditions__money">${quest.checking.speed}</span></div>`;
    };

    let opened = quest.open ? '' : 'visually-hidden';

    let template = `<li class="quest__item" data-id = "${index}">
    <button class="quest__accordion" >
              <h3 class="quest__title" >${quest.name}</h3>
            </button>
            <div class="quest__panel ${opened}">
      <span class="quest__type">Тип: ${quest.type}</span>
      <p class="quest__description">${quest.description}
      </p>
      <div class="quest__bonuses conditions">
        <h4 class="quest__subtitle">Награды</h4>
        ${bonuses}
      </div>`
    if (spending) {
      template += `<div class="quest__spending conditions">
      <h4 class="quest__subtitle">Траты</h4>
      ${spending}
    </div>`
    }

    if (checking) {
      template += `<div class="quest__checking conditions">
      <h4 class="quest__subtitle">Требования</h4>
      ${checking}
    </div>`
    }

    if (container != this.questsContainer) {
      template += `
    </div>
    </li>`;
    } else {
      template += `<div class="wrapper quest__menu">
      <button class = "quest__accept">Принять</button>
      <select class="quest__select quest__select--plane"></select>
      <button class = "quest__reset">Отказаться</button>
        </div>
      </div>
      </li>`;
    }
    container.innerHTML += template;
  }

  renderHangar(hangar) {

    const template = ` <div class="wrapper">
    <h2 class="hangar__start-title">Ангар</h2>
    <span class="hangar__stat--in">Кораблей: </span>
    <span class="hangar__stat--out">На задании: </span>
    </div>
    <ul class="hangar__list">
      
    </ul>`

    this.hangarContainer.innerHTML = template;

    let planeIn = this.hangarContainer.querySelector(".hangar__stat--in");
    let planeOut = this.hangarContainer.querySelector(".hangar__stat--out");

    let targetElement = this.hangarContainer.querySelector(".hangar__list")

    let planesList = '';
    let inHangar = 0;

    const planes = hangar.planes;
    for (let i = 0; i < planes.length; i++) {
      const plane = planes[i];
      if (plane.status == 'в ангаре') {
        inHangar += 1;
      };
      planesList += this.renderPlane(plane, i, targetElement);
    }

    planeIn.innerText = `Кораблей: ${inHangar}`;
    planeOut.innerText = `На задании: ${planes.length-inHangar}`;
  }

  renderPlane(plane, index, container) {
    let dis = false;
    if (plane.status != 'в ангаре') {
      dis = true;
    }

    let opened = plane.open ? '' : 'visually-hidden';


    let science = this.model.map.sectors[this.model.map.position].getScience();

    const template = `<li class="hangar__item plane">
    <button class="plane__accordion" id="${plane.name}">
      <h3 class="plane__title">Корабль: ${plane.name} <span>Ранг ${plane.rang}</span></h3>
    </button>
    <div class="plane__panel--min">
      <div class="wrapper">
        <span>Статус:</span><span>${plane.status} ${plane.distance?plane.distance:'-'}</span>
        <span>Топливо:</span><span>${plane.state.fuel}(${plane.params.fuel})</span>
        <span>Корпус:</span><span>${plane.state.health}(${plane.params.health})</span>
      </div>
    </div>
    <div class="plane__panel ${opened}">
      <div class="plane__chars conditions">
        <h4 class="plane__subtitle">Характеристики</h4>
        <div class="wrapper"><span class="plane__char">Корпус:</span><span
            class="c><sptions__health">${plane.state.health}(${plane.params.health})</span><button class="plane__button" data-update="health" ${dis?'disabled':''}>Улучшить за ${plane.levels.health*100/science}</button></div>
        <div class="wrapper"><span class="plane__char">Трюм:</span><span
            class="conditions__space">${plane.state.space}(${plane.params.space})</span><button class="plane__button" data-update="space" ${dis?'disabled':''}>Улучшить за ${plane.levels.space*100/science}</button></div>
        <div class="wrapper"><span class="plane__char">Топливо:</span><span
            class="conditions__fuel">${plane.state.fuel}(${plane.params.fuel})</span><button class="plane__button" data-update="fuel" ${dis?'disabled':''}>Улучшить за ${plane.levels.fuel*100/science}</button></div>
        <div class="wrapper"><span class="plane__char">Огневая мощь:</span><span
            class="conditions__attack">${plane.params.attack}</span><button class="plane__button" data-update="attack" ${dis?'disabled':''}>Улучшить за ${plane.levels.attack*100/science}</button></div>
        <div class="wrapper"><span class="plane__char">Щит:</span><span
            class="conditions__shield">${plane.params.shield}</span><button class="plane__button" data-update="shield" ${dis?'disabled':''}>Улучшить за ${plane.levels.shield*100/science}</button></div>
            <div class="wrapper">
            <button class = "plane__add--fuel plane__button" data-update="add-fuel" ${dis?'disabled':''}>Заправить ${plane.rang*4/science}</button>
            <button class = "plane__add--health plane__button" data-update="add-health" ${dis?'disabled':''}>Ремонт ${plane.levels.health*10/science}</button>
          </div>
            </div>
      
      <div class="plane__quests conditions">
        <h4 class="plane__subtitle">Задания</h4>
        <div class="wrapper quest-for-${plane.name}"></div>
      </div>
    </li>`;

    container.innerHTML += template;


  }

  showQuest(event) {
    const target = event.target.closest(".quest__item");
    target.querySelector(".quest__panel").classList.toggle("visually-hidden");
    this.emit('questState',
      target.dataset.id
    );
  }

  showPlane(event) {
    const target = event.target.closest(".hangar__item");
    const planeName = target.querySelector(".plane__accordion").id;
    target.querySelector(".plane__panel").classList.toggle("visually-hidden");
    // target.querySelector(".plane__panel--min").classList.toggle("visually-hidden");
    this.emit('planeState',
      planeName
    );
  }

  reRenderQuest(event) {
    this.renderQuestList(this.questsContainer, this.model.quests);
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