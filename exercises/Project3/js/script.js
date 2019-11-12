"use strict";

/*****************
Hotline Montreal
Artem Gloukhov

This project is to create a game with similar look and feel as Hotline Miami

******************/

//angle of rotation for the player
let angle = 0;
let player = [];
let legs = [];

let imageNumber = 0;

let stone = [];
let stoneAmount = 50;
let stoneX = [];
let stoneY = [];
let stoneImage = [];

let playerIsWalking = false;

let bullet;
let bulletImage;

// preload()
//
// Description of preload

function preload() {

  //load array of stone images
  preloadStoneImages();

  //array of torso images
  preloadTorsoImages();

  //array of leg images
  preloadLegImages();

  bulletImage = loadImage('assets/images/bullet.png');
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(700, 700);

  //load stone X and Y values
  setupStoneXYValues();

  for (let i = 0; i < stoneAmount; i++) {
    stone.push(new Stone(stoneImage[i], stoneX[i], stoneY[i]));
  }

  bullet = new Bullet(bulletImage);
}







// draw()
//
// Description of draw()

function draw() {
  background(45);

  for (let i = 0; i < stoneAmount; i++) {
    stone[i].display(stoneImage[i], stoneX[i], stoneY[i]);
  }

  for (let i = 0; i < stoneAmount; i++) {
    stone[i].move();
  }

  for (let i = 0; i < stoneAmount; i++) {
    stone[i].handleWrapping();
  }

  rotatePlayer();
  handlePlayerInput();
  displayPlayer();

  bullet.handleShooting();
  bullet.display();
  bullet.fly();
}








function rotatePlayer() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;

  if (x > 0 && y < 0) {
    angle = atan(abs(x) / abs(y));
  }

  if (x > 0 && y > 0) {
    angle = atan(abs(y) / abs(x)) + 90;
  }

  if (x < 0 && y > 0) {
    angle = atan(abs(x) / abs(y)) + 180;
  }

  if (x < 0 && y < 0) {
    angle = atan(abs(y) / abs(x)) + 270;
  }
}

function displayPlayer() {
  push();

  angleMode(DEGREES);
  translate(width / 2, height / 2);
  rotate(angle);

  if (playerIsWalking) {
    image(legs[imageNumber], 0, 0);
    image(player[imageNumber], 0, 0);

    imageNumber++;

    if (imageNumber > 23) {
      imageNumber = 0;
    }
  }

  else {
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


function setupStoneXYValues() {

  //random X value within the canvas
  for (let i = 0; i < stoneAmount; i++) {
    stoneX.push(random(width));
    stoneY.push(random(height));
  }
}
