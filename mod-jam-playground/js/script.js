/**
 * <Debugging>
 * Skyla Trousdale and Pippin Barr
 * 
 * A game of catching flies with your flyTrap-tongue
 * 
 * Instructions:
 * - Move the flyTrap with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Canvas
let backgroundImg; 
let backgroundImgPos; 
let backgroundImgFlipped; 
let backgroundImgPink; 
let backgroundImgPinkFlipped; 
let flyTraps; 
 

// Text
let fontVT323; 

// Flytrap 
let flyTrapLeft;
let flyTrapRight;  
let flyTrapImg; 

// Game Funct
let button;
let gameState = "start";
let score = 0; 
let timer = {
    startTime: 2000,
    totalTime: 20,
    timePassed: 0,
    timeInterval: 0,
    topTime: 0
}


// flyTrap
const flyTrap = {
    // The flyTrap's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },

    tongue: {    // The flyTrap's tongue has a position, size, speed, and state
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        adjustment: 50, 
        state: "idle" // State can be: idle, outbound, inbound (determines how the tongue moves each frame)
    }
};

// Fly
const fly = { // Has a position, size, and speed of horizontal movement
    x: 0,
    y: 200, // Will be random
    size: 30,
    speed: 3
};
let flyImg; 

// DeBugging 
let bug = [false, false, false, false, false, false, false, false, false]; 
let flyTrapsBug;
let flyTrapRightBug; 
let flyTrapLeftBug;
let glitchGif; 

function preload() {
    glitchGif = createImg('assets/images/glitch.gif');
}

function setup() {

    // Canvas
    createCanvas(800, 500);
    background(0);
    backgroundImg = loadImage('assets/images/greyclouds.jpg') // https://i.pinimg.com/736x/a0/d3/70/a0d3704c3f420be1115c2310d24b6a3a.jpg
    backgroundImgFlipped = loadImage('assets/images/greycloudsflipped.jpg') // https://i.pinimg.com/736x/e4/a4/44/e4a444b5510ddc1e5a5215c5db0a2563.jpg
    backgroundImgPos = 0; 
    backgroundImgPink = loadImage('assets/images/pinkclouds.jpg');
    backgroundImgPinkFlipped = loadImage('assets/images/pinkcloudsflipped.jpg');

    // Text
    fontVT323 = loadFont('assets/fonts/VT323-Regular.ttf')


    // Characters 
    flyTraps  = loadImage('assets/images/flytraps.png'); 
   
    flyTrapLeft = loadImage('assets/images/flytrapleft.png');
    flyTrapRight = loadImage('assets/images/flytrapright.png') 
    flyTrapImg = flyTrapLeft; 
    flyImg = loadImage('assets/images/bug1.png')

    // Debugging 
    flyTrapsBug  = loadImage('assets/images/flytrapsbug.png'); 
    flyTrapsBug.filter(THRESHOLD); // broken  
    flyTrapLeftBug = loadImage('assets/images/flytrapleftbug.png');
    flyTrapRightBug = loadImage('assets/images/flytraprightbug.png'); 
    //glitchGif = createImg('assets/images/glitch.gif'); 
    //glitchGif.position(width, 0);

    // Play Button 
    button = createButton('play again?');
    setTimeout(startTheGame(),50000); // runs startTheGame() after 5000 miliseconds, 

    // Reset Game 
    resetFly();
}

function draw() {

    /* Activating Gamestates */
    deBug();

    if(gameState==="start") {
        startScreen();
    }

    else if(gameState==="play") {
        glitchGif.hide(); 
        gameScreen(); 
    }

    else if(gameState==="end") {
        endScreen();
    }
    
}



function doubleClicked() {
    glitchGif.hide(); 
}

/* SCREENS */  

/* Loading screen */ 
function startScreen() {
    console.log("in start screen");
    background(0, 200,200); 
    delayTime(500000);
}

/* Playing screen */ 
function gameScreen() {
    console.log("in game screen"); 

    drawSky(); 
    displayTimer();
    displayScore();
    if(bug[3]) {
    displayTopTime(); 
    }
  
    // from 'draw'
   // background("#87ceeb");
    moveFly();
    drawFly();

    moveFlyTrap();
    moveTongue();
    drawFlyTrap();
    checkTongueFlyOverlap();

    timer.timePassed = millis() - timer.startTime;

   // if(timer.totalTime-floor(timer.timePassed/1000) <= 0) {
    if(score > bug.length) {
        gameState = "end"; 
    }
}

/* Gameover screen */ 
function endScreen() {
    background(0, 0, 0);

    // glitchGif = createImg('assets/images/glitch.gif'); 
   // glitchGif.position(windowWidth/2-glitchGif.width/2, windowHeight/2-glitchGif.height/2);

    button.show();
    button.position(width/2, height/2);
    button.mousePressed(startTheGame);
}








/* GAME FUNCTIONS */ 

/* Starts the game */ 
function startTheGame() {
    reBug(); 
    gameState = "play";
    button.hide();
    timer.timePassed = 0; 
    timer.startTime = millis();
    //timer.timeInterval = millis() - timer.startTime;
    console.log(timer.timeInterval); 
    if(timer.timeInterval >= timer.topTime) {
        timer.topTime = timer.timeInterval; 
    }
    score = 0; 
}

/* Displays Score */
function displayScore() {
    //update bugs!
    if(bug.length > score) {
        bug[score] = true;
    }

    if(bug[2]) { // Bug 2
        push(); 
        if(bug[2]) {
            fill(255);
        }
        if(bug[3]){
            fill(0); 
        }
        textFont(fontVT323);
        textSize(40);
        text('Bugs: ' + score + ' / 12', width-200, 60);
        pop();
    }
}

/* Displays Top Score (called after score > 0) */
function displayTopTime() {
    push();
    fill(255, 25, 0); 
    textFont(fontVT323);
    textSize(40); 
    text('Top Time: ' + timer.topTime, width-200, 90);
    pop(); 
}

/* Displays Timer */
function displayTimer() {
    if(bug[1]) { // Bug 1
        push(); 
        fill(255); 
        if(bug[3]) {
            fill(0);
        }
        textFont(fontVT323);
        textSize(40); 
        timer.timeInterval = floor(timer.timePassed/1000);
        text('Time: ' + timer.timeInterval, width-760, 60);
        pop(); 
    }
}


/* Reset Fly */
function resetFly() { // Resets the fly to the left with a random y
    fly.x = 0;
    fly.y = random(20, height/3);
}

/* Fly Catch */
function checkTongueFlyOverlap() {

    // Fly Caught 
    const d = dist(flyTrap.tongue.x, flyTrap.tongue.y, fly.x, fly.y); //     // Get distance from tongue to fly
    const eaten = (d < flyTrap.tongue.size/2 + fly.size/2);  // Check if it's an overlap
    if (eaten) {
        resetFly();  // Reset the fly
        flyTrap.tongue.state = "inbound";  // Bring back the tongue

        // Score 
        score++; 
        console.log("score: " + score);

        /*// Glitch 
        for(int i )
        glitchGif.position(0, 0); 

    }*/
    }
}

/* Activate Tongue */
function mousePressed() { // Launch the tongue on click (if it's not launched yet)
    if (flyTrap.tongue.state === "idle") {
        flyTrap.tongue.state = "outbound";
    }
}










/* ANIMATION */ 


/* Moves flyTrap */
function moveFlyTrap() { // Moves the flyTrap to the mouse position on x 
    
    // Check positioin 
    if(mouseX < width/2) {
        flyTrapImg = flyTrapLeftBug; 
        flyTrap.body.x = mouseX;
        flyTrap.tongue.adjustment = -15;
    }
    else {
        flyTrapImg = flyTrapRightBug; 
         flyTrap.body.x = mouseX;
         flyTrap.tongue.adjustment = 15;
    }
    
}

/* Moves fly */
function moveFly() { // Moves the fly according to its speed, Resets the fly if it gets all the way to the right
    fly.x += fly.speed;     // Move the fly
    if (fly.x > width) {     // Handle the fly going off the canvas
        resetFly();
    }
}

/* Moves tongue */
function moveTongue() { // Handles moving the tongue based on its state
    
    flyTrap.tongue.x = flyTrap.body.x; // Tongue matches the flyTrap's x
    if (flyTrap.tongue.state === "idle") {  // If the tongue is idle, it doesn't do anything
        // Do nothing
        
    }
    
    else if (flyTrap.tongue.state === "outbound") { // If the tongue is outbound, it moves up
        flyTrap.tongue.y += -flyTrap.tongue.speed;
        if (flyTrap.tongue.y <= 10) { // The tongue bounces back if it hits the top
            flyTrap.tongue.state = "inbound";
        }
    }
   
    else if (flyTrap.tongue.state === "inbound") {  // If the tongue is inbound, it moves down
        flyTrap.tongue.y += flyTrap.tongue.speed;
        if (flyTrap.tongue.y >= height-150) {   // The tongue stops if it hits the bottom
            flyTrap.tongue.state = "idle";
        }
    }
}







/* GRAPHICS */ 

/* Draws the fly as a black circle */
function drawFly() {
    push();
    noStroke();
    fill(0, 255, 0);
    if(!bug[9]) {
        ellipse(fly.x, fly.y, fly.size-20);
    }
    else {
        flyImg.resize(40, 0); 
        image(flyImg, fly.x, fly.y); 
    }
    pop();
}

/* Draw Venus Fly Trap */
function drawFlyTrap() { // Displays the tongue (tip and line connection) and the flyTrap (body)
    
    // Tongue tip 
    push();
    fill("#044A34");
    noStroke();
    ellipse(flyTrap.tongue.x-+flyTrap.tongue.adjustment, flyTrap.tongue.y, map(flyTrap.tongue.y, 0, height, 30, 0));
    pop();

    // Tongue body 
    push();
    stroke("#044A34");
    strokeWeight(flyTrap.tongue.size);
    line(flyTrap.tongue.x-flyTrap.tongue.adjustment, flyTrap.tongue.y, flyTrap.body.x, 370); // changed to 350 so it rests in mouth
    pop();

    // Fly Trap's body
    flyTrapImg.resize(0, 200); 
    image(flyTrapImg, flyTrap.body.x-50, flyTrap.body.y-200); 
    push();
    fill("#00ff00");
    noStroke();
    //ellipse(flyTrap.body.x, flyTrap.body.y, flyTrap.body.size);
    pop();
}

/* Animate "gulp" */ 
function gulp() {
    // Fly swallowed 
}


/* Sky Graphics */ 
function drawSky() {
    background(0);

    
    backgroundImgPos = 0; 
    if(bug[6]) { // Bug 6
        backgroundImgPos = -(millis() / 100) % (2*width);
    }

    
    //frontwards sky 
    backgroundImg.resize(width, 0); 
    image(backgroundImg, backgroundImgPos, 0); 
    image(backgroundImg, backgroundImgPos+2*backgroundImg.width, 0); 


    //backwards sky 
    backgroundImgFlipped.resize(width, 0); 
    image(backgroundImgFlipped, backgroundImgPos+backgroundImg.width, 0); 

    if(!bug[5]) { // Bug 5
        background(255); 
    }

   

    // Background Flytraps 
    //flyTraps.filter(THRESHOLD);
    flyTrapsBug.resize(width-100, 0); 
    image(flyTrapsBug, 50, 0);

    if(!bug[4]) { // Bug 4
        background(255); 
    }

    // Bug 3
    if(!bug[3]) {
        background(0); 
    }
}


/* DE BUGGING  */

function deBug() {
    if(!bug[7]) { // Bug 7
        flyTrapLeftBug.filter(THRESHOLD);
        flyTrapRightBug.filter(THRESHOLD);
    }
    else {
        flyTrapLeftBug = flyTrapLeft;
        flyTrapRightBug = flyTrapRight; 
    }

    if(!bug[8]) { // Bug 8
      flyTrapsBug.filter(THRESHOLD)
    }
    else {
        flyTrapsBug = flyTraps;
    }

    if(bug[10]) { // Bug 10
        backgroundImg = backgroundImgPink;
        backgroundImgFlipped = backgroundImgPinkFlipped;
    }

    
}

function reBug() {
    flyTrapLeft = loadImage('assets/images/flytrapleft.png'); 
    flyTrapRight = loadImage('assets/images/flytrapright.png'); 
    flyTraps = loadImage('assets/images/flytraps.png')
    bug = [false, false, false, false, false, false, false, false, false, false, false];
}


