/**
 * Debugging
 * Skyla Trousdale and Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Canvas
let backgroundImg; 

// Game Funct
let button;
let gameState = "start";
let score = 0; 
let topScore = 0; 
let timer = {
    startTime: 2000,
    timePassed: 0,
    timeInterval: 10000
}


// Frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },

    tongue: {    // The frog's tongue has a position, size, speed, and state
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        state: "idle" // State can be: idle, outbound, inbound (determines how the tongue moves each frame)
    }
};

// Fly
const fly = { // Has a position, size, and speed of horizontal movement
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};


function setup() {

    // Canvas
    createCanvas(800, 500);
    background(0);
    backgroundImg = loadImage('assets/images/pinkclouds.jpg') // https://i.pinimg.com/736x/a0/d3/70/a0d3704c3f420be1115c2310d24b6a3a.jpg

    // Play Button 
    button = createButton('play again?');
    setTimeout(startTheGame(),5000); // runs startTheGame() after 5000 miliseconds, 

    // Reset Game 
    resetFly();
}

function draw() {

    // timing
    //console.log(millis()) // game starts at 5k millis, in the gamestate the start time was 5k

    /* Activating Gamestates */
    if(gameState==="start") {
        startScreen();
    }

    else if(gameState==="play") {
        gameScreen(); 
    }

    else if(gameState==="end") {
        endScreen();
    }
    
}



/* SCREENS */  

/* Loading screen */ 
function startScreen() {
    background(0, 200,200); 
    delayTime(500000000);
}

/* Playing screen */ 
function gameScreen() {
    console.log("in game screen"); 

    drawSky(); 
    displayTimer();
    displayScore();
    if(topScore > 0) {
        displayTopScore(); 
    }  
    // from 'draw'
   // background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();

    timer.timePassed = millis() - timer.startTime;

    if(10-floor(timer.timePassed/1000) <= 0) {
        gameState = "end"; 
    }
}

/* Gameover screen */ 
function endScreen() {
    background(0, 0, 0);
    button.show();
    button.position(width/2, height/2);
    button.mousePressed(startTheGame);
}








/* GAME FUNCTIONS */ 

/* Starts the game */ 
function startTheGame() {
    gameState = "play";
    button.hide();
    timer.timePassed = 0; 
    timer.timeInterval = 10000 + millis();
    timer.startTime = 2000 + millis();
    if(score > topScore) {
        topScore = score; 
    }
    score = 0; 
}

/* Displays Score */
function displayScore() {
    push(); 
    //fill(255);
    textSize(20);
    text('Score: ' + score, width-100, 60);
    pop(); 
}

/* Displays Top Score (called after score > 0) */
function displayTopScore() {
    push();
    fill(255, 255, 0); 
    textSize(20); 
    text('Top Score: ' + topScore, 50, 30);
    pop(); 
}

/* Displays Timer */
function displayTimer() {
    push(); 
    textSize(20); 
    text('Time: ' + (10-floor(timer.timePassed/1000)), width-100, 30);
    pop(); 
}


/* Resets the fly to the left with a random y */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/* Handles the tongue overlapping the fly */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";

        // Keep score
        score++; 
        console.log("score: " + score);
    }
}

/* Launch the tongue on click (if it's not launched yet) */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}










/* ANIMATION */ 

/* Moves frog */
function moveFrog() { // Moves the frog to the mouse position on x 
    frog.body.x = mouseX;
}

/* Moves fly */
function moveFly() { // Moves the fly according to its speed, Resets the fly if it gets all the way to the right
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/* Moves tongue */
function moveTongue() { // Handles moving the tongue based on its state
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}





/* GRAPHICS */ 

/* Draws the fly as a black circle */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/* Draw frog */
function drawFrog() { // Displays the tongue (tip and line connection) and the frog (body)
    
    // Tongue tip 
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Tongue body 
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}


/* Sky Graphics */ 
function drawSky() {
    background(255, 200, 200);
    backgroundImg.resize(0, width+10); 
    image(backgroundImg, 0, 0); 
}