// Face1
ellipse(212, 206, 283, 318);// Face
ellipse(150, 150, 50, 63);// Left eye
ellipse(250, 150, 50, 63);// Right eye
ellipse(212, 250, 190, 33);// Mouth

// Face1.2
noStroke();
background(100, 0, 194); // RGB
fill(255, 255, 0);
ellipse(212, 206, 283, 318);// Face
fill(0, 0, 0);
ellipse(150, 150, 50, 63);// Left eye
ellipse(250, 150, 50, 63);// Right eye
fill(255, 0, 0);
ellipse(212, 250, 190, 33);// Mouth
strokeWeight(15);
stroke(66, 43, 66);
line(133, 96, 261, 74);// Eyebrows

// Face2
ellipse(212, 206, 283, 318);// Face
ellipse(150, 150, 30, 30);// Left eye
ellipse(278, 150, 30, 30);// Right eye
ellipse(212, 250, 100, 73);// Mouth

// Face3
background(148, 251, 255); // RGB
noStroke();
fill(255, 255, 0);
ellipse(202, 208, 300, 300);// Face
fill(0, 0, 0);
ellipse(157, 151, 40, 40);// Eyes
ellipse(304, 142, 40, 40);// Eyes
fill(255, 0, 0);
ellipse(257, 240, 120, 136);// Mouth
strokeWeight(33);
stroke(250, 0, 242);
line(83, 116, 271, 74);// Headband

// Simple snowman
background(0, 255, 255);
fill(0, 255, 0);
rect(0, 293, 399, 144);// Ground
fill(255, 221, 0);
ellipse(80, 64, 100, 100);// The sun
fill(255, 255, 255);
ellipse(200, 300, 150, 150);// Bottom circle
ellipse(200, 185, 120, 120);// Middle circle
ellipse(200,105, 90, 90);// Top circle
line(160, 200, 53, 145);// Left hand
line(240, 201, 135, 150);// Right hand

// Simple robot
rect(76, 45, 250, 300); // Face
rect(126, 250, 152, 60); // Mouth
rect(140, 150, 30, 30); // Left eye
rect(240, 150, 30, 30); // Right eye
rect(175, 345, 50, 50); // Neck
line(140, 129, 270, 129);// Unibrow

// Bucktooth Bunny
var eyeSize = 15;
var teethLength = 15;
ellipse(150, 70, 60, 120);  // Left ear
ellipse(240, 70, 60, 120);  // Right ear
ellipse(200, 170, 150, 150);    // Face
fill(0, 0, 0);
ellipse(170, 150, eyeSize, eyeSize);  // Left eye
ellipse(230, 150, eyeSize, eyeSize);  // Right eye
line(150, 200, 250, 200);   // Mouth
noFill();
rect(185, 200, 15, teethLength); // Left tooth
rect(200, 200, 15, teethLength); // Right tooth

//Funky Frog
var x = 200;
var y = 250;
noStroke();
fill(30, 204, 91); // a nice froggy green!
ellipse(x, y, 200, 100); // face
ellipse(x - 50, y - 50, 40, 40); // left eye socket
ellipse(x + 50, y - 50, 40, 40); // right eye socket
fill(255, 255, 255); // for the whites of the eyes!
ellipse(x - 50, y - 50, 30, 30); // left eyeball
ellipse(x + 50, y - 50, 30, 30); // right eyeball
fill(0, 0, 0);
ellipse(x, y, 100, 20);
fill(0, 0, 0);
rect(x - 52, y - 58, 10, 10);
fill(0, 0, 0);
rect(x + 49, y - 58, 10, 10);

//Exploding Sun
noStroke();
// the beautiful blue sky
background(82, 222, 240);
// the starting size for the sun
var sunSize = 30; 
draw = function() {
 // The sun, a little circle on the horizon
fill(255, 204, 0);
ellipse(200, 298, sunSize, sunSize);
// The land, blocking half of the sun
fill(76, 168, 67);
rect(0, 300, 400, 100);
sunSize++;
};

//
noStroke();
var x = 200;
var y = 350;
var ballWidth = 300;
var ballHeight = 200;
draw = function() {
    background(255, 206, 71);
    fill(191, 0, 255);
    ellipse(x, y, ballWidth, ballHeight);
    x += 1;
    y -= 2;
    ballWidth *= 99/100;
    ballHeight /= 99/100;
}

//Parting Clouds
noStroke();
var leftX = 155;
var rightX = 279;
var sunRadius = 100;
draw = function() {
    background(184, 236, 255);
    fill(255, 170, 0);
    ellipse(200, 100, sunRadius, sunRadius);
    // clouds 
    fill(255, 255, 255);
    // left cloud
    ellipse(leftX, 150, 126, 97);
    ellipse(leftX+62, 150, 70, 60);
    ellipse(leftX-62, 150, 70, 60);
    // right cloud
    ellipse(rightX, 100, 126, 97);
    ellipse(rightX+62, 100, 70, 60);
    ellipse(rightX-62, 100, 70, 60);
    leftX--;
    rightX++;
    sunRadius += 2;
};

//Tasty Tomato
background(255, 255, 255);
var bite = 70;
noStroke();
fill(224, 90, 90);
ellipse(150, 200, 150, 150);
ellipse(212, 200, 150, 150);// Tomato
fill(48, 130, 31);
rect(176, 103, 12, 32); // Stem
 draw = function() {
    // Take a bite out of the tomato!
    fill(255, 255, 255);
    ellipse(mouseX, mouseY, bite, bite);
 };

// Mouse movement mania
draw = function() {
    fill(mouseX, mouseY, mouseY);
    stroke(mouseY, mouseX, (mouseX + mouseY)/2);
    ellipse(mouseX, mouseY, mouseY, mouseX);
};
