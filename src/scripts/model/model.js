import Galaxy from '../map/galaxy.js';
import Quest from '../quests/quest.js';

import Creatures from '../npc/creatures.js';
import Bugs from '../npc/bugs.js';
import Marins from '../npc/marins.js';
import Turkeys from '../npc/turkeys.js';
import Pirates from '../npc/pirates.js';
import Player from '../player/player.js';

export default class Model {
    constructor() {
        this.state = {};
        this.creatures = {
          bugs: new Bugs(),
          marins: new Marins(),
          turkeys: new Turkeys(),
          pirates: new Pirates()
        };
        this.map = this.createMap();
        this.time = 1;
        this.quests = [];
        this.player = new Player(this.map.position,this.creatures);
        
    }

    createMap() {
        const map = new Galaxy();
        map.getSectors();
        map.getNeighbor();
        map.setState();

        const creatures = [];
        for (const key in this.creatures) {
            const element = this.creatures[key];
            creatures.push(element);
        }
        map.setСolonization(creatures);
        console.log(map);
        return map;
    }


    createQuests() {
        this.quests.push(new Quest('доставка', this.map));
    }

    change() {
      for (const key in  this.creatures) {
          const element =  this.creatures[key];
          element.changeState();
      }
    }
}