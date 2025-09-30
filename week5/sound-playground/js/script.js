/**
* Sound Playground
* Skyla Trousdale
*
*/


"use strict";


// Sounds
let barkSFX = undefined; // variable to store "bark" sound, undefined because variable is currently empty
let dogPantingSFX = undefined;
let landlineSFX = undefined;


// Control
let bass;
let slider;
let fft1;  // Fast Fourier Transform - mathematical technique for converting a signal from the time domain into the frequency domain.
let osc; //
let delay;

// Melody 
let synth, soundLoop;
let notePattern = [69, 69, 69, 69];





/**
* Preload sounds
*/
function preload() {


   // Sounds
   barkSFX = loadSound("assets/sounds/bark.wav");
   dogPantingSFX = loadSound("assets/sounds/dogpanting.wav");
   landlineSFX = loadSound("assets/sounds/landline.wav");
}


function setup() {
   // Controls
   bass = false;
   createCanvas(720, 256);
 


   // BPM Slider
   slider = createSlider(0, 255);
   slider.position(10, 10);
   slider.size(80);


   // Melody
   let intervalInSeconds = 0.2;
   soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
   synth = new p5.MonoSynth();
   let fft1 = new p5.FFT();

}


function draw() {
    background(200);
   notePattern = [random(50,70), random(50,70), random(50,70), 72];
   
}


function mousePressed() {
   // This is how you play a sound!
   // It will play EACH TIME the user clicks
   //landlineSFX.play();
   //dogPantingSFX.play();
}

function keyPressed(event) {
    if (event.key === "b") {
        bass = !bass; 
        if(bass) {bassLoop();}
    }

    if(event.key === "j") {
        userStartAudio();

        if (soundLoop.isPlaying) {
          soundLoop.stop();
        } else {
          // start the loop
          soundLoop.start();
        }
    }
 }

 function onSoundLoop(timeFromNow) {
    let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
    let note = midiToFreq(notePattern[noteIndex]);
    synth.play(note, 0.5, timeFromNow);
    background(noteIndex * 360 / notePattern.length, 50, 100);

    // Visuals (not working) 
    /*// returns an array of amplitude values (black)
    let waveform = fft1.waveform();
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++){
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x,y);
    }
    endShape();*/
}

function bassLoop() {
    delay = new p5.Delay();
    delay.process(barkSFX, 0.9);
    barkSFX.play();

 }


/* for "vocals"
function keyPressed(event) {
   if (event.key === "r") {
       background(0);
       barkSFX.play();
   }
}




function keyReleased(event) {
   if (event.key === "r" || event.key === "b") {
       background(200);
       barkSFX.play();
   }
} */


