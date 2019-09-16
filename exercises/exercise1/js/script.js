// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

let catPic;     //picture of a sad cat

let picWidth = 400;   //catPic width
let picHeight = 250;  //catPic height
let picX = -picWidth; //cat pic starts off left side of canvas
let picY = 320;       //cat pic is centered vertically

let clownPicWidth = 200;
let clownPicHeight = 200;
let clownPicX = -clownPicWidth; //clown picture starts off left side of createCanvas
let clownPicY = 320;            //clown pic is centered vertically

let exampleText = "example text";

// preload()
//
// Nothing here


function preload()
{
catPic  = loadImage("assets/images/cryingcat.jpg");  //preloads picture to save loading times
clownPic = loadImage("assets/images/clown.png")      //preloads picture of clown
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

  imageMode(CENTER);

}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw()
{
  // We don't fill the background so we get a drawing effect

  image(catPic, picX, picY, picWidth, picHeight); //display cat picture
  picX ++;      //have the picture move from left to right

  image(clownPic, clownPicX, clownPicY, clownPicWidth, clownPicHeight);
  clownPicX = clownPicX + 0.5;
  clownPicY = 50 * (sin(0.1 * clownPicX)) + 320;

  //display black text
  fill(0);
  text(exampleText, mouseX, mouseY);

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;

  // Make the circle transparent red
  fill(255,0,0,10);

  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;

  // Make the square transparent blue
  fill(0,0,255,10);

  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

}
