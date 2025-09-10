/**
 * Dream Landscape 
 * Skyla Trousdale 
 * 
 * This is the drawing js code for the landscape. 
 */

"use strict";

/**
 * Sets sky
*/
function setup() {
    createCanvas(500,500);
    background("#D4F0F0"); 
}


/**
 * Draws clouds, 
*/
function draw() {
    clouds(); 
}


/**
 * Clouds
 */

function clouds() {
    fill(255); 
    noStroke();
    fill("#ffffcc");
    ellipse(80, 55, 40, 40); // sun 

    // cloud shadow
    fill(230);
    ellipse(110, 110, 50, 50); // base cloud
    ellipse(110, 180, 20, 20) // centre clouds

    ellipse(90, 150, 60, 60); 
    ellipse(130, 150, 60, 60);
    ellipse(60, 170, 30, 30);
    ellipse(155, 160, 30, 30);

    ellipse(180, 170, 20, 20);

    // cloud 1
    fill(255);
    ellipse(100, 100, 50, 50); // base cloud
    ellipse(100, 170, 20, 20) // centre clouds

    ellipse(80, 140, 60, 60); 
    ellipse(120, 140, 60, 60);
    ellipse(50, 160, 30, 30);
    ellipse(145, 150, 30, 30);

    ellipse(170, 160, 20, 20);

    // cloud 2 shadow 
    fill(230);
    ellipse(410, 210, 50, 50); // base cloud
    ellipse(410, 280, 20, 20) // centre clouds

    ellipse(390, 250, 60, 60); 
    ellipse(430, 250, 60, 60);
    ellipse(360, 270, 30, 30);
    ellipse(455, 260, 30, 30);

    ellipse(180, 170, 20, 20);

    // cloud 2 
    fill(255);
    ellipse(410, 200, 50, 50); // base cloud
    ellipse(410, 270, 20, 20) // centre clouds

    ellipse(390, 240, 60, 60); 
    ellipse(430, 240, 60, 60);
    ellipse(360, 260, 30, 30);
    ellipse(455, 250, 30, 30);

    ellipse(180, 160, 20, 20);

    

}