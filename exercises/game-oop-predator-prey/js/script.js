// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

//display pictures for predators and prey
let lionPic;
let tigerPic;
let skullPic;

//tells program whether or not player has started game
let playing = false;

function preload() {
  tigerPic = loadImage('assets/images/tiger.png');
  lionPic = loadImage('assets/images/lion.png');
  skullPic = loadImage('assets/images/skull.png')
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(random(width), random(height), 5, color(200, 150, 50), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16, tigerPic);
  //new predator that uses W, A, S, D for up, down, left, and right directions, respectively, space for sprint
  lion = new Predator(random(width), random(height), 5, color(200, 200, 0), 40, 87, 83, 65, 68, 32, lionPic);

  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  titleScreen();

  //play the game as long as either predator is living
  if ((tiger.living | lion.living) & playing) {
    // Clear the background to black
    background(0, 80, 0);

    // Handle input for the tiger
    tiger.handleInput();
    //handle input for the lion
    lion.handleInput();
    // Move all the "animals"
    tiger.move();
    lion.move();
    antelope.move();
    zebra.move();
    bee.move();

    // Handle the tiger eating any of the prey
    tiger.handleEating(antelope);
    tiger.handleEating(zebra);
    tiger.handleEating(bee);

    //handle the lion eating any of the prey
    lion.handleEating(antelope);
    lion.handleEating(zebra);
    lion.handleEating(bee);

    // Display all the "animals"
    tiger.display();
    lion.display();
    antelope.display();
    zebra.display();
    bee.display();
  }
  //if both are dead after game has started, end the game
  else if(playing) {
    gameOverScreen();
  }
}


//display title screen with controls for each Player
function titleScreen() {
  background(20, 200, 20);

push();
textSize(90);
textAlign(CENTER);
text("Jungle Prey", width/2, height/2);
pop();

let controlsText = "Controls:\n"; // \n means "new line"
controlsText = controlsText + "Player 1: Arrow keys, Shift to Sprint\n";
controlsText = controlsText + "Player 2: W, A, S, D, Space to Sprint\n\n\n"
controlsText = controlsText + "Click to Start!"

push();
textAlign(CENTER);
textSize(20);
text(controlsText, width/2, 7*height/12);
pop();

  if (mouseIsPressed) {
    playing = true;
  }
}


//shows game over screen, as well as score for each player
function gameOverScreen() {
  background(200, 25, 25);
  textAlign(CENTER);
  textSize(50);

  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "Player 1 ate " + tiger.preyEaten + " prey\n";
  gameOverText = gameOverText + "Player 2 ate " + lion.preyEaten + " prey\n"

  //explain who won or if there was a tie
  if (tiger.preyEaten > lion.preyEaten) {
    gameOverText = gameOverText + "Player 1 wins!"
  } else if (tiger.preyEaten < lion.preyEaten) {
    gameOverText = gameOverText + "Player 2 wins!"
  }
  //if neither has a higher score, there must be a tie
  else {
    gameOverText = gameOverText + "It's a tie!"
  }
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 3);
}
