export default class HangarView {
  constructor(hangar) {
    this.hangar = hangar;
  }

  hangarMainTemplate() {
    let hangar = this.hangar;
    const planes = hangar.planes;
    let inHangar = 0;
    for (let i = 0; i < planes.length; i++) {
      const plane = planes[i];
      if (plane.status == 'в ангаре') {
        inHangar += 1;
      };
    }
    return ` <div class="wrapper">
        <h2 class="hangar__start-title">Ангар</h2>
        <span class="hangar__stat--in">Кораблей: ${inHangar}</span>
        <span class="hangar__stat--out">На задании: ${planes.length - inHangar}</span>
        </div>
        <ul class="hangar__list">
          
        </ul>`
  }

}