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
    movePuck(); 
    
    // Draw the user and puck
    drawUser();
    drawPuck();

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

    if(dist(user.x, user.y, puck.x, puck.y) < puck.size/2) {
        let velX = 0.2;
        let velY = 0.2;

        if(puck.y >= user.y) {
            velY *= 1; // moves puck down

        }
         if(puck.y < user.y) {
            velY *= -1; // moves puck up 
        }

        if(puck.x < user.x) {
            velX *= -1; // moves puck left 
        }

        if(puck.x >= user.x) {
            velX *= 1; // moves puck right
        }
    }

   //puck.x += velX;
   // puck.y += velY;



        //let circleX = constrain(mouseX, inner, width - inner);
       // let circleY = constrain(mouseY, inner, height - inner);
        
    

        


    //let a = atan2(abs(user.x-puck.y), abs(user.y-puck.y)); // finds angle 

   // let hype = sqrt((user.x - puck.x)**2 + (user.y-puck.y));
   // let ang = sin((user.y-puck.y) / hype); // opposite / hypotenous, hype
   





   /*

    if(dist(user.x, user.y, puck.x, puck.y) < puck.size/2) {

    

        let xfact = abs(puck.x-user.x); 
        let yfact = abs(puck.y-user.y);

        let scaleY = yfact/xfact;
    }
        
        let vel = 2;

        if(puck.y >= user.y) {
            puck.y += vel; // moves puck down

        }
         if(puck.y < user.y) {
            puck.y -= vel; // moves puck up 
        }

        if(puck.x < user.x) {
            puck.x -= vel; // moves puck left 
        }

        if(puck.x >= user.x) {
            puck.x += vel; // moves puck right
        }
*/

        
    
  } 

















  /* GRAVEYARD 
   
    } */