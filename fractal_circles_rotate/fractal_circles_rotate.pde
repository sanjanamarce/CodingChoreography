/**
 * @Author: Sanjana Marcé
 */

int fractal_depth = 0; // starts with 1 circle drawn, constrained to 6 maximum
float theta = 0; 
float diameter = 800; // diameter of largest circle

// Mode option (change by pressing SHIFT key)
// mode1 = true (default)
//    Left and right arrows rotate the existing fractal at constant speed, left 
//    for counterclockwise, right for clockwise
//
// mode1 = false
//    Left and right halves of fractal rotate in opposite directions
boolean mode1 = true; 


void setup() {
  size(800, 800);
}

void draw() {
  background(255);

  translate(width / 2, height / 2); // move origin to middle of canvas
  draw_fractal(diameter, fractal_depth);
}

void draw_fractal(float d, int c) {
  fill(0,20);
  ellipse(0, 0, d, d); 

  if (d < 10 || c == 0)          // don't draw circles smaller than 100x100
    return;
    
  stroke(0);
  
  if (mode1){
    for (int n = 0; n < 4; n++)
    {
      pushMatrix();      // save the origin
      
      if (n == 0) translate(cos(theta)*d/4, sin(theta)*d/4);
      else if (n == 1) translate(-sin(theta)*d/4, cos(theta)*d/4);
      else if (n == 2) translate(-cos(theta)*d/4, -sin(theta)*d/4);
      else translate(sin(theta)*d/4, -cos(theta)*d/4);
      
      draw_fractal(d / 2, c - 1);  // recursive step to draw next smallest circle
      popMatrix();          // revert to previous origin
  
    }
  }
  else {
    pushMatrix();         // save the origin, we're about to change it
    translate(cos(theta)*d/4, sin(theta)*d/4); // move the origin straight down to the 1/4 mark
    draw_fractal(d / 2, c - 1);  // restart the process at half the scale
    popMatrix();
  
    pushMatrix();
    translate(-cos(theta)*d/4, sin(theta)*d/4); // move the origin straight down to the 1/4 mark
    draw_fractal(d / 2, c - 1);
    popMatrix();
  
    pushMatrix();
    translate(cos(theta)*d/4, -sin(theta)*d/4); // move the origin straight down to the 1/4 mark
    draw_fractal(d / 2, c - 1);
    popMatrix();
  
    pushMatrix();
    translate(-cos(theta)*d/4, -sin(theta)*d/4); // move the origin straight down to the 1/4 mark
    draw_fractal(d / 2, c - 1);
    popMatrix();
  }
}

void keyPressed() {
  // UP/DOWN to change fractal depth (spawn more or less circles)
  // LEFT/RIGHT to rotate in either direction
  // SHIFT to switch rotation modes
  switch (keyCode) {
    
    case UP:
      fractal_depth++;
      break;
    case DOWN:
      fractal_depth--;
      break;
    case RIGHT:
      theta+= 0.05;
      break;
    case LEFT:
      theta-= 0.05;
      break;
    case SHIFT:
      mode1 = !mode1;
      break;
  }

  fractal_depth = constrain(fractal_depth, 0, 6);

}
