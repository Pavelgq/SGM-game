import system from '../utils/system.js';
import func from "../utils/functions.js";
const {
  randomNumber,
  formatDate
} = func;

const {
  readFile
} = system

const planetNames = readFile("./data/planets.json", "planets");
const MAS_RESOURCES = ['железо', 'руда', 'кварц', 'брилианты', 'наноботы', 'еда', 'топливо', 'вода', 'золото', 'дроны','запчасти', 'лекарства', 'боеприпасы'];

export default class Quest {

  constructor(type, model, index) {
    this.type = type;
    // this.params = this.generateQuest(map);
    this.index = index;
    this.name = '';
    this.terms = {
      sectorID: 0,
      player: 0,
      time: {}

    };
    this.bonuses = {
      money: 0,
      experience: 0,
      reputation: {},
    };
    this.spending = {
      fuel: 0,
      money: 0
    };
    this.checking = {
      space: 0,
      fuel: 0,
      speed: 0
    };
    this.generateQuest(model);

    this.open = false;
    this.accept = false;
  }

  generateQuest(model) {
    switch (this.type) {
      case 'поставка':
        return this.supplyQuest(model.map, model.creatures, model.time);
        break;
      case 'охота':

        break;
      case 'доставка':
        return this.deliveryQuest(model.map, model.creatures, model.time);
        break;
      case 'караван':

        break;
      case 'конвой':

        break;
      case 'извоз':

        break;
      case 'дозаправка': 
        return this.helpPlaneQuest(model.map, model.hangar.planes, model.time);
        break;
      default:
        break;
    }
  }

  /**
   * Генерирует случайный сектор для квеста не совпадающий с текущим положением
   * @param {Number} currentSector 
   * @param {Number} quantity 
   */
  getSectorID(currentSector, quantity) {
    let id = currentSector;
    while (id == currentSector) {
      id = randomNumber(0, quantity);
    }
    return id;
  }

  getTime(fast) {
    if (fast) {
      return randomNumber(1, 10);
    } else {
      return randomNumber(10, 15);
    }
  }

  checkTime(now) {
    if (now >= this.terms.time.slow) {
      return false;
    }
    return true;
  }

  planetName(sector) {
    if (sector.state.planets.length > 0) {
      const name = sector.state.planets[randomNumber(0, sector.state.planets.length - 1)];
      return name;
    } else {
      return "Неизвестно";
    }

  }

  getReputation(currentPlayer, targetPlayer) {
    //TODO: Здесь можно будет прописывать и порчу отношений, если задание не нравится другому игроку
    if (currentPlayer == targetPlayer) {
      return randomNumber(3, 5);
    } else {
      return 0
    }
    switch (targetPlayer) {
      case 1:

        break;
      case 2:

        break;
      case 3:

        break;

      default:
        break;
    }
  }

  /**
   * Генерирует квест "доставка"
   * @param {Object} map 
   * @param {Object} creatures 
   * @param {Date} time 
   */
  deliveryQuest(map, creatures, time) {
    const players = Object.keys(creatures);


    this.terms = {
      sectorID: this.getSectorID(map.sectors.position, map.sectors.length - 1),
      player: players[randomNumber(0, players.length - 1)],
      time: {}
    };
    this.bonuses.money = randomNumber(100, 200);
    this.bonuses.exp = randomNumber(50, 100);
    for (const key in creatures) {
      this.bonuses.reputation[key] = this.getReputation(key, this.terms.player);
    }

    this.spending.fuel = 0;
    this.checking.speed = 0;

    const currentSector = creatures[this.terms.player].sectors[randomNumber(0, creatures[this.terms.player].sectors.length - 1)];
    const currentPlanet = this.planetName(currentSector);
    const targetPlanet = this.planetName(map.sectors[this.terms.sectorID]);
    let slowDate = new Date(time);
    let fastDate = new Date(time);
    slowDate.setDate(time.getDate() + this.getTime(false));
    fastDate.setDate(time.getDate() + this.getTime(true));
    this.terms.time.fast = fastDate;
    this.terms.time.slow = slowDate;
    const resources = MAS_RESOURCES[randomNumber(0,MAS_RESOURCES.length-1)];
    this.type = `Экспресс-доставка`
    this.name = `${this.type} на планету <i>${targetPlanet}</i> сектор ${this.terms.sectorID}`;
    this.description = `${creatures[this.terms.player].name} с планеты <i>${currentPlanet}</i> сектора ${currentSector.id} ` +
      `просят в кротчайшие сроки доставить <b>${resources}</b> ` +
      `на <i>${targetPlanet}</i> сектор ${this.terms.sectorID}. Срок доставки: ` +
      `${formatDate(slowDate)}, если Вы доставите быстрее ${formatDate(fastDate)}, ` +
      `то награда будет увеличена`;
  }

  /**
   * Генерирует квест "поставка"
   * @param {Object} map 
   * @param {Object} creatures 
   * @param {Date} time 
   */
  supplyQuest(map, creatures, time) {
    const players = Object.keys(creatures);


    this.terms = {
      sectorID: this.getSectorID(map.sectors.position, map.sectors.length - 1),
      time: {
        
      },
      player: players[randomNumber(0, players.length - 1)]
    };
    this.bonuses.money = randomNumber(100, 200);
    this.bonuses.exp = randomNumber(50, 100);
    for (const key in creatures) {
      this.bonuses.reputation[key] = this.getReputation(key, this.terms.player);
    }
    this.spending.money = randomNumber(10,50); 
    this.spending.fuel = randomNumber(3,6);
    this.checking.speed = 0;
    this.checking.space = randomNumber(1,4);

    const currentSector = creatures[this.terms.player].sectors[randomNumber(0, creatures[this.terms.player].sectors.length - 1)];
    const currentPlanet = this.planetName(currentSector);
    const targetPlanet = this.planetName(map.sectors[this.terms.sectorID]);
    let slowDate = new Date(time);
    let fastDate = new Date(time);
    slowDate.setDate(time.getDate() + this.getTime(false));
    fastDate.setDate(time.getDate() + this.getTime(true));
    
    this.terms.time.fast = fastDate;
    this.terms.time.slow = slowDate;

    const resources = MAS_RESOURCES[randomNumber(0,MAS_RESOURCES.length-1)];
    this.type = `Поставка`
    this.name = `Поставка <b>${resources}</b> на планету <i>${targetPlanet}</i> сектор ${this.terms.sectorID}`;
    this.description = `В связи с "какое-то событие" `+
    `${creatures[this.terms.player].name} с планеты <i>${currentPlanet}</i> нуждается в <b>${resources}</b> и готовы приобрести `+
    `за ${Math.round(this.spending.money/this.checking.space)} за единицу. Если Вы доставите ${this.checking.space}, `+
    `то закроете эту потребность и ${creatures[this.terms.player].name} будут вам очень благодарны`;

  }

  helpPlaneQuest(map, plane, time) {

  }
}