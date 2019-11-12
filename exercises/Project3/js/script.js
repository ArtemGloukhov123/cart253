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

let i = 0;

// preload()
//
// Description of preload

function preload() {
  player.push(loadImage('assets/images/Player.png'))
  player.push(loadImage('assets/images/Player.png'))
  player.push(loadImage('assets/images/Player.png'))

  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))
  player.push(loadImage('assets/images/Player2.png'))

  player.push(loadImage('assets/images/Player3.png'))
  player.push(loadImage('assets/images/Player3.png'))
  player.push(loadImage('assets/images/Player3.png'))

  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))
  player.push(loadImage('assets/images/Player4.png'))

  legs.push(loadImage('assets/images/Legs.png'))
  legs.push(loadImage('assets/images/Legs.png'))
  legs.push(loadImage('assets/images/Legs.png'))

  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))
  legs.push(loadImage('assets/images/Legs2.png'))

  legs.push(loadImage('assets/images/Legs3.png'))
  legs.push(loadImage('assets/images/Legs3.png'))
  legs.push(loadImage('assets/images/Legs3.png'))

  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
  legs.push(loadImage('assets/images/Legs4.png'))
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(500, 500);
}


// draw()
//
// Description of draw()

function draw() {
  background(20);


  rotatePlayer();

  if(keyIsDown(87)) {
    playerWalking();
  }
  else {
    displayPlayer();
  }
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

  imageMode(CENTER);
  image(legs[0], 0, 0);
  image(player[0], 0, 0);

  pop();
}

function playerWalking() {
  if (keyIsDown(87)) {

    angleMode(DEGREES);
    translate(width / 2, height / 2);
    rotate(angle);
    imageMode(CENTER);

    image(legs[i], 0, 0);
    image(player[i], 0, 0);

    i++;

    if (i > 23) {
      i = 0;
    }
  }
}
