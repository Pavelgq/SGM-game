"use strict";

import View from './scripts/view/view.js';
import Model from './scripts/model/model.js';

const model = new Model();
model.createQuests();
console.log(model);
const view = new View(model);

view.createPlayfield();
// window.playfield = playfield;

let state = {};