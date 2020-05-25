"use strict";

// import Hex from "./lib/hex.js";
import Point from "./lib/hex.js";


function hexCorner(center, size, i) {
  let angle_deg = 60 * i + 30;
  let angle_rad = Math.PI / 180 * angle_deg;
  return new Point(center.x + size * Math.cos(angle_rad), center.y + size * Math.sin(angle_rad));
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
for (let i = 0; i < 10; i++) {
  ;  
}
printHex(ctx, new Point(100, 100), 50);


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