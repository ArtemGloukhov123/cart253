"use strict";

/*****************
Hotline Montreal
Artem Gloukhov
This project is to create a game with similar look and feel as Hotline Miami
******************/

//angle of rotation for the player
let angle = 0;
//array for player torso sprites
let player = [];
//array for leg sprites
let legs = [];


//array for player torso sprites
let enemyImages = [];


//current sprite number
let imageNumber = 0;

//array for stone objects
let stone = [];
//amount of stones in the background
let stoneAmount = 50;
//array for x and y values of stones
let stoneX = [];
let stoneY = [];
//array for stone images used for background
let stoneImage = [];

//tells the program whether to display the walking animation
let playerIsWalking = false;

//tells program that player has hit wall
let playerCollided = false;

//bullet object
let bullet;
//bullet sprite
let bulletImage;

let canMove = true;

let westWall;
let northWall;
let eastWall;

let floor;

let enemy;


// preload()
//
// Preload images
function preload() {

  //load array of stone images
  preloadStoneImages();

  //array of torso images
  preloadTorsoImages();

  //array of leg images
  preloadLegImages();

  //preload enemy sprites
  preloadEnemyImages();

  //bullet only has one sprite
  bulletImage = loadImage('assets/images/bullet.png');
}


// setup()
//
// create canvas and objects
function setup() {
  createCanvas(windowWidth, windowHeight);

  //load stone X and Y values
  setupStoneXYValues();

  //create array of stone objects with their own x and y values
  for (let i = 0; i < stoneAmount; i++) {
    stone.push(new Stone(stoneImage[i], stoneX[i], stoneY[i]));
  }

  //create the bullet object
  bullet = new Bullet(bulletImage);

  //create west wall object
  westWall = new Wall(50, 50, 20, 500);
  eastWall = new Wall(650, 50, 20, 500);
  northWall = new Wall(50, 50, 600, 20);

  floor = new Floor(50, 50, 600, 500);

  enemy = new Enemy(100, 100);
}



// draw()
//
// handle the player walking and shooting

function draw() {
  background(45);

  displayStones();

  //handle bullet collision with all walls
  bullet.handleHorizontalCollision(westWall);
  bullet.handleVertcalCollision(northWall);
  bullet.handleHorizontalCollision(eastWall);

  floor.display();


  westWall.display();
  northWall.display();
  eastWall.display();

  westWall.move();
  northWall.move();
  eastWall.move();
  floor.move();
  bullet.move();
  enemy.move();

  westWall.checkPlayerCollision();
  northWall.checkPlayerCollision();
  eastWall.checkPlayerCollision();

  //shooting input (mouse click)
  bullet.handleShooting();
  bullet.display();
  //have bullet fly towards mouse
  bullet.fly();


  //have player face mouse
  rotatePlayer();
  //handle player controls

  handlePlayerInput();
  displayPlayer();


  enemy.display();
  enemy.checkIfShot(bullet);
  enemy.wander(floor);
  enemy.handleChasing();
  enemy.handleDeath();
}


//determine the angle the player needs to be rotated to
function rotatePlayer() {
  //x and y have 0 location in middle of screen, creating a cartesian
  //coordiante system
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;

  //top right quadrant
  if (x > 0 && y < 0) {
    angle = atan(abs(x) / abs(y));
  }

  //bottom right quadrant
  if (x > 0 && y > 0) {
    angle = atan(abs(y) / abs(x)) + 90;
  }

  //bottom left quadrant
  if (x < 0 && y > 0) {
    angle = atan(abs(x) / abs(y)) + 180;
  }

  //top left quadrant
  if (x < 0 && y < 0) {
    angle = atan(abs(y) / abs(x)) + 270;
  }
}

//display the player being rotated towards the mouseX
//and display animation if correct input
function displayPlayer() {
  push();

  angleMode(DEGREES);
  translate(width / 2, height / 2);
  rotate(angle);

  if (playerIsWalking) {
    image(legs[imageNumber], 0, 0);
    image(player[imageNumber], 0, 0);

    imageNumber++;

    //23 is the number of sprites in the animation
    if (imageNumber > 23) {
      imageNumber = 0;
    }
  } else {
    imageMode(CENTER);
    image(legs[0], 0, 0);
    image(player[0], 0, 0);
  }
  pop();
}


function handlePlayerInput() {
  if (keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68)) {

    playerIsWalking = true;

  } else {
    playerIsWalking = false;
  }
}



function preloadStoneImages() {
  for (let i = 0; i < (stoneAmount / 7); i++) {
    stoneImage.push(loadImage('assets/images/stone.png'))
    stoneImage.push(loadImage('assets/images/stone2.png'))
    stoneImage.push(loadImage('assets/images/stone3.png'))
    stoneImage.push(loadImage('assets/images/stone4.png'))
    stoneImage.push(loadImage('assets/images/stone5.png'))
    stoneImage.push(loadImage('assets/images/stone4.png'))
    stoneImage.push(loadImage('assets/images/stone5.png'))
  }
}


function preloadTorsoImages() {
  for (let i = 0; i < 3; i++) {
    player.push(loadImage('assets/images/Player.png'))
  }

  for (let i = 0; i < 9; i++) {
    player.push(loadImage('assets/images/Player2.png'))
  }

  for (let i = 0; i < 3; i++) {
    player.push(loadImage('assets/images/Player3.png'))
  }

  for (let i = 0; i < 9; i++) {
    player.push(loadImage('assets/images/Player4.png'))
  }
}


function preloadLegImages() {
  for (let i = 0; i < 2; i++) {
    legs.push(loadImage('assets/images/Legs.png'))
  }

  for (let i = 0; i < 10; i++) {
    legs.push(loadImage('assets/images/Legs2.png'))
  }

  for (let i = 0; i < 2; i++) {
    legs.push(loadImage('assets/images/Legs3.png'))
  }

  for (let i = 0; i < 10; i++) {
    legs.push(loadImage('assets/images/Legs4.png'))
  }
}

function preloadEnemyImages() {
  for (let i = 0; i < 3; i++) {
    enemyImages.push(loadImage('assets/images/enemy1.png'))
  }

  for (let i = 0; i < 9; i++) {
    enemyImages.push(loadImage('assets/images/enemy2.png'))
  }

  for (let i = 0; i < 3; i++) {
    enemyImages.push(loadImage('assets/images/enemy3.png'))
  }

  for (let i = 0; i < 9; i++) {
    enemyImages.push(loadImage('assets/images/enemy4.png'))
  }
}




function setupStoneXYValues() {

  //random X value within the canvas
  for (let i = 0; i < stoneAmount; i++) {
    stoneX.push(random(width));
    stoneY.push(random(height));
  }
}


function displayStones() {
  //display all stones from array
  for (let i = 0; i < stoneAmount; i++) {
    stone[i].display(stoneImage[i], stoneX[i], stoneY[i]);
  }

  //move stones when player is "walking", this creates illusion of player moving
  for (let i = 0; i < stoneAmount; i++) {
    stone[i].move();
  }

  //wrap stones around screen to have looping background
  for (let i = 0; i < stoneAmount; i++) {
    stone[i].handleWrapping();
  }
}
