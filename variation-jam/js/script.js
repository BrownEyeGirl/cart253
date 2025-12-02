/**
 * Variation Jam 
 * Skyla Trousdale
 * 
 * How it works 
 * 
 * 1. Make Chlandi Algorithm (based on book - link)
    * m = number of nodal lines in one direction (up/down?)
    * n = number of nodal lines in the perpendicular direction (left/right)
    * ψ(x,y)=cos(nπx)cos(mπy)−cos(mπx)cos(nπy) <- equation (find source)
    * 
 * 2. analyze the song’s frequency content  
 * 3. map the song's frequency content to the (m,n) modes
 * 
 * 
 */

"use strict";

// set up grid for frequencies 
let cols, rows; 
let size = 1;
let m = 5; 

// set up math for frequencies 
let n = 4; 
let threshold = 0.05;

// setup of the page 
function setup() {
  createCanvas(400, 400);
  cols = width/size;
  rows = height/size;
}

// draws grid and maps frequencies  
function draw() {
  background(220);
  noStroke();
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      let x = map(i, 0, cols, 0, 1);
      let y = map(j, 0, rows, 0, 1);
      let val = chladni(x, y); 
      
      if (abs(val) < threshold) {
        fill(0);
      } else {
        fill(255);
      }
      
      rect(i*size, j*size, size, size);
    }
  }
  
  noLoop();
}

// math (found on youtube tutorial)
function chladni(x, y) {
  let L = 1;
  return cos(n * PI * x / L) * cos(m * PI * y / L) - 
         cos(m * PI * x / L) * cos(n * PI * y / L);
}
  
  
  