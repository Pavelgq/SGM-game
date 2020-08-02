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
    
    console.log(this.model);

    this.view.renderPlayfield();
    this.view.renderTime();
    this.view.renderPlayerState();
    this.view.renderQuestList();
    
  }

  connectElements(selector, event) {
    let elements = document.querySelectorAll(selector);
    for (let element of elements)
      element.addEventListener(event, e => this.eventHandler(e));
  }

  eventHandler(event) {
    let index = event.target.closest('BUTTON').dataset.index;;
    
    switch (index) {
      case 'nextStep':
        this.nextStep();
        break;
      case 'map':
        this.view.showPage(index);
        break;
      case 'quest':
        if (this.model.quests.length == 0) {
          this.model.createQuests();
        }
       
        this.view.renderQuestList();
        this.view.showPage(index);
        break;
      case 'hangar':
        this.view.showPage(index);
        break;
      case 'news':
        this.view.showPage(index);
        break;
      case 'shop':
        this.view.showPage(index);
        break;
      // case 'accept':
      //   this.model.createQuests();
      //   this.view.renderQuestList();
      //   break;
      default:
        console.log('Что это ты нажал?', event);
        break;
    }
  }

  nextStep() {

    this.model.change();
    this.view.renderPlayfield();
    this.view.renderTime();
  }

}