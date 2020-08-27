import Quest from "./quest";


export default class HelpPlaneQuest extends Quest {

  constructor(model, index, plane) {
    super(model, index);
    this.type = 'дозаправка';

    this.targerPlane = plane;
  }

  create() {
    const time = this.model.time;
    const map = this.model.map;

    this.terms = {
      sectorID: this.plane.position, //придется рисовать путь на карте, для подобных случаев
      player: '',
      time: {}
    };

    const science = creatures[this.terms.player].state.science;

    this.bonuses.exp = randomNumber(10 * science, 20 * science);

    this.spending.money = 0
    this.spending.fuel = 0
    this.checking.speed = 0;
    this.checking.space = randomNumber(1, 4); //столько, сколько путь для этого сектора

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

  }

  failure() {

  }

  view() {

  }
}