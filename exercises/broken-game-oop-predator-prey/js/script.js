"use strict";

// Predator-Prey Simulation
// by Pippin Barr
// Corrected by Artem Gloukhov
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
let antelope; //FIXED "antelop" to "antelope"
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
//FIXED, "functionsetup" to "function setup"
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40); //FIXED, removed unnecessary comma
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60); //FIXED, added proper Y value
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0); //FIXED "backgroun" to "background"

  // Handle input for the tiger
  tiger.handleInput(); //FIXED, added "tiger.handleInput();"

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move(); //FIXED, added bee.move()

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display(); //FIXED "antelop" to "antelope"
  zebra.display(); //FIXED "disploy" to "display"
  bee.display(); //FIXED "b" to "bee"
}
