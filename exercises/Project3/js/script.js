"use strict";

/*****************
Hotline Montreal
Artem Gloukhov

This project is to create a game with similar look and feel as Hotline Miami

******************/

//angle of rotation for the player
let angle = 0;


// preload()
//
// Description of preload

function preload() {

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

  displayPlayer();
  rotatePlayer();

}

function rotatePlayer() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;

  if (mouseX > 0 & mouseY < 0) {
    angle = atan(x / y);
  }

  if (mouseX > 0 & mouseY > 0) {
    angle = atan(y / x) + 90;
  }

  if (mouseX < 0 & mouseY > 0) {
    angle = atan(x / y) + 180;
  }

  if (mouseX < 0 & mouseY < 0) {
    angle = atan(y / x) + 270;
  }
}

function displayPlayer() {
  push();
  noStroke();
  fill(200);
  rectMode(CENTER);
  angleMode(DEGREES);
  translate(width / 2, height / 2);
  rotate(angle);
  rect(0, 0, 100, 100)
  pop();
}
