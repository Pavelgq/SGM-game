import Cube from '../map/cube.js';
import Sector from '../map/sector.js';
import Galaxy from '../map/galaxy.js';
import Playfield from './playfield.js';
import func from '../utils/functions.js';

const {
  formatDate
} = func;

const root = document.querySelector(".root");
export default class View {

  constructor(model) {
    this.model = model;
    this.playfield = new Playfield(root, 320, 400, this.model.map);

    this.screens = document.querySelector('.playfield--wrapper').children;
    this.time = document.getElementById('date');

    this.questsContainer = document.querySelector(".quest__list");
  }

  renderPlayfield() {
    this.playfield.renderMap();
  }

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

  renderTime() {
    this.time.innerText = formatDate(this.model.time);
  }

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

  renderQuestList() {
    this.questsContainer.innerHTML = '';

    // this.model.quests.forEach(quest => {
    //   this.renderQuest(quest);
    // });
    for (let i = 0; i < this.model.quests.length; i++) {
      const quest = this.model.quests[i];
      this.renderQuest(quest, i);
      
    }
  }

  /**
   * Рендерить переданный квест в развернутом виде
   * @param {Object} quest 
   */
  renderQuest(quest, index) {

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


    let template = `<li class="quest__item" id="quest_${index}">
    <button class="quest__accordion" >
              <h3 class="quest__title" >${quest.name}</h3>
            </button>
            <div class="quest__panel visually-hidden">
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

    template += `<div class="wrapper quest__menu">
    <button onclick="" data-index="accept">Принять</button>
    <button onclick="${this.renderQuestList}">Назад</button>
      </div>
    </div>
    </li>`;
    //${this.model.acceptQuest(quest)}
    this.questsContainer.innerHTML += template;
    const item = this.questsContainer.querySelectorAll(`.quest__item`);
    item.forEach(element => {
      const button = element.querySelector(".quest__accordion");
      button.addEventListener('click', this.showQuest);
    })
    
  }

  showQuest(event) {

    const target = event.target.closest(".quest__item");
    target.querySelector(".quest__panel").classList.toggle("visually-hidden");
    console.log('SHOW')
  }
}