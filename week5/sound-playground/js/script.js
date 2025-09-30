/**
 * Sound Playground
 * Skyla Trousdale 
 * 
 */

"use strict";


let barkSFX = undefined; // variable to store "bark" sound, undefined because variable is currently empty 
let dogPantingSFX = undefined;
//let landlineSFX = undefined; 
let bassLoop; 
let slider; 

/**
 * Preload sounds 
 */
function preload() {
    // Note that loadSound() needs the PATH to your sound inside your project

    barkSFX = loadSound("assets/sounds/bark.wav");
    dogPantingSFX = loadSound("assets/sounds/dogpanting.wav");
}

function setup() {
    bassLoop = false;

    createCanvas(640, 480);

    // BPM Slider 
    slider = createSlider(0, 255);
    slider.position(10, 10);
    slider.size(80);

}

function draw() {
    background(100);
}

function mousePressed() {
    // This is how you play a sound!
    // It will play EACH TIME the user clicks
    barkSFX.play();
    dogPantingSFX.play(); 
}




function bassLooop() {

}