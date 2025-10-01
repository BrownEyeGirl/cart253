/**
 * Thinking like a computer with instructions
 * Pippin Barr
 * 
 * An ultra simple example of instructions
 */
/**
 
 * Skyla Trousdale
 * 
 */

"use strict";

/**

let h; 
let w; 

let col = {
    r: 255, 
    g: 55, 
    b: 0
}

function setup() {

    w = 600; 
    h = 400; 
    createCanvas(w, h);
    

}

let img;

function preload() {
    img = loadImage('assets/images/trees.jpg');
}


/**
 * Draw symetrical circles (reflected on y)

function draw() {
    background(200);
    text("The image would be loaded below:", 20, 20);
    image(img, 20, 40, 200,200);

}

*/


let img;
let w;
let h;
let count; 

// pixels
let pixH = 15; 
let pixW = 15; 

// sound 
let synthArp = undefined; 
let osc, playing, freq, amp;

let freqMin, freqMax; 

// visual pix design 
let hard; 

function preload() {
  img = loadImage('assets/images/skyla.jpg');
  //synthArp = loadSound('assets/sounds/bark.wav');
  //synthArp = loadSound('assets/syntharpeggio.wav');
}

function setup() {
    count = 0;
    w = img.width;
    h = img.height; 

    // Canvas 
    let cnv = createCanvas(w, h);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('sine');

    imageMode(CENTER);
    noStroke();
    background(255);
    img.loadPixels();

    // set up freq
    freqMin = 100;
    freqMax = 500; 

    // visual pix design 
    hard = true; 

    // buttons 
    let button = createButton('click me');
    button.position(0, 100);
    button.mousePressed(harden); 
    

}

function draw() {
    drawPixBasic(); 
    // Play Music 
    freq = constrain(map(mouseX, 0, width, freqMin, freqMax), freqMin, freqMax);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  
    text('tap to play', 20, 20);
    text('freq: ' + freq, 20, 40);
    text('amp: ' + amp, 20, 60);

    console.log("freq:" + freq);
    console.log("mousex: " + mouseX);
   
   if (playing) {
      osc.freq(freq, 0.1); // smooth the transitions by 0.1 seconds
      osc.amp(amp, 0.1);
      
    }     
}

/* VISUALIZER PLAYGROUND */ 

function drawPixBasic() { 
  
    /* Generates pixel for every row, column */
    for(let x = 0; x < img.width; x+=map(freq, freqMin, freqMax, 5, pixW)) { // columns for pix  
        for(let y = 0; y < img.height; y+=map(freq, freqMin, freqMax, 5, pixH)) { // rows for pix

            let sq = img.get(random(x-5, x+5), random(y+5, y-5)); // gets colour at x,y, shifts slightly by 10px at random for manic effect 
            
            push();
            fill(sq, 0); // fills each square with amount 
            console.log(sq);
            if(hard === true) {
                rect(x, y, pixH, pixW); // actually draw pixel 
            }
            else {
                ellipse(x, y, pixH, pixW);
            }
            pop();  //The origin is back to (0, 0) and rotation is back to 0.
        }
    }
}

function drawPixCol() {}

function harden() {
    hard = !hard; 
}


/* SOUND PLAYGROUND */
function playOscillator() {
    osc.start();
    playing = true;
  }
  
  function mouseReleased() {
    osc.amp(0, 0.5); // ramp up amplitude to 0 over 0.5 seconds
    playing = false;
  }














/*
function startMusic() {
  synthArp.play(); 
}

function stopMusic() {
  synthArp.stop(); 

}

*/

/*let x = random(img.width);
    let y = random(img.height);
    let minecraft = map(mouseX, 0, width, 10,70);// generates the squares

    let sq = img.get(x, y);
    fill(sq, 0);
    rect(x, y, minecraft, minecraft); */


/*for(let x = 0; x < img.width; x+= 15) { // column 
        for(let y = 0; y < img.height; y+=15) { // row 
            let sq = img.get(x, y); // built in function that gets pixel colour at x,y
            fill(sq, 0); // sets colour to sq
            rect(x, y, 15, 15); // */



  
  







  /* GRAVEYARD 


  let osc, playing, freq, amp;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
}

function draw() {
  background(220)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

*/

