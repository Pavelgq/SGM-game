import Quest from "./quest.js";

import func from "../utils/functions.js";

const {
  randomNumber,
  formatDate
} = func;

export default class HelpPlaneQuest extends Quest {

  constructor(model, index, plane) {
    super(model, index);
    this.type = 'Дозаправка';

    this.targetPlane = plane;
  }

  create() {
    const time = this.model.time;
    const map = this.model.map;

    let posAlarm = this.targetPlane.place;
    this.terms = {
      sectorID: posAlarm, //придется рисовать путь на карте, для подобных случаев
      player: '',
      time: {}
    };

    this.way = [];
    this.way = map.buildWay(this.terms.sectorID);
    if (!this.way.length) {
      this.reach = false;
    } else {
      this.reach = true;
    }

    // const science = creatures[this.terms.player].state.science;

    this.bonuses.exp = randomNumber(10 , 20);

    
    this.checking.speed = 0;
    this.checking.space = (this.way.length * this.targetPlane.params.speed || "ошибка") ; //Сколько топлива взять с собой = Количество секторов до корабля уможенное на скорость

    let date = new Date(time);
    date.setDate(time.getDate() + this.targetPlane.liveSupport);
    this.terms.time = date;

    this.name = `Дозаправка корабля <i>${this.targetPlane.name}</i> в секторе ${this.terms.sectorID}`;
    this.description = `Корабль <i>${this.targetPlane.name}</i> остался без топлива ` +
      `в секторе ${this.terms.sectorID}. Его ресурсов жизнеобеспечения хватит до ${formatDate(date)}. ` + 
      'Требуется его спасти по возможности. ';
  }

  /**
   * Обновление квеста. Проверяет и изменяет флаги:
   * - Актуальность квеста,
   * - Возможность добваться до квеста
   */
  refresh() {


    let way = [];
    way = map.buildWay(this.terms.sectorID);
    if (!way.length) {
      this.reach = false;
    } else {
      this.reach = true;
    }
  }

  complite() {
    const player = this.model.player;
    const exp = this.bonuses.exp;

    this.targetPlane.state.fuel = this.checking.space;
    this.targetPlane.status = 'летит в ангар';

    player.state.exp += exp;
  }

  failure() {
    let planeID;
    this.model.player.hungar.planes.array.some((plane, index) => {
      if (plane == this.plane) {
        planeID = index;
        return true;
      }
    });
    this.model.player.hungar.planes.splice(planeID, 1);
  }

  view() {
    const quest = this;
    //сгенерировать награды
    let bonuses = `<div class="wrapper"><span>Корабль ${thus.plane.name}:</span><span >снова в строю</span></div>`;
    if (quest.bonuses.exp) {
      bonuses += `<div class="wrapper"><span>Опыт:</span><span class="conditions__exp">${quest.bonuses.exp}</span></div>`;
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

    let template = `<li class="quest__item" data-id = "${quest.index}">
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
          </div>`;

    if (checking) {
      template += `<div class="quest__checking conditions">
          <h4 class="quest__subtitle">Требования</h4>
          ${checking}
        </div>`
    }

    return template;
  }

}