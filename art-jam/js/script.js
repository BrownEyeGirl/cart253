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


function preload() {
  img = loadImage('assets/images/skyla.jpg');
}

function setup() {
    count = 0
    w = img.width;
    console.log(img.width + "h: " + img.height);
    h = img.height; 
    createCanvas(w, h);
    imageMode(CENTER);
    noStroke();
    background(255);
    img.loadPixels();
}

function draw() {
    frameRate = 20000;
    let x = random(img.width);
    let y = random(img.height);
    count++; // for the red dots 
    let minecraft = map(mouseX, 0, width, 10,20);// generates the squares

    let sq = img.get(x, y);
    if(count % 7 == 0) {
        fill(200, 0, 0);

        console.log("yay!")
    }
        fill(sq, 0);
    rect(x, y, minecraft, minecraft);
  
}