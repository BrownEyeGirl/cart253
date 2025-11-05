/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

let counter; 
let strokeCol; 

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
    counter = 0; //sets counters to zero 
    strokeCol = 0; 
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("pink");
    
    for(let space = 0; space <= width; space+=10) {
        // while lines are still on page, draw another line.
        while(counter <= width) {
            stroke(strokeCol); 
            line(space, 0, space, height); 

            strokeCol= space/2; 
            counter+=50; // increases counter 
            //console.log(space);
        }

        counter = 0; //sets counters to zero again
       // strokeCol = 0;

        while(counter <= height) {
            stroke(strokeCol); 
            line(0, space, width, space); 

           strokeCol= space/2; 
            counter+= 50; // increases counter 
        }

        counter = 0; //sets counters to zero again
        //strokeCol = 0;
   }

/*
    stroke(0);
    line(0, 0, 0, height);
    
    stroke(25);
    line(50, 0, 50, height);
    
    stroke(50);
    line(100, 0, 100, height);
    
    stroke(75);
    line(150, 0, 150, height);
    
    stroke(100);
    line(200, 0, 200, height);
    
    stroke(125);
    line(250, 0, 250, height);
    
    stroke(150);
    line(300, 0, 300, height);
    
    stroke(175);
    line(350, 0, 350, height);
    
    stroke(200);
    line(400, 0, 400, height);
    
    stroke(225);
    line(450, 0, 450, height);
    
    stroke(250);
    line(500, 0, 500, height); */
}