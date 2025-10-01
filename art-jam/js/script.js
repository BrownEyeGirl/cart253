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

// canvas vars 
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
let slider, button1, button2; 

// sound filter 
let filter;
let filterRes, filterFreq;  


// preload files 
function preload() {
  img = loadImage('assets/images/skyla.jpg');
  synthArp = loadSound('assets/sounds/depth.mp3'); //https://freesound.org/people/LoudKevin/sounds/827182/
}

// set up canvas, sound features 
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
    button1 = createButton('hard/soft');
    button1.position(0, 100);
    button1.mousePressed(harden); 

    button2 = createButton('invert');
    button2.position(0, 150);
    button2.mousePressed(funk);

    // slider 
    slider = createSlider(0, 255, 0);
    slider.position(0, 200);
    slider.size(80);
    
    // sound filter (from p5 example)
    synthArp.loop(); 
    filter = new p5.HighPass();
    
    // Connect the sound file to the filter
    synthArp.disconnect();
    synthArp.connect(filter);
    
     
}


function draw() {
    drawPixBasic(); 
    // Play Music 
    freq = constrain(map(mouseX, 0, width, freqMin, freqMax), freqMin, freqMax);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
   
   if (playing) {
      osc.freq(freq, 0.1); // smooth the transitions by 0.1 seconds
      osc.amp(amp, 0.1);
      
    }     

   
    
    filterFreq = map(slider.value(), 0, 80, 10, 500); // maps freq in Hz

    filterRes = map(mouseY, 0, height, 10, 5);  // Map mouseY to resonance (volume boost) at the cutoff frequency
    console.log("filres: " + filterRes);

    // set filter parameters
    filter.set(filterFreq, filterRes);
    
}

/* VISUALIZER PLAYGROUND */ 

/* Draws Pixel Grid */
function drawPixBasic() { 
  
    /* Generates pixel for every row, column */
    for(let x = 0; x < img.width; x+=map(slider.value(), 1, 80*2, 5, pixW)) { // columns for pix  
        //for(let y = 0; y < img.height; y+=map(freq, freqMin, freqMax, 5, pixH)) { // rows for pix
        for(let y = 0; y < img.height; y+=map(slider.value(), 1, 80*2, 5, pixH)) { // rows for pix
            //console.log(slider.value());

            let sq = img.get(random(x-5, x+5), random(y+5, y-5)); // gets colour at x,y, shifts slightly by 10px at random for manic effect 
            
            push();
            fill(sq, 0); // fills each square with amount 
            //console.log(sq);
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


/* SOUND PLAYGROUND */

/* Starts Annoying Sound */
function playOscillator() {
    osc.start();
    playing = true;
  }
  
/* Fades when released */ 
function mouseReleased() {
    osc.amp(0, 0.5); // ramp up amplitude to 0 over 0.5 seconds
    playing = false;
}

/* Triggered when hard/soft button pressed */
function harden() {
    hard = !hard; 
}

/* Function wo Function */
function funk() {
    
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

