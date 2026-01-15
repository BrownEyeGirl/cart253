/** MAKKA
 * 
 * Skyla Trousdale 
 * 
 */





function setup() {
    createCanvas(600, 600, WEBGL);
    background(67, 0, 180);
}


function draw() {

    for(let x = 0; x < width; x++) {
        // Map the x-coordinate to the hue value.
        let h = map(x, 0, width-50, 100, mouseX+100);

        // Set the saturation value to 100.
        let s = 100;

        // Set the brightness value to 100.
        let b = 100;

        // Set the stroke color.
        stroke(h, s, b);
        strokeWeight(20);

        // Draw a vertical line.
        line(x, 0, x, height);
        
        
        rotate(-90); 
     }
}


function mouseClicked() {
    rotate(-90); 
}