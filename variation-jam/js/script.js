/**
 * Variation Jam 
 * Skyla Trousdale
 * 
 * 
 */

"use strict";

let cols, rows; 
let size = 10;
/**
 * 
*/
function setup() {
    createCanvas(400, 400); 
    cols = width/size; 
    rows = height/size; 

}


/**
 * 
*/
function draw() {
    background(220);

    for(let i=0; i < cols; i++) {
        for(let j=0; j < rows; j++) {
            rect(i*size, j*size, size, size); 
        }
    }
    
}