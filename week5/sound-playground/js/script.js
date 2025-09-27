/**
 * Sound Playground
 * Skyla Trousdale 
 * 
 */

"use strict";


let barkSFX = undefined; // variable to store "bark" sound, undefined because variable is currently empty 

/**
 * Load our bark sound
 */
function preload() {
    // This is how you load a sound!
    // Note that loadSound() needs the PATH to your sound inside your project
    // Note that the path is CASE SENSITIVE
    // Note that the filename is CASE SENSITIVE
    // Note the QUOTE MARKS around the path
    barkSFX = loadSound("assets/sounds/bark.wav");
}

function setup() {
    createCanvas(640, 480);
}

function draw() {
    background(0);
}

function mousePressed() {
    // This is how you play a sound!
    // It will play EACH TIME the user clicks
    barkSFX.play();
}