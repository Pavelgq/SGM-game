"use strict";

import Cube from "./lib/cube.js";
import Point from "./lib/point.js";
import Map from "./lib/map.js"
import Sector from "./lib/sector.js";


function hexCorner(center, size, i) {
  let angle_deg = 60 * i + 30;
  let angle_rad = Math.PI / 180 * angle_deg;
  return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
}

const SIZE = 50;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');




const cube = new Cube(0,0,0);


const map = new Map(new Sector(cube, 0),5);

map.getSectors();

console.log(map);

const start = new Point(500, 500);

map.mapData.forEach( element => {

  let lol = cubeToPixel(element.cube, start, SIZE);
  printHex(ctx, new Point(lol.x, lol.y), SIZE);
})


// printHex(ctx, start, SIZE);

// for (let i = 0; i < 6; i++) {
//   let now = cube.neighbor(i);  
//   let myPoint = cubeToPixel(now, start, SIZE);
//   for (let j = 0; j<6; j++) {
//     let now1 = cube.neighbor(j);  
//     let lol = cubeToPixel(now1, myPoint, SIZE);
//     printHex(ctx, new Point(lol.x, lol.y), SIZE);
//   }

//   printHex(ctx, new Point(myPoint.x, myPoint.y), SIZE);
// }
//TODO написать класс для всего этого
//TODO Оставить только контуры шестигранников и сохранить точки в массив


function printHex(ctx, center, size) {
  ctx.beginPath();
  let start = hexCorner(center, size, 0);
  ctx.moveTo(start.x, start.y);
  for (let i = 1; i < 6; i++) {
    let coord = hexCorner(center, size, i);
    ctx.lineTo(coord.x, coord.y);

  }
  ctx.fill();

}

function cubeToPixel(now, start, size) {
  var x = (Math.sqrt(3.0) * now.q + Math.sqrt(3.0) / 2.0 * now.r) * size;
  var y = ( 3.0 / 2.0 * now.r)*size; 
  return new Point(x + start.x, y + start.y);
}

