export default class Map {

  constructor (center, q, size) {
    this.center = center;
    this.q = q;
    this.size = size;

  }

  /**
   * Получение i-ой точки шестиугольника с центром в точке center и размером size
   * @param {Point} center 
   * @param {number} size 
   * @param {number} i 
   */
  hexCorner(center, size, i) {
    let angle_deg = 60 * i + 30;
    let angle_rad = Math.PI / 180 * angle_deg;
    return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
  }


}

