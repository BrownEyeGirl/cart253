/**
 * Art Jam
 * 
 * Art is the Jam! Interactive program where a selfie is manipulated in tandem with the style 
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
let kick = undefined; 
let osc, playing, freq, amp;

let freqMin, freqMax; 

// visual pix design 
let hard; 
let specialPix; 
let amountSpecial; 
let slider1, slider2, button1, button2; 

// sound filter 
let filter;
let filterRes, filterFreq;  

// drums  (sourced from docs: https://p5js.org/reference/p5.sound/p5.Phrase/#:~:text=A%20phrase%20is%20a%20pattern,another%20could%20be%20the%20bassline.)
let pattern; 
let myPhrase; 
let myPart; 


// preload files 
function preload() {
    img = loadImage('assets/images/skyla.jpg');
    synthArp = loadSound('assets/sounds/depth.mp3'); //https://freesound.org/people/LoudKevin/sounds/827182/. BPM at 100, key F# Minor source: https://tunebat.com/Analyzer
    kick = loadSound('assets/sounds/kick.wav'); 
}

// set up canvas, sound features 
function setup() {
    count = 0;
    w = img.width;
    h = img.height;  

    // Canvas 
    let cnv = createCanvas(w, h); 
    //cnv.mousePressed(playOscillator); //disabled for drums 

    osc = new p5.Oscillator('sine'); // not used atm 

    cnv.mousePressed(beatIt);

    // image settings
    imageMode(CENTER);
    noStroke();
    background(255);
    img.loadPixels();
    img.filter(THRESHOLD); // options: GREY, INVERT, THRESHOLD
    

    // set up freq
    freqMin = 100;
    freqMax = 500; 

    // visual pix design, controls shape of pixels 
    hard = true; 
    amountSpecial = 10; 
    specialPix = random(0, amountSpecial); 

    // visual pix design, change 


    // buttons 
    button1 = createButton('hard/soft');
    button1.position(0, 100);
    button1.mousePressed(harden); 

   /* button2 = createButton('invert');
    button2.position(0, 150);
    button2.mousePressed(funk); */

    // slider 
    slider1 = createSlider(0, 255, 0);
    slider1.position(0, 200);
    slider1.size(80);
    text('Slide1: ', 0, 200);

    slider2 = createSlider(0, 255, 0);
    slider2.position(0, 300);
    slider2.size(80);
    slider2.mouseClicked(invertImg); // interaction, when slider used image inverts
    

    // sound filter (from p5 example)
    synthArp.loop(); // MUTES MAIN SOUND 
    synthArp.rate(map(slider2.value(), 0, 80, 1, 4)); //broken 
    console.log("slider: " + map(slider2.value(), 0, 80, 1, 4)); 
    filter = new p5.HighPass();
    
    // Connect the sound file to the filter
    synthArp.disconnect();
    synthArp.connect(filter);
    //synthArp.rate();
    //console.log("bpm" + (filter.getBPM()));

    // drums (code from p5 DOCS: )
    pattern = [1, 0, 1, 0, 1, 0, 1, 0]; // drum pattern 
    myPhrase = new p5.Phrase('drums', stepIt, pattern); // creates a new phrase called drums, calls stepIt to 
    myPart = new p5.Part(); 
    myPart.addPhrase(myPhrase);
    myPart.setBPM(100);     
}


function draw() {

    // Play w Visuals 
    drawPixBasic(); 

    // Play Music 
    freq = constrain(map(mouseX, 0, width, freqMin, freqMax), freqMin, freqMax);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
   
   if (playing) {
      osc.freq(freq, 0.1); // smooth the transitions by 0.1 seconds
      osc.amp(amp, 0.1); 
      
    }     
    
    filterFreq = map(slider1.value(), 0, 80, 10, 500); // maps freq in Hz, maps slider (0-80) onto desired frequency range

    filterRes = map(mouseY, 0, height, 10, 5);  // Map mouseY to resonance (volume boost) at the cutoff frequency

    // set filter parameters
    filter.set(filterFreq, filterRes);
    
}

/* VISUALIZER PLAYGROUND */ 

/* Draws Pixel Grid */
function drawPixBasic() { 

    
    /* Generates pixel for every row, column */
    for(let x = 0; x < img.width; x+=map(slider1.value(), 1, 80*2, 5, pixW)) { // columns for pix  
        //for(let y = 0; y < img.height; y+=map(freq, freqMin, freqMax, 5, pixH)) { // rows for pix
        for(let y = 0; y < img.height; y+=map(slider1.value(), 1, 80*2, 5, pixH)) { // rows for pix
            //console.log(slider.value());

            let sq = img.get(random(x-5, x+5), random(y+5, y-5)); // gets colour at x,y, shifts slightly by 10px at random for manic effect 
            
            push();
            //console.log(sq);

            // creates special pix
            if(specialPix % 2 == 0) {
                fill(255, 0, 0); // special colour
            }

            else {
                fill(sq, 0); // fills each square with amount 
            }

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


/* SOUND PLAYGROUND */

/* Starts Annoying Sound */
function playOscillator() {
    osc.start();
    playing = true;
  }
  
/* Fades annoying sound when mouse released */ 
function mouseReleased() {
    osc.amp(0, 0.5); // ramp up amplitude to 0 over 0.5 seconds
    playing = false;
}

/* Volume Editor ? */ 

/* Triggered when hard/soft button pressed */
function harden() {
    hard = !hard; 
}

/* Function wo Function */
function funk() {
    
}

/* Inverts Image */
function invertImg() {
    img.filter(INVERT);
}

function stepIt(time, playbackRate) {
    kick.rate(playbackRate);
    kick.play(time);


}

function beatIt(){
    userStartAudio(); 
    myPart.start(); 
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

