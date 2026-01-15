/**
 * Experiments w spirals
 * Skyla Trousdale
 */

"use strict";
let a = 0; 
 let r; 
 let x; 
 let y; 

let a2 = 0; 
let x2; 
let y2; 
let r2; 

let red; 
let green; 
let blue; 
let grey = 100; 
let factor = 3; 
let acount = 0; 
let spacing; 
let test = 0.5; 
let test2 = 1.5; 


function setup() {
    createCanvas(600, 600, WEBGL); 
    colorMode(HSB); // hue colour, saturation, brightness
    background(0);

}


function draw() {
    spiral(); 

}


function spiral() {

/*if(a>500) {
    if(grey > 200 || grey < 0) {
        factor*= -1;
        if(grey < 0) {
            acount = -acount
        }
    }
    
}*/

if(acount === 50 || acount < -8) {
        test*= -1; 
        test2 *= -1; 
    }

    acount += test;

    a = 0.3+acount; 
    grey += test2; 
    background(0); 


grey += test2; 

//grey += factor; 
stroke(grey, 60, grey); 
console.log(grey);

    for (let i = 0; i < 20000; i++) {  
        r = 0.9 * a;
        x = r * cos(a) + random(-acount, acount);
        y = r * sin(a);

        point(x, y);
        a += 0.4;
    }

    a+= 0.09; 



}