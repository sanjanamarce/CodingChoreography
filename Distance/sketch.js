/**
 * Maps distance between left hand, head, and right hand with a 
 * colored circle of oscillating size centered at the base of the 
 * spine (pelvis). The color of the circle becomes more red the closer 
 * the left hand gets to the head and more blue the closer the right 
 * hand gets to the head.

 
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.

@Author Sanjana Marcé (sm4397)
 */


// Declare kinectron
let kinectron = null;
let poses = [];

// Variables for circle
let a = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("10.18.18.73");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  //Nothing to see here
}

function bodyTracked(body) {
  background(150, 5);

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  let head = scaleJoint(body.joints[kinectron.HEAD]);
  let neck = scaleJoint(body.joints[kinectron.NECK]);
  let spineShoulder = scaleJoint(body.joints[kinectron.SPINESHOULDER]);
  let spineMid = scaleJoint(body.joints[kinectron.SPINEMID]);
  let spineBase = scaleJoint(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  let shoulderRight = scaleJoint(body.joints[kinectron.SHOULDERRIGHT]);
  let elbowRight = scaleJoint(body.joints[kinectron.ELBOWRIGHT]);
  let wristRight = scaleJoint(body.joints[kinectron.WRISTRIGHT]);
  let handRight = scaleJoint(body.joints[kinectron.HANDRIGHT]);
  let handTipRight = scaleJoint(body.joints[kinectron.HANDTIPRIGHT]);
  let thumbRight = scaleJoint(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  let shoulderLeft = scaleJoint(body.joints[kinectron.SHOULDERLEFT]);
  let elbowLeft = scaleJoint(body.joints[kinectron.ELBOWLEFT]);
  let wristLeft = scaleJoint(body.joints[kinectron.WRISTLEFT]);
  let handLeft = scaleJoint(body.joints[kinectron.HANDLEFT]);
  let handTipLeft = scaleJoint(body.joints[kinectron.HANDTIPLEFT]);
  let thumbLeft = scaleJoint(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  let hipRight = scaleJoint(body.joints[kinectron.HIPRIGHT]);
  let kneeRight = scaleJoint(body.joints[kinectron.KNEERIGHT]);
  let ankleRight = scaleJoint(body.joints[kinectron.ANKLERIGHT]);
  let footRight = scaleJoint(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  let hipLeft = scaleJoint(body.joints[kinectron.HIPLEFT]);
  let kneeLeft = scaleJoint(body.joints[kinectron.KNEELEFT]);
  let ankleLeft = scaleJoint(body.joints[kinectron.ANKLELEFT]);
  let footLeft = scaleJoint(body.joints[kinectron.FOOTLEFT]);

  // Pick 2 joints to connect
  let start = handTipLeft;
  let mid = head;
  let end = handTipRight;


  // Draw a line
  stroke(255);
  line(start.x, start.y, end.x, end.y);
  line(mid.x, mid.y, end.x, end.y);
  let d = dist(start.x, start.y, end.x, end.y);

  // Map the distance to angle speed
  let aspeed = map(d, 0, width, 0, PI/2);
  // Inverse, non-linear mapping
  //let aspeed = 1/d;

  a+=aspeed;

  noStroke();
	
  let fix_body_distance = sqrt((kneeRight.x - hipRight.x)*(kneeRight.x - hipRight.x) + (kneeRight.y - hipRight.y)*(kneeRight.y - hipRight.y))
  let l_handdist = abs(handTipLeft.x - neck.x);
  let r_handdist = abs(handTipRight.x - neck.x);
  let red = map(l_handdist, 0, 5*fix_body_distance, 0, 255); console.log("red" + red)
  console.log("blue" + blue)
  console.log("body" + fix_body_distance)
  //let green = map(handTipRight.x, 0, width, 0, 255);
  let blue = map(r_handdist, 0, 5*fix_body_distance, 0, 255);
  //fill(red,0,blue);

  //let sz = sin(frameCount * 0.01) * 200;
  //let sz = 100;
  //ellipse(spineShoulder.x,spineShoulder.y, sz, sz);

}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  let pos = scaleJoint(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}
