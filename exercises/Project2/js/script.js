// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;
let hunter;

let bushImage;

let bush;

let zebra;

//preload
//
//preload the images
function preload() {
  bushImage = loadImage('assets/images/bush.png');
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);

  hunter = new Hunter(random(width), random(height), 5, color(200, 200, 200), 30);

  bush = new Bush(bushImage, random(width), random(height));

  zebra = new Prey(200, 200, 4, 100, 30);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();
  hunter.move(tiger);

  // Move all the "animals"
  tiger.move();


  // Display all the "animals"
  tiger.display();
  //hunter.display(tiger);

  //hunter.handleChasing(tiger);

  tiger.handleHiding(bush);

  tiger.handleEating(zebra);

  bush.display();

  //hunter.handleEating(tiger);

  zebra.move(tiger);

  zebra.display(tiger);

  zebra.handleRunning(tiger);
}
