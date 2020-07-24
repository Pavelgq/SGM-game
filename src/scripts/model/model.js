import Galaxy from '../map/galaxy.js';
export default class Model {
    constructor() {
        this.state = {}
        this.map = this.createMap();
    }

    createMap() {
        const map = new Galaxy();
        map.getSectors();
        console.log(map)
        return map;
    }
}