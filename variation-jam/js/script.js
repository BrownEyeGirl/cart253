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

"use strict";// --- particles and modes ---
let particles = [];      // array of particles
let num = 6000;          // number of particles
let m = 3, n = 5;        // chladni mode numbers
let minMN = 1, maxMN = 8;

let margin = 50;         // canvas margin for mapping
let w1, w2, h1, h2;

let threshold = 0.04;    // how close to node to stick
let particleSpeed = 10;    // particle movement speed

// --- setup ---
function setup() {
  createCanvas(600, 600);
  w1 = margin; w2 = width - margin;
  h1 = margin; h2 = height - margin;

  // create particles
  for (let i = 0; i < num; i++) {
    particles.push(new Particle());
  }

  background(0);
}

// --- draw ---
function draw() {
  background(0);  // no trails
  for (let p of particles) {
    p.update();
    p.display();
  }
}

// --- chladni equation ---
function chladni(x, y) {
  // returns node value; abs(value) near 0 is a node
  return cos(n * PI * x) * cos(m * PI * y) - cos(m * PI * x) * cos(n * PI * y);
}

// --- particle class ---
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.5, particleSpeed));
    this.stuck = false;
  }

  update() {
    if (this.stuck) return;

    this.pos.add(this.vel);

    // wrap around canvas edges
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;

    // map to [-1,1] for chladni eq
    let x = map(this.pos.x, w1, w2, -1, 1);
    let y = map(this.pos.y, h1, h2, -1, 1);

    // stick if near node
    if (abs(chladni(x, y)) < threshold) {
      this.stuck = true;
      this.vel.mult(0);
    }

  }

  display() {
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}

// --- mouse click ---
function mousePressed() {
  // new random mode
  m = floor(random(minMN, maxMN));
  n = floor(random(minMN, maxMN));
  if (m === n) {
     m++;
  }

  // release particles
  for (let p of particles) {
    p.stuck = false;
    p.vel = p5.Vector.random2D().mult(random(0.5, particleSpeed));
  }
}
