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

function preload() {
  img = loadImage('assets/images/skyla.jpg');
  synthArp = loadSound('assets/sounds/bark.wav');
}

function setup() {
    count = 0
    w = img.width;
    h = img.height; 
    createCanvas(w, h);
    imageMode(CENTER);
    noStroke();
    background(255);
    img.loadPixels();
    background(0, 200, 100);

    let startButton = createButton("play");
    let stopButton = createButton("stop");
    // set up what functions are when each button is clicked
   startButton.mousePressed(startMusic);
    stopButton.mousePressed(stopMusic);
    

}

function draw() {
    drawPixBasic(); 
    // Play Music 
     
}


function drawPixBasic() { 
  
    /* Generates pixel for every row, column */
    for(let x = 0; x < img.width; x+=15) { // columns for pix  
        for(let y = 0; y < img.height; y+=15) { // rows for pix

            let sq = img.get(random(x-5, x+5), random(y+5, y-5)); // gets colour at x,y, shifts slightly by 10px at random for manic effect 
            fill(sq, 0); // fills each square with amount 
            rect(x, y, pixH, pixW); // actually draw pixel 
        }
    }
}

function drawPixCol() {}




/* SOUND PLAYGROUND */ 

function startMusic() {
  synthArp.play(); 
}

function stopMusic() {
  synthArp.stop(); 
}


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