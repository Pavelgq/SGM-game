"use strict";

import View from '../view/view.js';
import Model from '../model/model.js';


export default class Controller {

  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.eventHandler = this.eventHandler.bind(this);
  }

  init() {
    this.model.createQuests();
    console.log(this.model);

    this.view.renderPlayfield();


  }

  connectElements(selector, event) {
    let elements = document.querySelectorAll(selector);
    for (let element of elements)
      element.addEventListener(event, e => this.eventHandler(e));
  }

  eventHandler(event) {

    switch (event.target.dataset.index) {
      case 'nextStep':
        this.nextStep();
        break;
      case 'map':
        this.view.showMap();
        break;
      case 'quests':
        this.view.showQuests();
        break;
      case 'hangar':
        this.view.showHangar();
        break;
      case 'news':
        this.view.showNews();
        break;
      case 'shop':
        this.view.showShop();
        break;

      default:
        console.log('Что это ты нажал?', event);
        break;
    }
  }

  nextStep() {
    this.model.change();
    this.view.renderPlayfield();
  }

}