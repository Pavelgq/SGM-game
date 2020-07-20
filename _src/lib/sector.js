export default class Sector {
    constructor (cube, id) {
        this.cube = cube;
        this.id = id;
    }

    getColor() {
        if (this.id < 15) {
            this.color = "#ff5000";
        }
        else {
            this.color = "#000000"
        }
       
    }
}