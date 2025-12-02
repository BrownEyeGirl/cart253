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

let particles = [];
let num = 6000;

let m = 3;
let n = 5;
let minMN = 1;
let maxMN = 8;

let margin = 50;
let w1, w2, h1, h2;

let threshold = 0.04;

// NEW: particle speed variable
let particleSpeed = 100;  // change this to make particles move faster or slower

function setup() {
  createCanvas(600, 600);
  w1 = margin;
  w2 = width - margin;
  h1 = margin;
  h2 = height - margin;
