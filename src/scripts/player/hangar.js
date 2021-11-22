import Plane from "./plane.js"
import PlaneView from "./planeView.js";

export default class Hangar {
  constructor(place) {
    this.planes = [];

    this.questBuffer = [];
    this.createPlane(place);
    this.createPlane(place);

    this.togglePlane = this.togglePlane.bind(this);
  }

  createPlane(place) {
    const plane = new Plane(1, place);
    this.planes.push(plane);
  }

  getPlane(name) {
    let result;
    this.planes.some(plane => {
      if (name == plane.name) {
        result = plane;
        return true;
      }
    });
    return result;
  }

  togglePlane(event) {
    this.planes.some(plane => {
      if (plane.name == event) {
        plane.open = !plane.open;
        return
      }
    })
  }

  changeState() {
    this.planes.forEach(plane => {
      if (plane.status != 'в ангаре' && plane.status != 'ждет помощь') {
        this.changePlanePos(plane);
      }
      

      if (plane.status == 'на задании') {
        if (plane.state.fuel > 0 && plane.distance.interval > 0) {
          plane.state.fuel -= 1;
          plane.distance.interval -= 1;
        } else {
          if (plane.state.fuel > 0) {
            plane.compliteQuests.push(plane.currentQuest);
            this.questBuffer.push(plane.currentQuest);
            plane.currentQuest = {};
            plane.status = 'в ангаре';
            plane.distance.interval = 0;
          } else {
            if (plane.distance.interval > 0) {
              plane.fallQuests.push(plane.currentQuest);
              plane.currentQuest = {};
              plane.status = 'дрейфует';
            }
          }
        }
      }
    });
  }


//Когда начинаю идти обратно почему-то срабатывает условие Туда
  changePlanePos(plane) {
    if (plane.distance.interval > 0 && plane.distance.remain.length > 0) {
      plane.distance.interval = plane.distance.interval - plane.params.speed;

      if (plane.distance.remain.length * 10 >= plane.distance.interval) {
        plane.distance.pass.push(plane.distance.remain[0]);
        plane.place = plane.distance.remain[0].id;
        plane.distance.remain.splice(0, 1);


        console.log('туда', plane.place, plane.distance);
      }
    }
    else {
      if (plane.distance.interval <= 0 || plane.distance.remain.length == 0) {  
        if (plane.distance.remain.length <= 0) {
          plane.distance.remain = plane.distance.pass;
          plane.distance.pass = [];
          plane.distance.interval = 0;
        } 
        plane.distance.interval = plane.distance.interval + plane.params.speed;
  
        if (plane.distance.pass.length * 10 <= plane.distance.interval) {
          let id = plane.distance.remain.length-1
          plane.distance.pass.push(plane.distance.remain[id]);
          plane.place = plane.distance.remain[id].id;
          plane.distance.remain.splice(id, 1);


          console.log('обратно', plane.place, plane.distance);
        }
      }
    }
    
  }
}