/**
 * Thinking like a computer with instructions
 * Pippin Barr
 * 
 * An ultra simple example of instructions
 */

"use strict";
let ellipseSize = 40; 

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}


/**
 * Sets background, draws the eye
*/
function draw() {
    background(0); 
    push(); 
    full(255, 0, 0);
    ellipse(width/2, height/2, ellipseSize, ellipseSize); // height, width, built in variables that define the size of screen. 
    ellipse(mouseX, mouseY, ellipseSize, ellipseSize); 
    pop(); 
}