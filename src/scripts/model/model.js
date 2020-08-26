import EventEmitter from '../control/eventEmmiter.js';
import Galaxy from '../map/galaxy.js';
import Quest from '../quests/quest.js';

import Creatures from '../npc/creatures.js';
import Bugs from '../npc/bugs.js';
import Marins from '../npc/marins.js';
import Turkeys from '../npc/turkeys.js';
import Pirates from '../npc/pirates.js';
import Player from '../player/player.js';
import News from '../info/news.js';

import func from "../utils/functions.js";

const {
  randomNumber,
  formatDate
} = func;

export default class Model extends EventEmitter {
  constructor() {
    super();
    this.news = new News();
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
    this.player = new Player(this.map.position, this.creatures);

    
    this.resetQuest = this.resetQuest.bind(this);
    this.updatePlane = this.updatePlane.bind(this);
    this.acceptQuest = this.acceptQuest.bind(this);
    this.resetQuest = this.resetQuest.bind(this);
    //this.toggleQuest = this.toggleQuest.bind(this);
    
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
    this.news.addNews('Карта создана и заселена');
    return map;
  }


  createQuests() {
    
    for (let i = 0; i < 6; i++) {
      this.quests.push(new Quest(this.selectQuestType(), this, i));
    }
    this.news.addNews('Созданы новые квесты');
  }

  acceptQuest({index, event}) {
    const target = event.target.closest('.quest__item');
    let id = index;
    const select = target.querySelector('.quest__select--plane');
    const value = select.options[select.selectedIndex].value;
    console.log(value);
    this.player.hangar.planes.some(plane => {
      if (value == plane.name) {
        plane.currentQuest = JSON.parse(JSON.stringify(this.quests[id]));
        this.quests.splice(id, 1);
        plane.status = "на задании";
        let targetCoord = this.map.sectors[plane.currentQuest.terms.sectorID].cube;
        plane.distance = targetCoord.distance(this.map.sectors[this.map.position].cube) * 2;
        plane.distance = Math.round(plane.distance / plane.params.speed);
        return true;
      }
    });
    this.news.addNews(`Игрок принял квест ${this.quests[id].name}`);
  }

  resetQuest({index}) {
    let id = index;
    this.quests[id] = new Quest(this.selectQuestType(), this, id);
  }

  checkQuests() {
    this.quests.forEach(quest => {
      if(!quest.checkTime(this.time)) {
        let index = quest.index;
        this.resetQuest({index});
        this.news.addNews(`Квест ${this.quests[index].name} теряет актуальность`);
      }
    })
  }

  checkPlanes() {
    this.hangar.planes.forEach(plane => {
      if (plane.status == 'дрейфует') {
        this.quests[this.quests.length] = new Quest("дозаправка", this, this.quests.length);
      }
    })
  }

  selectQuestType() {
    const types = ['поставка','доставка'];
    return types[randomNumber(0,types.length-1)];
  }

  change() {
    this.tickTime();

    // for (const key in  this.creatures) {
    //     const element =  this.creatures[key];
    //     element.changeState();
    // }
    this.player.changeState(this);
    this.checkQuests();
    this.checkPlanes();
    this.news.addNews(`Наступает новый день ${formatDate(this.time)}`);
  }

  tickTime() {
    this.time.setDate(this.time.getDate() + 1);
  }


  updatePlane(event) {
    let updatePlane = event.target.closest('BUTTON').dataset.update;
    let target = event.target.closest('LI');
    const name = target.querySelector('.plane__accordion').id;
    let plane = this.player.hangar.getPlane(name);
    let science = this.map.sectors[this.map.position].getScience();
    const money = this.player.state.money;
    let coast;
    switch (updatePlane) {
      case 'add-fuel':
        coast = Math.round(plane.rang*4/science);
        if (money >= coast) {
          if (plane.addFuel()) {
            this.player.state.money -= coast;
          }else {
            console.log("Бак полон");
          }
        } else {
          console.log("No money, no deal..");
        }

        break;
      case 'add-health':
        coast = Math.round(plane.levels.health*10/science);
        if (money >= coast) {
          
          if (plane.addHealth()) {
            this.player.state.money -= coast;
          }else {
            console.log("Лучше не будет");
          }
        } else {
          console.log("No money, no deal..");
        }
        break;
      default:
        coast = Math.round(plane.levels[updatePlane] * 100 / science);
        if (money >= coast) {
          this.player.state.money -= coast;
          plane.upgradeLevel(updatePlane, science);
        } else {
          console.log("No money, no deal..");
        }
        break;
    }

  }
}