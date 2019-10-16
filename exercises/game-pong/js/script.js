"use strict";

// Pong
// by Artem Gloukhov
//
// Play Pong against the computer

// Whether the game has started
let playing = false;
let gameOver = false; //whether the player has lost

//determines the level of the game, starts at level 1
let level = 1;
//tells the program that the level number is being displayed
let displayingLevelNumber = true;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

let playerMaxHealth = 5;
let enemyMaxHealth = 2;
let playerHealth = playerMaxHealth;
let enemyHealth = enemyMaxHealth;
let playerHeart;
let enemyHeart;

let playerDefaultSize = 70;
let enemyDefaultSize = 70;
// BALL

let ballDefaultSpeed = 5;
// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: ballDefaultSpeed,
}

// PADDLES

//enemy and player default speeds, these change as the game goes
let paddleDefaultSpeed = 5;
let enemyDefaultSpeed = 4.3;

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: enemyDefaultSize,
  vy: 0,
  speed: enemyDefaultSpeed,
  //upkey and downkey not needed anymore as left paddle is controlled by the code
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: playerDefaultSize,
  vy: 0,
  speed: paddleDefaultSpeed,
  upKey: 38,
  downKey: 40
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;
let beepPaddle; //different sound for when ball hits paddle
let beepOut; //sound for when ball is out of bounds on player's side
let beepScore; //sound for when player scores a point

//x positions for starting the ball
let ballStartEnemySide = {
  x: 50,
  y: leftPaddle.y
}

let ballStartPlayerSide = {
  x: 630,
  y: rightPaddle.y
}

// preload()
//
// Loads the beep audio for the sound of bouncing
// and images of hearts to represent health
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  beepPaddle = new Audio("assets/sounds/beep2.wav");
  beepOut = new Audio("assets/sounds/beep3.wav");
  beepScore = new Audio("assets/sounds/beep4.wav");

  playerHeart = loadImage("assets/images/heart.png");
  enemyHeart = loadImage("assets/images/enemyheart.png");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(680, 580);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall(ballStartPlayerSide.x, height / 2);
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(bgColor);
  displayStartMessage();

  //display the number of the current level
  if (playing & !gameOver & displayingLevelNumber) {
    displayLevel();
  }

  //game is ready to play
  if (playing & !gameOver & !displayingLevelNumber) {
    background(bgColor);

    // If the game is in play, we handle input and move the elements around
    handleInput(rightPaddle);
    handleAI();
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    displayEnemyHealth();
    displayPlayerHealth();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    //check if player lost all health
    checkIfGameOver();
    //check if ball passes canvas on left or right sides
    ballIsOutOfBounds();

    //display the paddles
    displayPaddle(leftPaddle);
    displayPaddle(rightPaddle);
    displayBall();

    //check if conditions are met to advance to next level (enemy lost all health)
    levelUp();

  } else if (gameOver) {
    //if player loses all health, game is over
    gameOverScreen();
  }


}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
  //constrain the paddles' movements to inside the playing area
  paddle.y = constrain(paddle.y, 0 + paddle.h / 2, height - paddle.h / 2);
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x < 0) {
    leftPaddle.h += 25; //make enemy larger to give them slight advantage
    rightPaddle.h = enemyDefaultSize; //reset other to default size
    leftPaddle.speed += 1.4; //increase enemy speed
    enemyHealth--; //decrease enemy health
    ball.speed = ballDefaultSpeed; //reset ball speed to default

    beepScore.currentTime = 0;
    beepScore.play();
    ballStartEnemySide.y = leftPaddle.y; //ball starts on opponent's side
    resetBall(ballStartEnemySide.x, ballStartEnemySide.y);
  }

  if (ball.x > width) {
    rightPaddle.h += 25; //make player larger to give them slight advantage
    leftPaddle.h = enemyDefaultSize; //reset other to default size
    leftPaddle.speed -= 0.3; //decrease enemy speed
    playerHealth--; //decrease player health
    ball.speed = ballDefaultSpeed; //reset ball speed to default

    beepOut.currentTime = 0;
    beepOut.play();
    ballStartPlayerSide.y = rightPaddle.y; //ball starts on player's side
    resetBall(ballStartPlayerSide.x, ballStartPlayerSide.y);
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      let d = dist(ball.x, ball.y, paddle.x, paddle.y);

      ball.vx = -ball.vx;

      //check if ball hit top half of paddle
      if (ball.y < paddle.y) {
        ball.vy = -(d / 35) * ballDefaultSpeed;
      }

      if (ball.y > paddle.y) {
        ball.vy = (d / 35) * ballDefaultSpeed;
      }
      // Play our bouncing sound effect by rewinding and then playing
      beepPaddle.currentTime = 0;
      beepPaddle.play();

      //ball gets faster each time it hits a paddle
      ball.vy *= 1.1;
      ball.vx *= 1.1;
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  rect(ball.x, ball.y, ball.size, ball.size);
}


// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall(x, y) {
  // Initialise the ball's position and velocity
  ball.x = x;
  ball.y = y;

  if (x < width / 2) {
    ball.vx = ball.speed; //ball goes right from enemy's side
  }
  if (x > width / 2) {
    ball.vx = -ball.speed; //ball goes left from player's side
  }
  //ball is launched at a random vertical speed
  ball.vy = map(random(ball.speed), 0, ball.speed, -ball.speed, ball.speed);
}


// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();

  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK TO START", width / 2, height / 2);

  if (mouseIsPressed) {
    playing = true;
  }
  pop();
}


//handle computer player movement
function handleAI() {
  enemyParameters();

  //check if ball is coming towards enemy paddle
  if (ball.vx < 0) {
    if (ball.y > leftPaddle.y) {
      leftPaddle.vy = leftPaddle.speed
    }
    if (ball.y < leftPaddle.y) {
      leftPaddle.vy = -leftPaddle.speed
    }
  } else {
    //paddle doesn't move when ball is going away from it
    leftPaddle.vy = 0;
  }
}

//display the enemy's health with hearts
function displayEnemyHealth() {
  //set x position for heart
  let heartX = 5;

  //display as may heart as enemy's health value
  for (let i = 0; i < enemyHealth; i++) {
    image(enemyHeart, heartX, 7);

    //set x position for next heart image
    heartX += enemyHeart.width + 5;
  }
}


//display the player's health with hearts
function displayPlayerHealth() {
  //set x position for heart
  let heartX = width - playerHeart.width - 5;

  //display as may heart as player's health value
  for (let i = 0; i < playerHealth; i++) {
    image(playerHeart, heartX, 7);

    //set x position for next heart image
    heartX -= playerHeart.width + 5;
  }
}


function checkIfGameOver() {
  //if player dies
  if (playerHealth < 1) {
    //game is over, stop play and display game over screen
    gameOver = true;
  }
}


function gameOverScreen() {
  background(222, 58, 58);

  // Set up the font
  textSize(35);
  textAlign(CENTER, CENTER);
  fill(255);

  text("GAME OVER", width / 2, height / 2);
}


//display level number on screen
function displayLevel() {
  background(bgColor);

  //display the paddles
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();

  text("LEVEL " + level, width / 2, height / 2);

  //have the text on screen for a certain amount of time
  timer(3000);
}


//sets game to next level
function levelUp() {

  //if enemy dies
  if (enemyHealth < 1) {
    //increment the level
    level++;

    //each round, enemy has one additional health
    enemyMaxHealth++;
    enemyHealth = enemyMaxHealth;

    //reset player health
    playerHealth = playerMaxHealth;

    //reset paddle sizes
    leftPaddle.h = enemyDefaultSize;
    rightPaddle.h = playerDefaultSize;

    //display next level number
    displayingLevelNumber = true;
    displayLevel();
  }
}


//update game parameters according to level, getting progressively harder
function enemyParameters() {
  if (level === 1) {
    enemyDefaultSpeed = 5;
    leftPaddle.speed = enemyDefaultSpeed;
    enemyDefaultSize = 70;
    leftPaddle.h = enemyDefaultSize;
    bgColor = 0;
  }

  if (level === 2) {
    enemyDefaultSpeed = 6;
    leftPaddle.speed = enemyDefaultSpeed;
    enemyDefaultSize = 80;
    leftPaddle.h = enemyDefaultSize;
    bgColor = 50;
  }

  if (level === 3) {
    enemyDefaultSpeed = 8;
    leftPaddle.speed = enemyDefaultSpeed;
    enemyDefaultSize = 95;
    leftPaddle.h = enemyDefaultSize;
    bgColor = 160;
  }

  if (level === 4) {
    enemyDefaultSpeed = 12;
    leftPaddle.speed = enemyDefaultSpeed;
    enemyDefaultSize = 120;
    leftPaddle.h = enemyDefaultSize;
    bgColor = 240;
  }
}

//set a timer to display level number for a certain amount of time before each round
function timer(time) {
  setTimeout(displayFalse, time);
}

//made as a function in order to use 'setTimeout' function
function displayFalse() {
  displayingLevelNumber = false;
}
