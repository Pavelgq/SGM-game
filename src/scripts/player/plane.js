import func from "../utils/functions.js";

const {
  randomNumber
} = func;

export default class Plane {

  /**
   * Название корабля, количество топлива, базовые характеристики, свободное место в трюмах, количество пассажиров
   */
  constructor(rang) {
    this.name = this.generateName();
    this.class = rang;
    this.param = this.generateParams();

  }

  /**
   * Генерирует название корабля
   */
  generateName() {
    return "Pavel"
  }

  /**
   * Генерирует параметры корабля при инициализации в зависимости от переданного ранга
   */
  generateParams() {
        let params = {};
    switch (this.rang) {
      case 1:
        params.fueld = randomNumber(1,10);
        params.attack = randomNumber(1,4);
        params.shield = randomNumber(1,4);
        params.space = randomNumber(1,10);
        break;
      case 2:

        break;
      case 1:

        break;
      case 1:

        break;
      case 1:

        break;

      default:
        break;
    }


    return params;
  }
}