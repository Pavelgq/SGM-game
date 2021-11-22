// import Plane from './plane.js';

export default class PlaneView {
  constructor(plane) {
    this.plane = plane;
  }

  planeInHangar(science) {
    let plane = this.plane;
    let dis = false;
    if (plane.status != 'в ангаре') {
      dis = true;
    }
    let opened = plane.open ? '' : 'visually-hidden';
    return `
        <li class="hangar__item plane">
        <button class="plane__accordion" id="${plane.name}">
          <h3 class="plane__title">Корабль: ${plane.name} <span>Ранг ${plane.rang}</span></h3>
        </button>
        <div class="plane__panel--min">
          <div class="wrapper">
            <span>Статус:</span><span>${plane.status} ${plane.distance.interval?plane.distance.interval:'-'}</span>
            <span>Топливо:</span><span>${plane.state.fuel}(${plane.params.fuel})</span>
            <span>Корпус:</span><span>${plane.state.health}(${plane.params.health})</span>
          </div>
        </div>
        <div class="plane__panel ${opened}">
          <div class="plane__chars conditions">
            <h4 class="plane__subtitle">Характеристики</h4>
            <div class="wrapper"><span class="plane__char">Корпус:</span><span
                class="c><sptions__health">${plane.state.health}(${plane.params.health})</span><button class="plane__button" data-update="health" ${dis?'disabled':''}>Улучшить за ${Math.round(plane.levels.health*100/science)}</button></div>
            <div class="wrapper"><span class="plane__char">Трюм:</span><span
                class="conditions__space">${plane.state.space}(${plane.params.space})</span><button class="plane__button" data-update="space" ${dis?'disabled':''}>Улучшить за ${Math.round(plane.levels.space*100/science)}</button></div>
            <div class="wrapper"><span class="plane__char">Топливо:</span><span
                class="conditions__fuel">${plane.state.fuel}(${plane.params.fuel})</span><button class="plane__button" data-update="fuel" ${dis?'disabled':''}>Улучшить за ${Math.round(plane.levels.fuel*100/science)}</button></div>
            <div class="wrapper"><span class="plane__char">Огневая мощь:</span><span
                class="conditions__attack">${plane.params.attack}</span><button class="plane__button" data-update="attack" ${dis?'disabled':''}>Улучшить за ${Math.round(plane.levels.attack*100/science)}</button></div>
            <div class="wrapper"><span class="plane__char">Щит:</span><span
                class="conditions__shield">${plane.params.shield}</span><button class="plane__button" data-update="shield" ${dis?'disabled':''}>Улучшить за ${Math.round(plane.levels.shield*100/science)}</button></div>
                <div class="wrapper"><span class="plane__char">Скорость:</span><span
                class="conditions__shield">${plane.params.speed}</span><button class="plane__button" data-update="speed" ${dis?'disabled':''}>Улучшить за ${Math.round(plane.levels.speed*100/science)}</button></div>
                <div class="wrapper">
                <button class = "plane__add--fuel plane__button" data-update="add-fuel" ${dis?'disabled':''}>Заправить ${Math.round(plane.rang*4/science)}</button>
                <button class = "plane__add--health plane__button" data-update="add-health" ${dis?'disabled':''}>Ремонт ${Math.round(plane.levels.health*10/science)}</button>
              </div>
                </div>
          
          <div class="plane__quests conditions">
            <h4 class="plane__subtitle">Задания</h4>
            <div class="wrapper quest-for-${plane.name}"></div>
          </div>
        </li>
        `
  }

  planeInShop() {
    let opened = plane.open ? '' : 'visually-hidden';
    return `
    <li class="hangar__item plane">
    <button class="plane__accordion" id="${plane.name}">
      <h3 class="plane__title">Корабль: ${plane.name} <span>Ранг ${plane.rang}</span></h3>
    </button>
    <div class="plane__panel--min">
      <div class="wrapper">
        <span>Статус:</span><span>${plane.status} ${plane.distance.interval?plane.distance.interval:'-'}</span>
        <span>Топливо:</span><span>${plane.params.fuel}</span>
        <span>Корпус:</span><span>${plane.params.health}</span>
      </div>
    </div>
    <div class="plane__panel ${opened}">
      <div class="plane__chars conditions">
        <h4 class="plane__subtitle">Характеристики</h4>
        <div class="wrapper"><span class="plane__char">Корпус:</span><span
            class="c><sptions__health">${plane.params.health}</span></div>
        <div class="wrapper"><span class="plane__char">Трюм:</span><span
            class="conditions__space">${plane.params.space}</span></div>
        <div class="wrapper"><span class="plane__char">Топливо:</span><span
            class="conditions__fuel">${plane.params.fuel}</span></div>
        <div class="wrapper"><span class="plane__char">Огневая мощь:</span><span
            class="conditions__attack">${plane.params.attack}</span></div>
        <div class="wrapper"><span class="plane__char">Щит:</span><span
            class="conditions__shield">${plane.params.shield}</span></div>
            <div class="wrapper"><span class="plane__char">Скорость:</span><span
            class="conditions__speed">${plane.params.speed}</span></div>
            <div class="wrapper">
          </div>
            </div>
    </li>
        `
  }
}