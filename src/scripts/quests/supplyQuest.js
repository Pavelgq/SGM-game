import Quest from "./quest";

export default class SupplyQuest extends Quest {

  constructor() {
    super();
    this.type = 'поставка';

  }

  create() {
    const time = this.model.time;
    const map = this.model.map;
    const creatures = this.model.creatures;
    const players = Object.keys(creatures);

    this.terms = {
      sectorID: this.getSectorID(map.sectors.position, map.sectors.length - 1),
      player: players[randomNumber(0, players.length - 1)],
      time: {}
    };

    const bank = creatures[this.terms.player].state.money;
    const science = creatures[this.terms.player].state.science;

    this.bonuses.money = randomNumber(Math.round(bank * 0.05), Math.round(bank * 0.1));
    this.bonuses.exp = randomNumber(10 * science, 20 * science);

    for (const key in creatures) {
      this.bonuses.reputation[key] = this.getReputation(key, this.terms.player);
    }

    this.spending.money = 0
    this.spending.fuel = 0
    this.checking.speed = 0;
    this.checking.space = randomNumber(1, 4);

    const currentSector = creatures[this.terms.player].sectors[randomNumber(0, creatures[this.terms.player].sectors.length - 1)];
    const currentPlanet = this.planetName(currentSector);
    const targetPlanet = this.planetName(map.sectors[this.terms.sectorID]);

    let slowDate = new Date(time);
    let fastDate = new Date(time);
    slowDate.setDate(time.getDate() + this.getTime(false));
    fastDate.setDate(time.getDate() + this.getTime(true));
    this.terms.time.fast = fastDate;
    this.terms.time.slow = slowDate;

    const resources = MAS_RESOURCES[randomNumber(0, MAS_RESOURCES.length - 1)];

    this.name = `Поставка <b>${resources}</b> на планету <i>${targetPlanet}</i> сектор ${this.terms.sectorID}`;
    this.description = `В связи с "какое-то событие" ` +
      `${creatures[this.terms.player].name} с планеты <i>${currentPlanet}</i> нуждается в <b>${resources}</b> и готовы приобрести ` +
      `за ${Math.round(this.spending.money/this.checking.space)} за единицу. Если Вы доставите ${this.checking.space}, ` +
      `то закроете эту потребность и ${creatures[this.terms.player].name} будут вам очень благодарны`;

  }

  complite() {
    const player = this.model.player;
    const money = this.bonuses.money;
    const exp = this.bonuses.exp;

    const customer = this.model.creatures[this.terms.player];

    if (this.startDate <= this.terms.time.slow) {
      player.state.money += money;
      player.state.exp += exp;
      customer.state.money -= money;
    } else {
      this.failure();
      return 0;
    }

    for (const key in this.bonuses.reputation) {
      const element = this.bonuses.reputation[key];
      player.relationship[key] += element;
    }
  }

  failure() {

  }

  view() {
    const quest = this;
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

    return template;
  }
}
