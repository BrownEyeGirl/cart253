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
    illuminatiHouse();
}


/**
 * Clouds
 */

function clouds() {
    fill(255); 
    noStroke();

    fill("ffffe6");
    ellipse(80,55,50,50);
    fill("#ffffcc");
    ellipse(80, 55, 40, 40); // sun 
    fill("#ffeecc");
    ellipse(80, 55, 30, 30);

    // cloud shadow
    fill(230);
    ellipse(110, 110, 50, 50);
    ellipse(110, 180, 20, 20);

    ellipse(90, 150, 60, 60); 
    ellipse(130, 150, 60, 60);
    ellipse(60, 170, 30, 30);
    ellipse(155, 160, 30, 30);

    ellipse(180, 170, 20, 20);

    // cloud 1
    fill(255);
    ellipse(100, 100, 50, 50); 
    ellipse(100, 170, 20, 20);

    ellipse(80, 140, 60, 60); 
    ellipse(120, 140, 60, 60);
    ellipse(50, 160, 30, 30);
    ellipse(145, 150, 30, 30);

    ellipse(170, 160, 20, 20);

    // cloud 2 shadow 
    fill(230);
    ellipse(410, 210, 50, 50); 
    ellipse(410, 280, 20, 20);

    ellipse(390, 250, 60, 60); 
    ellipse(430, 250, 60, 60);
    ellipse(360, 270, 30, 30);
    ellipse(455, 260, 30, 30);

    ellipse(180, 170, 20, 20);

    // cloud 2 
    fill(255);
    ellipse(410, 200, 50, 50); 
    ellipse(410, 270, 20, 20);

    ellipse(390, 240, 60, 60); 
    ellipse(430, 240, 60, 60);
    ellipse(360, 260, 30, 30);
    ellipse(455, 250, 30, 30);

    ellipse(180, 160, 20, 20);

    

}


function illuminatiHouse(){

    // House
    push();
    noStroke();
    fill("#4f261cff");
    rect(300, 50, 30, 100); // Chimney
    fill("#92b787ff")
    rect(150, 150, 200, 200) // house base
    fill("#3a1907ff")
    rect(225, 270, 50, 80) // door
    fill("#c2f1e7ff")
    ellipse(200, 225, 50) // window left
    ellipse(300, 225, 50) // window right
    pop();
    
    // Roof
    push();
    noStroke();
    fill("#0e6e0eff")
    triangle(250, 50, 400, 180, 100, 180)
    pop();
    
    // Eye
    push();
    noStroke();
    fill("#ffffff");
    ellipse(250, 120, 100, 50);
    fill("#000000");
    ellipse(250, 120, 40, 50);
    pop();
    
    }