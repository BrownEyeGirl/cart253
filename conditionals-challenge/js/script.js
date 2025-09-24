/**
 * Circle Master
 * Pippin Barr + Skyla Trousdale 
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
    x: 200,
    y: 200,
    size: 100,
    fill: "#ff0000"
  };
  
  const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
  };
  
  /**
   * Create the canvas
   */
  function setup() {
    createCanvas(400, 400);
  }
  
  /**
   * Move the user circle, check for overlap, draw the two circles
   */
  function draw() {
    background("#aaaaaa");
    
    // Move user circle
    moveUser();
    
    // Draw the user and puck
    drawUser();
    drawPuck();

    movePuck(); 
  }
  
  /**
   * Sets the user position to the mouse position
   */
  function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
  }
  
  /**
   * Displays the user circle
   */
  function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
  }
  
  /**
   * Displays the puck circle
   */
  function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
  }

  function movePuck() {

   // let hype = sqrt((user.x - puck.x)**2 + (user.y-puck.y));
   // let ang = sin((user.y-puck.y) / hype); // opposite / hypotenous, hype
    
   

    if(dist(user.x, user.y, puck.x, puck.y) < puck.size/2) {

        let xfact = puck.x-user.x;  //
        let yfact = puck.y-user.y;  
        let fact = yfact/xfact;

        for(let i = 0; i < 100; i++) { // 
            if(puck.y > user.y) {
                puck.y -= 0.1*fact; // moves puck 
            }
            else if(puck.y < user.y) {
                puck.y += 0.1*fact; // moves puck
            }

            if(puck.x-user.x >= 0) {
                puck.x += 0.1; 
            }

            else if(puck.x-user.x < 0) {
                puck.x -= 0.1;
            }
            //console.log("funct" + fact + "puck x" + puck.x + " puck y" + puck.y);
        }

    }

  } 