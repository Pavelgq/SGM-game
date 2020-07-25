import Point from "../map/point.js";
const SIZE = 20;


export default class Playfield {
  /**
   * 
   * @param {*} element 
   * @param {*} width 
   * @param {*} height 
   */
  constructor(element, width, height, map) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.getElementById('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.element.appendChild(this.canvas);

    this.map = map;
    this.start = new Point(this.width / 7, this.height / 16);

    this.mouseMove = this.mouseMove.bind(this);
    this.canvas.addEventListener('mousemove', this.mouseMove, false);
  }

  /**
   * Рендерит карту на поле
   * @param {*} map 
   */
  renderMap() {

    this.map.sectors.forEach(element => {
      let colorBack;
      if (element.focus) {
        colorBack = '#FFFFFF';
      } else {
        colorBack = element.state.backColor;
      }

      let colorBorder = element.state.borderColor;
      let info = '' + element.id;

      const point = this.cubeToPixel(element.cube, this.start, SIZE);
      const start = new Point(point.x, point.y);
      this.printHex(this.context, element, start, SIZE);
    })
    //TODO: Придумать, что-то чтобы цвет менялся при наведении, как раньше.
    //TODO: Предлогаю написать еще функцию для рендера большых многогранников.
  }

  printHex(ctx, sector, center, size, text) {

    ctx.beginPath();
    let start = this.hexCorner(center, size - 3, 0);

    ctx.moveTo(start.x, start.y);
    for (let i = 1; i < 7; i++) {
      let coord = this.hexCorner(center, size - 3, i);
      ctx.lineTo(coord.x, coord.y);
    }

    ctx.fillStyle = sector.state.backColor;
    ctx.strokeStyle = sector.state.borderColor;
    ctx.lineWidth = 3.0;
    ctx.stroke();
    ctx.fill();



    //Что-нибудь написать можно так
    if (text == undefined) {
      ctx.save();
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "#555555";
      ctx.font = "10px sansserif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(center.x, center.y);
      //ctx.rotate((Math.PI / 180) * 25);
      ctx.translate(-center.x, -center.y);
      ctx.strokeText(sector.id, center.x, center.y + 10);
      ctx.restore();

    } else {
      text = {
        "ID": sector.id,
        "Тип": sector.state.type,
        "Проживает": sector.state.inmates

      }
      this.textOnHex(ctx, center, text, "#777777") 

    }


  }

  textOnHex(ctx, center, text, color) {
      ctx.save();
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = color;
      ctx.font = "14px sansserif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(center.x, center.y);
      //ctx.rotate((Math.PI / 180) * 25);
      ctx.translate(-center.x, -center.y);
      let pos = 0;
      for (const key in text) {
        if (text.hasOwnProperty(key)) {
          const element = text[key];
          ctx.strokeText(`${key}: ${element}`, center.x, center.y + pos);
          pos+=14;
        }
      }
      
      ctx.restore();
  }

  cubeToPixel(now, start, size) {
    let cubeCoord = now;
    var x = (Math.sqrt(3.0) * cubeCoord.q + Math.sqrt(3.0) / 2.0 * cubeCoord.r) * size;
    var y = (3.0 / 2.0 * cubeCoord.r) * size;
    return new Point(x + start.x, y + start.y);
  }

  hexCorner(center, size, i) {
    let angle_deg = 60 * i + 30;
    let angle_rad = Math.PI / 180 * angle_deg;
    return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
  }

  getMousePos(c, e) {
    let rect = c.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  mouseMove(event) {
    let mp = this.getMousePos(this.canvas, event),
      msg = 'Mouse at: ' + mp.x + ',' + mp.y,
      col = "black";
    let inside;
    let t;
    this.map.sectors.some(element => {
      inside = this.isMouseIn(SIZE, 6, element.cube, mp.x, mp.y);
      //this.setFocus(element, inside);
      if (element.focus != inside) {

        element.focus = inside;
        this.renderMap();
        if (element.focus) {
          console.log(event, element);
          clearTimeout(this.timer);
          this.timer = window.setTimeout(() => {
            this.printHex(this.context, element, new Point(this.width / 2, this.height / 2), SIZE + 100, {});
          }, 500);
          return true;
        }
      }
    });
  }

  isMouseIn(rad, side, center, mx, my) {
    let point = this.cubeToPixel(center, this.start, SIZE);

    let m = rad * Math.cos(Math.PI / side),
      d = Math.hypot(mx - point.x, my - point.y),
      a = Math.atan2(point.y - my, mx - point.x);
    return d <= (rad + m) / 2 + Math.cos(a * side) * (rad - m) / 2;
  }

  setFocus(element, inside) {

    if (element.focus != inside) {
      clearTimeout(this.timer);
      element.focus = inside;
      this.renderMap();


      // this.timer = setTimeout(() => {
      //   this.printHex(this.context, new Point(this.width / 2, this.height / 2), SIZE+100, element.state.backColor, element.state.borderColor, element.id);
      // }, 500);
    }
  }
}