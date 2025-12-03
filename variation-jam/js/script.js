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
 * 3. map the song's frequency content to the (m,n) modes (note! this is different than the frequency of the "plate", I am creatively mapping sound onto physical resonance)
 * 
 * Final: add 3 different song options (set different colours/sizes based on my vibes of each song)
 */



"use strict";


/* Particle Handlers */ 
let particles = []; // array holds all particle objects
let num = 4000;  // how many particles to simulate     
let threshold = 0.04; // how close particles must be to a node to “stick”
let particleSpeed = 1; // speed of moving particles  

/* Chladni Numbers */ 
let m = 3, n = 5; // chladni mode numbers (define the pattern shape) 
let minMN = 1, maxMN = 8; // range for picking random modes


/* Particles + Chlandi Numbers Layout */
let margin = 50; // margin for mapping coordinates into chladni space      
let w1, w2, h1, h2; // width and height boundary handlers for mapping the canvas


/* Music + Sound Variables */ 
let song; 
let fft; 
let amp; 
let bassEnergy; 
let bassThreshold = 1.1; 
let lastBass; 
let midEnergy; 
let trebleEnergy; 
let volume; 
let bpm = 120; // Manually set the BPM after finding it externally
let beatInterval; // 

/**
 * Preload Song 
 * */
function preload() {
  song = loadSound('assets/sounds/prememory.mp3');
}

/**
 * Setup Canvas + Initial Values 
 */
function setup() {

  /* Canvas */ 
  createCanvas(600, 600); // create canvas
  background(0);  // clear the canvas


  /* Assign boundaries */ 
  w1 = margin; //  
  w2 = width - margin;
  h1 = margin; 
  h2 = height - margin;

  /* Create Particles */ 
  for (let i = 0; i < num; i++) { 
    particles.push(new Particle());
  }

  /* Music Loaders */
  fft = new p5.FFT(0.9, 1024); // smoothing = 0.9, 1024 frequency bins (recommended)
  amp = new p5.Amplitude(); 
  //song.play(); 

  /* Play Music */ 
  let playButton = createButton('Play Song');
  playButton.mouseClicked(playSong); 

}


/**
 * Draws Each Particle 
 * */ 
function draw() {
  background(0); 
  getFrequencies(); 


  /* Update and draw each particle */ 
  for (let p of particles) {
    p.update();
    p.display();
  }

  rect(width/2, height/2, trebleEnergy, trebleEnergy); // rect to show bass energy 
}

function playSong() {
  song.play(); 
}


/**
 * Chladni Equation:
 * returns a value describing vibration at (x,y)
 * values near zero correspond to nodal lines :)
 */
function chladni(x, y) {
  return cos(n * PI * x) * cos(m * PI * y) 
       - cos(m * PI * x) * cos(n * PI * y);
}


/**
 * Particle Class: Handles Particle Movement, Lines, and Particle Drawing (from particle video tutorial referenced in README.md)
 */
class Particle {

  /* Creates Random Movement */ 
  constructor() {
    this.pos = createVector(random(width), random(height));  // assigns random starting position of each particle 
    this.vel = p5.Vector.random2D().mult(random(0.5, particleSpeed)); // assigns random velocity to each particle 
    this.stuck = false; // allows particle to move
  }

  /* Moves Particles into Nodal Lines with vibration value near zero */ 
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

    /* Freezes Particles on Nodal Lines*/
    if (abs(chladni(x, y)) < threshold) {
      this.stuck = true; // freeze particle
      this.vel.mult(0); // stop movement
    }
  }

  /* Draws Particle in Position */ 
  display() {
    stroke(random(140, 255), random(0, 100), random(100, 210)); // colours the dots white
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}


/**
 * Randomizes New Pattern when Mouse Pressed 
 * */ 
function mousePressed() {



  // choose new random mode numbers
  m = floor(random(minMN, maxMN));
  n = floor(random(minMN, maxMN));

  // makes sure program doesn't freeze (prevents error in chlandi numbers when both are zero) 
  if (m === n) {
    m++;
 }

  // resets all particles to fluid state 
  for (let p of particles) {
    p.stuck = false;
    p.vel = p5.Vector.random2D().mult(random(0.5, particleSpeed));
  }
}

function newPattern() {

  if(trebleEnergy )
  // choose new random mode numbers
  m = a;
  n = b;

  // makes sure program doesn't freeze (prevents error in chlandi numbers when both are zero) 
  if (m === n) {
    m++;
 }

  // resets all particles to fluid state 
  for (let p of particles) {
    p.stuck = false;
    p.vel = p5.Vector.random2D().mult(random(0.5, particleSpeed));
  }
}

/* Calculates frequency of a song */ 
function getFrequencies() {
  
    let spectrum = fft.analyze(); // array amplitude values (0-255) https://p5js.org/reference/p5.FFT/analyze/
  
    lastBass=bassEnergy; 
    bassEnergy = fft.getEnergy("bass");
    //console.log(bassEnergy);
    // detect spike in bass
    if (bassEnergy > lastBass * bassThreshold && bassEnergy > 50) {
      //setTimeout(bassSpiked(), 30000); 
      // this is where you'd trigger your Chladni pattern change
    }

    midEnergy = fft.getEnergy("mid"); 
    trebleEnergy = fft.getEnergy("treble");

    volume = amp.getLevel(); 

    //console.log(topEnergy); 

    /*
    // find dominant frequency
    let maxAmp = 0;
    let dominantFreq = 0;
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxAmp) {
        maxAmp = spectrum[i];
        dominantFreq = fft.getFreq(i); // frequency corresponding to bin i
      }
    }
  
    console.log("dominant frequency:", dominantFreq); */ 
  
}



function bassSpiked() {
    console.log("BASS SPIKE!", bassEnergy);

}


function showStats() {
  fill(255);
  text('hi', 50, 50);
}