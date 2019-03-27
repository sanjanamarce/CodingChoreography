// @Authors: Sanjana Marce & Allie Costa

let x, y, px, py, theta; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  theta=0;
  x = width/2; 
  y = height/2; 
  px = x; 
  py = y;


  background(0);
}

function draw() {
 
  if (keyIsPressed) {
    theta += 1;
    x += px/4*cos(theta);
    y += px/4*sin(theta);
    strokeWeight(3);
    let red = map(y, 0, windowHeight, 0, 255);
    let green = map(mouseY, 0, windowHeight, 0, 255);
    let blue = map(mouseX,0,windowWidth,0,255);
    stroke(red,green,blue);
    point(x,y);
  }
  else{
    x += random(-10,10);
  	y += random(-10,10);
  
    strokeWeight(1);
    stroke(255);
    line(px, py, x, y); 

    px = x;
    py = y;  
  }
}