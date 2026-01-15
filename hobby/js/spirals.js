
var x, y, size, theta = 0, num=2000;

function setup() {
  createCanvas(500, 500);
	stroke(255,150);
  fill(0);
}

function draw() {
  background(0,0,30);
	
  var x=width/2, y=height/2;
  var angle=0;
  var radius=1;
	
  for (var i=0; i<num; i++) {
    x = width/2 + sin(angle)*radius;
    y = height/2 + cos(angle)*radius;
    var size = map(sin(theta+TWO_PI/num*i*4), -1, 1, 0, 50);
    var scal = 0.5+1/num*2*i;

		if(i%9===0){
			//strokeWeight(3);
			//stroke(255,0,0);
            fill(255, 25, 250);
		} else {
			strokeWeight(1);
            stroke(25);
			//stroke(10,100,100);
			//stroke(255);
            fill(200, 40, 250);
            //noStroke(); 
    
			//stroke(255,200);
		}
	
    ellipse(x, y, size*scal*3, size*scal);
    angle += radians(30000000000000);
    radius += 0.3;
  }
	
  theta -= 0.04;
	
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}