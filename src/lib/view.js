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

  renderField(key) {
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.beginPath();
    this.context.moveTo(1, 1);
    this.context.lineTo(this.width-1, 1);
    this.context.lineTo(this.width-1, this.height-1);
    this.context.lineTo(1, this.height-1);
    this.context.lineTo(0, 0);
    this.context.moveTo(0, this.height / 8);
    this.context.lineTo(this.width, this.height / 8);
    this.context.moveTo(0, 9*this.height / 10);
    this.context.lineTo(this.width, 9*this.height / 10);

    this.context.strokeStyle = "#ff0000";
    this.context.stroke();

    this.context.moveTo(100, 100);
    this.context.save();
    this.context.strokeStyle = "pink";
    this.context.font = "10px sansserif";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.strokeText("hello", 20, 20);
    this.context.restore();


    switch (key) {
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

  renderMap() {

  }

}