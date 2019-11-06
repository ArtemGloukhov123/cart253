// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;
let tigerImage;

let hunter;

let bushes = [];
let bushAmount = 3;
let bushImage;

let zebraImage;
let zebra;


//array for storing sprout images to make background
let sprouts = [];
let sproutX = [];
let sproutY = [];
let numberOfSprouts = 35;

//preload
//
//preload the images
function preload() {
  for (let i = 0; i < numberOfSprouts; i++) {
    sprouts.push(loadImage('assets/images/sprout1.png'))
    sprouts.push(loadImage('assets/images/sprout2.png'))
    sprouts.push(loadImage('assets/images/sprout3.png'))
  }

  tigerImage = loadImage('assets/images/tiger.png');
  bushImage = loadImage('assets/images/bush.png');
  zebraImage = loadImage('assets/images/zebra.png');
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(tigerImage, 100, 100, 5, color(200, 200, 0), 40);

  hunter = new Hunter(random(width), random(height), 5, color(200, 200, 200), 20);

  bush = new Bush(bushImage, random(width), random(height));

  zebra = new Prey(zebraImage, 200, 200, 3, 100, 25);

  setSproutCoordinates();
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(128, 235, 52);
  displaySprouts();

  // Handle input for the tiger
  tiger.handleInput();
  hunter.move(tiger);

  // Move all the "animals"
  tiger.move();


  // Display all the "animals"
  tiger.display();
  hunter.display(tiger);

  hunter.handleChasing(tiger);

  tiger.handleHiding(bush);

  tiger.handleEating(zebra);

bush.display();

  hunter.handleEating(tiger);

  zebra.move(tiger);

  zebra.display(tiger);

  zebra.handleRunning(tiger);
}

//sets up all x and y values for the sprouts so that they may
//be redrawn at the same locations
function setSproutCoordinates() {
  for (let i = 0; i < numberOfSprouts; i++) {
    sproutX.push(random(width));
    sproutY.push(random(height));
  }
}

//displays sprouts at previously designated x and y values
function displaySprouts() {
  for (let i = 0; i < numberOfSprouts; i++) {
    image(sprouts[i], sproutX[i], sproutY[i]);
  }
}
