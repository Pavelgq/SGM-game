"use strict";

import View from "./lib/view.js"
import Cube from "./lib/cube.js";
import Point from "./lib/point.js";
import Map from "./lib/map.js"
import Sector from "./lib/sector.js";

const root = document.querySelector(".root");

const view = new View(root, 320, 640);

window.view = view;

view.renderField(1);

function hexCorner(center, size, i) {
  let angle_deg = 60 * i + 30;
  let angle_rad = Math.PI / 180 * angle_deg;
  return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
}

const SIZE = 20;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const cube = new Cube(0,0,0);

const map = new Map(new Sector(cube, 0),5);

map.getSectors();

console.log(map);

const start = new Point(500, 500);

map.mapData.forEach( element => {
  element.getColor();
  let color = element.color;
  let info = '' + element.id;
  let point = cubeToPixel(element, start, SIZE);
  printHex(ctx, new Point(point.x, point.y), SIZE, color, info);
})

function printHex(ctx, center, size, color, info) {
  

  ctx.beginPath();
  let start = hexCorner(center, size, 0);
  ctx.moveTo(start.x, start.y);
  for (let i = 1; i < 7; i++) {
    let coord = hexCorner(center, size, i);
    ctx.lineTo(coord.x, coord.y);

  }
  
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.fill();

  //Что-нибудь написать можно так
  ctx.save();
  ctx.strokeStyle = "pink";
  ctx.font = "10px sansserif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(center.x, center.y);
  ctx.rotate((Math.PI / 180) * 25);
  ctx.translate(-center.x, -center.y);
  ctx.strokeText(info, center.x, center.y+10);
  ctx.restore();


}

function cubeToPixel(now, start, size) {
  let cubeCoord = now.cube;
  var x = (Math.sqrt(3.0) * cubeCoord.q + Math.sqrt(3.0) / 2.0 * cubeCoord.r) * size;
  var y = ( 3.0 / 2.0 * cubeCoord.r)*size; 
  return new Point(x + start.x, y + start.y);
}

