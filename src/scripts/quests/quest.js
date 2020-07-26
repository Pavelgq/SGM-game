import system from '../utils/system.js';
import func from "../utils/functions.js";
const {
  randomNumber
} = func;

const {
  readFile
} = system

const planetNames = readFile("./data/planets.json", "planets");

export default class Quest {

  constructor(type, map) {
    this.type = type;
    this.params = this.generateQuest(map);
  }

  generateQuest(map) {
    switch (this.type) {
      case 'поставка':

        break;
      case 'охота':

        break;
      case 'доставка':
        return this.deliveryQuest(map);
        break;
      case 'караван':

        break;
      case 'конвой':

        break;
      case 'извоз':

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

  planetName() {
    let result = planetNames.then(res => {
      return res[randomNumber(0, res.length - 1).name]
    }).catch(err => {
      console.log(err);
    })
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

  deliveryQuest(map) {
    const terms = {
      sectorID: this.getSectorID(map.sectors.position, map.sectors.length - 1),
      time: {
        fast: this.getTime(true),
        slow: this.getTime(false)
      },
      player: randomNumber(1, 3)
    };
    const bonuses = {
      money: randomNumber(100, 200),
      exp: randomNumber(50, 100),
      reputation: {
        player1: this.getReputation(1, terms.player),
        player2: this.getReputation(2, terms.player),
        player3: this.getReputation(3, terms.player)
      }
    };
    const spending = {
      fuel: 0
    };
    const checking = {
      speed: 0
    };
    const type = `Экспресс-доставка`
    const name = `${type} на ${this.planetName()} сектор ${terms.sectorID}`;
    // const description = `${Раса} с планеты ${планета} ${Сектор}` +
    //   `просят в кротчайшие сроки доставить ${предмет_Pдоставки} ` +
    //   `на ${планета_куда} сектор ${Сектор_куда}. Срок доставки: ` +
    //   `${Дата_или_срок}, если Вы доставите быстрее ${Дата_или_срок_быстрый}, ` +
    //   `то награда будет увеличена`;

    return {
      terms: terms,
      bonuses: bonuses,
      spending: spending,
      checking: checking,
      name: name

    };
  }
}