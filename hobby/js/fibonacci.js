/**
 * Experiments w spirals
 * Skyla Trousdale
 */

"use strict";

/* VARIABLES */ 
let fib = [0,1]; // base for fib gen 

let fibs = [1,1]
let scale = 1
let minScale
let deg = 90; 

const colors = ['#ffffff', '#ffffff'];//['#9edbff', '#787fff', '#7452ff', '#a1c6ff']

function setup () {
  createCanvas(600, 600, WEBGL); 
  angleMode(DEGREES); 
  initFibs();
  setMinScale();
}

function draw () {
  //translate(width/2, height/2)

  for (let i = 0; i < fibs.length; i++) {
    const scaledFib = fibs[i]*scale
    const color = colors[i%2]
    fill(color)
    rect(0, 0, scaledFib, scaledFib)
    arc(scaledFib, 0, 2*scaledFib, 2*scaledFib, 90, 180)
    translate(scaledFib, scaledFib)
    //deg*=3;
    rotate(-90);
  }

  if (scale <= minScale) {
    fibs = [1,1]
    initFibs()
    scale = 1
  } else {
    scale *= 0.99
  }
}

function addFib () {
  const fibLen = fibs.length

  fibs.push(fibs[fibLen-1] + fibs[fibLen-2])
}

/* */ 
function initFibs () {
  for(let i = 0; i < 25; i++) {
    addFib()
  }
}

function setMinScale () {
  const fibLen = fibs.length

  minScale = fibs[fibLen-5]/fibs[fibLen-1]
}