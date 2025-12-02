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
 * Final: add 3 different song options 
 */

"use strict";


/* Particle Handlers */ 
let particles = []; // array holds all particle objects
let num = 6000;  // how many particles to simulate       

/* Chladni Numbers */ 
let m = 3, n = 5; // chladni mode numbers (define the pattern shape) 
let minMN = 1, maxMN = 8; // range for picking random modes
let margin = 50; // margin for mapping coordinates into chladni space      
let w1, w2, h1, h2; // width and height boundary handlers for mapping the canvas

let threshold = 0.04; // how close particles must be to a node to “stick”
let particleSpeed = 10; // speed of moving particles


/**
 * Setup Canvas
 */
function setup() {
  createCanvas(600, 600); // create canvas

  /* Assign boundaries */ 
  w1 = margin; //  
  w2 = width - margin;
  h1 = margin; 
  h2 = height - margin;

  /* Create Particles */ 
  for (let i = 0; i < num; i++) { 
    particles.push(new Particle());
  }

  background(0);  // clear the canvas
}


// --- draw ---
function draw() {
  background(0); 

  // update and draw each particle
  for (let p of particles) {
    p.update();
    p.display();
  }
}


/**
 * chladni equation:
 * returns a value describing vibration at (x,y)
 * values near zero correspond to nodal lines
 */
function chladni(x, y) {
  return cos(n * PI * x) * cos(m * PI * y) 
       - cos(m * PI * x) * cos(n * PI * y);
}


/**
 * particle class:
 * handles movement, sticking, and drawing
 */
class Particle {


  constructor() {
    this.pos = createVector(random(width), random(height));  // assigns random starting position of each particle 
    this.vel = p5.Vector.random2D().mult(random(0.5, particleSpeed)); // assigns random velocity to each particle 
    this.stuck = false; // allows particle to move
  }


  update() {
    if (this.stuck) return; // skip if the particle is in its proper position 
    this.pos.add(this.vel); // move particle by its random velocity amount 

    /* Code To Wrap Particles Arond Canvas */ 
    if (this.pos.x < 0) {this.pos.x = width};
    if (this.pos.x > width) {this.pos.x = 0};
    if (this.pos.y < 0) {this.pos.y = height};
    if (this.pos.y > height) {this.pos.y = 0};

  
    /* Allows Position of Particles to have Playful Variance From The Chladni Lines */
    let x = map(this.pos.x, w1, w2, -1, 1);  
    let y = map(this.pos.y, h1, h2, -1, 1);

    /* */
    if (abs(chladni(x, y)) < threshold) {
      this.stuck = true; // freeze particle
      this.vel.mult(0); // stop movement
    }
  }

  display() {
    stroke(random(140, 255), 0, random(100, 210)); // colours the dots white
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
}


/* Randomizes New Pattern when Mouse Pressed */ 
function mousePressed() {

  // choose new random mode numbers
  m = floor(random(minMN, maxMN));
  n = floor(random(minMN, maxMN));

  // makes sure program doesn't freeze 
  if (m === n) {
    m++;
 }

  // resets all particles to fluid state 
  for (let p of particles) {
    p.stuck = false;
    p.vel = p5.Vector.random2D().mult(random(0.5, particleSpeed));
  }
}




