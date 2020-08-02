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
        this.time = new Date(2111, 1, 28);
        this.quests = [];
        this.player = new Player(this.map.position,this.creatures);
        

        this.resetQuest = this.resetQuest.bind(this);
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
      for (let i = 0; i < 3; i++) {
        this.quests.push(new Quest('доставка', this));
        this.quests.push(new Quest('поставка', this));
      }
        
    }

    resetQuest(event) {
      const target = event.target.closest('.quest__item');
      let id = parseInt(target.id.match(/\d+/));
      this.quests[id] = new Quest('поставка', this);
    }

    change() {
      this.tickTime();
      for (const key in  this.creatures) {
          const element =  this.creatures[key];
          element.changeState();
      }
    }

    tickTime() {
      this.time.setDate(this.time.getDate() + 1);
    }

    // acceptQuest(quest) {
    //   ;
    // }
}