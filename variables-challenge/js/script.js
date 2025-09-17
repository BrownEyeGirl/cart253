/**
 * Mr. Furious
 * Pippin Barr & Skyla Trousdale 
 *
 * A guy who becomes visibly furious!
 */

"use strict";
// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  eyeSize: 20,
  shake: 10,
  anger: 20, 
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};

let angerRate = 2; 

let sky = {
  fill: {
    r: 160,
    g: 180,
    b: 200
  }
}

let darkRate = 1; 


let bird = {
  v: 3,
  a: 1,
  h: 30, 
  w: 30,
  fill : {
    r: 50,
    g: 0,
    b: 200
  }
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {

  // Sky
  background(sky.fill.r, sky.fill.g, sky.fill.b);
  
  // Make sky darker 
  sky.fill.r -= darkRate; 
  sky.fill.g -= darkRate; 
  sky.fill.b -= darkRate;

  // Constraints 
  sky.fill.r = constrain(sky.fill.r, 0, 255); 
  sky.fill.g = constrain(sky.fill.g, 0, 255); 
  sky.fill.b = constrain(sky.fill.b, 0, 255); 



  // Make him angrier 
  mrFurious.fill.g -= angerRate;
  mrFurious.fill.b -= angerRate;
  mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255); 
  mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255); 

  // Make him shakier 
  mrFurious.x = random(width/2+mrFurious.shake, width/2-mrFurious.shake);

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);

  // Give Mr. Furious eyes
  fill(255); 
  ellipse(mrFurious.x-mrFurious.size/4, mrFurious.y, mrFurious.eyeSize);
  ellipse(mrFurious.x+mrFurious.size/4, mrFurious.y, mrFurious.eyeSize);
  triangle(mrFurious.x-mrFurious.size/4, mrFurious.y + mrFurious.anger);
  triangle(mrFurious.x+mrFurious.size/4, mrFurious.y + mrFurious.anger); 
  pop();



  // Draw a bird 
 fill(bird.fill.r, bird.fill.g, bird.fill.b);
 ellipse(bird.v, height/3, bird.w, bird.h); 
  bird.v += bird.a; 
  bird.a += 1; 
  
  
}