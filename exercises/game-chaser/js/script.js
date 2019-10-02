"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;
let testVariable;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
let playerSprintSpeed = 4;
let playerSpeedConstraint;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 0;

let playerSize;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 5;
//times used for perlin function
let tx;
let ty;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 255;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 20;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

let bark;
let meow;
let backgroundImage;

// preload()
//
// Preloads game's images and sounds to be used in the code
function preload(){
  bark = new Audio("assets/sounds/bark.wav");
  meow = new Audio("assets/sounds/meow.mp3");
  backgroundImage = loadImage("assets/images/carpet.png")
}


// setup()
//
// Sets up the basic elements of the game
function setup() {
  tx = random(0,1000);
  ty = random(0,1000);

  createCanvas(500, 500);

  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  image(backgroundImage, 0, 0);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    barkMessage();
    energyBar();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
//The more the player eats, the
playerSpeedConstraint = sqrt(0.05 * preyEaten);
  // Check for horizontal movement

  //check if player is sprinting
  if (!keyIsDown(SHIFT)) {
    if (keyIsDown(LEFT_ARROW)) {
      playerVX = -playerMaxSpeed + playerSpeedConstraint;
    }
      else if (keyIsDown(RIGHT_ARROW)) {
        playerVX = playerMaxSpeed - playerSpeedConstraint;
      }
      else {
        playerVX = 0;
      }

    // Check for vertical movement
    if (keyIsDown(UP_ARROW)) {
      playerVY = -playerMaxSpeed + playerSpeedConstraint;
    }
      else if (keyIsDown(DOWN_ARROW)) {
        playerVY = playerMaxSpeed - playerSpeedConstraint;
      }
      else {
        playerVY = 0;
      }
  }

  else{
    if (keyIsDown(LEFT_ARROW)) {
      playerVX = -playerSprintSpeed + 1.5 * playerSpeedConstraint;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      playerVX = playerSprintSpeed - 1.5 * playerSpeedConstraint;
    }
    else {
      playerVX = 0;
    }

    // Check for vertical movement
    if (keyIsDown(UP_ARROW)) {
      playerVY = -playerSprintSpeed + 1.5 * playerSpeedConstraint;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      playerVY = playerSprintSpeed - 1.5 * playerSpeedConstraint;
    }
    else {
      playerVY = 0;
    }
  }
if (keyIsDown(32)){
  bark.play();
}

}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  if (keyIsDown(SHIFT)){
    playerHealth = playerHealth - 1.2;
  }
  else {
    playerHealth = playerHealth - 0.5;
  }
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
  console.log("prey health is " + preyHealth);
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  //changed playerradius to playersize/2 as the size changes with time, and so must the hitbox
  if (d < (playerSize/2) + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    //altered the constraint to account for prey gaining health as game goes
    preyHealth = constrain(preyHealth, 0, 300);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      //play meow sound
      meow.play();

      // Give it full health
      preyHealth = preyMaxHealth + preyEaten * 10;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  //maps the values of the noise "0 to 1" to ""-preyMaxSpeed to +preyMaxSpeed"
  //without mapping, the prey only moves in +x and +y directions, so bottom right
  preyVX = map(noise(tx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(ty), 0, 1, -preyMaxSpeed, preyMaxSpeed);

  tx += 0.07;
  ty += 0.07;

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  stroke(0);
  strokeWeight(2);
  fill(preyFill, preyHealth);
  ellipse(preyX, preyY, preyRadius * 2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  playerSize = playerRadius * 2 + preyEaten * 5;

  fill(playerFill, playerHealth);
  ellipse(playerX, playerY, playerSize);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  background(255, 0, 0);
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You caught the cat " + preyEaten + " times\n";
  gameOverText = gameOverText + "before you got tired."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

//message telling the player how to barkMessage
//its a useless function, meant just for atmospheric purposes
function barkMessage() {
  textFont("Helvetica", 20);
  fill(50);
  textAlign(LEFT);

  let message = "Press 'Space' to bark\n";
  message = message + "Press 'Shift' to run"

  text(message, 10, height-35);
}

function energyBar() {
  text("Energy: ", 10, 25)
  strokeWeight(1);
  fill(playerHealth);
  rect(85, 5, playerHealth, 25);
}

//wooden floor image found at
//https://yaoota.com/en-ng/product/universal-laminate-wooden-floor-8mm-colorful-stripe-light-price-from-jumia-nigeria

//carpet image found at
//https://www.homedepot.com/p/Safavieh-Lyndhurst-Red-Black-8-ft-x-8-ft-Square-Area-Rug-LNH331B-8SQ/205406117
