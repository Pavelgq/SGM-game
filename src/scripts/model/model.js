import Galaxy from '../map/galaxy.js';
import Quest from '../quests/quest.js';

export default class Model {
    constructor() {
        this.state = {}
        this.map = this.createMap();
        this.time = 1;
        this.quests = [];
    }

    createMap() {
        const map = new Galaxy();
        map.getSectors();
        map.getNeighbor();
        map.setState();
        console.log(map)
        return map;
    }

    createQuests() {
        this.quests.push(new Quest('доставка', this.map));
    }
}