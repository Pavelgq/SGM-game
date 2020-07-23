import Point from "../map/point.js";
const SIZE = 20;


export default class Playfield {
  /**
   * 
   * @param {*} element 
   * @param {*} width 
   * @param {*} height 
   */
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.getElementById('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.element.appendChild(this.canvas);
  }

  /**
   * Рендерит карту на поле
   * @param {*} map 
   */
  renderMap(map) {
    const start = new Point(this.width / 2, this.height / 2);

    map.sectors.forEach(element => {
      element.getColor();
      let color = element.color;
      let info = '' + element.id;
      let point = this.cubeToPixel(element, start, SIZE);
      this.printHex(this.context, new Point(point.x, point.y), SIZE, color, info);
    })

  }

  printHex(ctx, center, size, color, info) {
    ctx.beginPath();
    let start = this.hexCorner(center, size, 0);
    ctx.moveTo(start.x, start.y);
    for (let i = 1; i < 7; i++) {
      let coord = this.hexCorner(center, size, i);
      ctx.lineTo(coord.x, coord.y);
    }

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();

    //Что-нибудь написать можно так
    ctx.save();
    ctx.strokeStyle = "pink";
    ctx.font = "10px sansserif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate(center.x, center.y);
    ctx.rotate((Math.PI / 180) * 25);
    ctx.translate(-center.x, -center.y);
    ctx.strokeText(info, center.x, center.y + 10);
    ctx.restore();


  }

  cubeToPixel(now, start, size) {
    let cubeCoord = now.cube;
    var x = (Math.sqrt(3.0) * cubeCoord.q + Math.sqrt(3.0) / 2.0 * cubeCoord.r) * size;
    var y = (3.0 / 2.0 * cubeCoord.r) * size;
    return new Point(x + start.x, y + start.y);
  }

  hexCorner(center, size, i) {
    let angle_deg = 60 * i + 30;
    let angle_rad = Math.PI / 180 * angle_deg;
    return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
  }
}