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
  img = loadImage('assets/images/spooky.jpg');
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
}

function draw() {
    frameRate = 20;
    let x = random(img.width);
    let y = random(img.height);
    count++; // for the red dots 
    let minecraft = map(mouseX, 0, width, 10,70);// generates the squares
    let blood = map(mouseX, 0, width, 10,50); 

    let sq = img.get(x, y);
    if(count % 7 == 0) {
        fill(200, 0, 0);
        ellipse(x+20,y-30, blood, blood); 

        console.log("yay!")
    }
        fill(sq, 0);
    rect(x, y, minecraft, minecraft);
  
}