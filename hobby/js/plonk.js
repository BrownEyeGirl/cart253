

//guides 
let margin = 30;  
let spacing = 30;  
let field;  

// circle size guides 
let size = 10; 

let shapes = ['square', 'circle'];
let shape = 0; 


function setup() { 
    createCanvas(600, 600); 
    background(255);

    // spacing 
    field = width;//-2*margin; 

    
}

function draw() {
    background(random(20, 30), 0, random(20, 30)); 
    renderShaps(); 
}


function renderShaps() {
    for(let r = 0; r < height; r++) {
        if(r%(field/spacing)===0) {
            for(let c = 0; c < width; c++) {
                if(c%(field/spacing)===0) {
                    size = map(dist(c, r, mouseX, mouseY), 0, width, 30, 0); 
                     //map(d, 0, 300, 30, 5);

                    //size = constrain(1, 50); 
                    //translate(mouseX, mouseY);
                    noStroke(); 
                    fill(map(dist(c, r, mouseX, mouseY), 0, width, 255, 0), 140, 200);
                    ellipse(c, r, size);

                    

                }
            }
        }
    }
}