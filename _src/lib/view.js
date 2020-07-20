import Point from "./point.js";
const SIZE = 20;
export default class View {
 
  /**
   * 
   * @param {*} element родительский DOM-элемент
   * @param {number} width 
   * @param {number} height 
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
 * Рендерит поле по входным данным
 * @param {Object} state 
 * @param {Number} key 
 * @param {Object} map 
 */
  renderField(state, key, map) {
    
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.fillStyle = "#eeeeee";
    this.context.fillRect(0, 0,  this.width,  this.height);

    this.context.fillStyle = "#616161";
    this.context.fillRect(0, 0,  this.width,  this.height/8);

    this.context.fillStyle = "#333333";
    this.context.fillRect(0, 9*this.height/10,  this.width,  9*this.height/10);
   
    this.context.moveTo(100, 100);
    this.context.save();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "#333333";
    this.context.font = "10px arial";
    this.context.textAlign = "left";
    this.context.textBaseline = "middle";
    this.context.strokeText(`Дата: ${state.date}`, 20, 20);
    
    this.context.strokeText(`Деньги: ${state.money}`, 20, 40);

    this.context.strokeText(`Опыт: ${state.experience}`, 20, 60);

    this.context.strokeText(`Репутация Марины: ${state.repM}`, 150, 20);
    this.context.strokeText(`Репутация Жуки: ${state.repJ}`, 150, 40);
    this.context.strokeText(`Репутация Индюки: ${state.repI}`, 150, 60);
    this.context.restore();

    switch (key) {
      case 1:

        break;
      case 2:
        
        break;
      case 3:
        this.renderMap(map);
        break;
      default:

        break;
    }
  }

  renderMap(map) {
    const start = new Point(this.width/2, this.height/2);

    map.mapData.forEach( element => {
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
    ctx.strokeText(info, center.x, center.y+10);
    ctx.restore();
  
  
  }
  
  cubeToPixel(now, start, size) {
    let cubeCoord = now.cube;
    var x = (Math.sqrt(3.0) * cubeCoord.q + Math.sqrt(3.0) / 2.0 * cubeCoord.r) * size;
    var y = ( 3.0 / 2.0 * cubeCoord.r)*size; 
    return new Point(x + start.x, y + start.y);
  }

  hexCorner(center, size, i) {
    let angle_deg = 60 * i + 30;
    let angle_rad = Math.PI / 180 * angle_deg;
    return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
  }
}