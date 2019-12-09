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

let canMoveLeft = false;
let canMoveRight = false;
let canMoveUp = false;
let canMoveDown = false;

let westWall;
let northWall;
let eastWall;

let southWall2;
let northWall2;
let eastWall2;

let westWall3;
let northWall3;
let eastWall3;

let floor;
let floor2;
let floor3;

let enemy;
let enemy2;

let enemy3;
let enemy4;
let enemy5;
let enemy6;

let enemy7;
let enemy8;
let enemy9;
let enemy10;
let enemy11;
let enemy12;

let car;
let carImage;

let displayingStartScreen = true;

let titleAngle = 0;

let arrow1;
let arrowImage;

let stage = 1;

//sounds
let backgroundMusic;
let pewSound;
let deathSound;
let hornSound;
let victoryMusic;

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
  carImage = loadImage('assets/images/car.png');
  arrowImage = loadImage('assets/images/arrow.png');
}


// setup()
//
// create canvas and objects
function setup() {
  createCanvas(windowWidth, windowHeight);

  //load the music
  backgroundMusic = createAudio('assets/sounds/music.mp3');
  pewSound = createAudio('assets/sounds/pew.mp3');
  deathSound = createAudio('assets/sounds/death.mp3');
  hornSound = createAudio('assets/sounds/horn.mp3');
  victoryMusic = createAudio('assets/sounds/victory.mp3');

  //load stone X and Y values
  setupStoneXYValues();

  //create array of stone objects with their own x and y values
  for (let i = 0; i < stoneAmount; i++) {
    stone.push(new Stone(stoneImage[i], stoneX[i], stoneY[i]));
  }

  //create the bullet object
  bullet = new Bullet(bulletImage);

  //create west wall object
  westWall = new Wall(-800, 50, 20, 910);
  eastWall = new Wall(-320, 50, 20, 910);
  northWall = new Wall(-800, 50, 500, 20);

  southWall2 = new Wall(6000, -510, 1000, 20);
  eastWall2 = new Wall(6980, -1000, 20, 500);
  northWall2 = new Wall(6000, -1000, 1000, 20);

  westWall3 = new Wall(-10000, 5000, 20, 500);
  eastWall3 = new Wall(-9200, 5000, 20, 500);
  northWall3 = new Wall(-10000, 5000, 800, 20);

  floor = new Floor(-790, 60, 490, 900);
  floor2 = new Floor(6000, -1000, 1000, 500);
  floor3 = new Floor(-10000, 5000, 800, 500);

  enemy = new Enemy(100, 100);
  enemy2 = new Enemy(150, 100);

  enemy3 = new Enemy(6050, -1050);
  enemy4 = new Enemy(6200, -1200);
  enemy5 = new Enemy(6100, -1150);
  enemy6 = new Enemy(6150, -1100);

  enemy7 = new Enemy(-9850, 5050);
  enemy8 = new Enemy(-9850, 5050);
  enemy9 = new Enemy(-9850, 5050);
  enemy10 = new Enemy(-9850, 5050);
  enemy11 = new Enemy(-9850, 5050);
  enemy12 = new Enemy(-9850, 5050);

  car = new Car(-425, 300, carImage);

  arrow1 = new Arrow(arrowImage);
}



// draw()
//
// handle the player walking and shooting

function draw() {

displayStartScreen();

if(!displayingStartScreen && stage !== 4) {
  background(200);
  backgroundMusic.loop();

  displayStones();

  //handle bullet collision with all walls
  bullet.handleHorizontalCollision(westWall);
  bullet.handleVertcalCollision(northWall);
  bullet.handleHorizontalCollision(eastWall);

  bullet.handleVertcalCollision(southWall2);
  bullet.handleVertcalCollision(northWall2);
  bullet.handleHorizontalCollision(eastWall2);

  bullet.handleHorizontalCollision(westWall3);
  bullet.handleVertcalCollision(northWall3);
  bullet.handleHorizontalCollision(eastWall3);

  floor.display();
  floor2.display();
  floor3.display();

  westWall.display();
  northWall.display();
  eastWall.display();

  southWall2.display();
  northWall2.display();
  eastWall2.display();

  westWall3.display();
  northWall3.display();
  eastWall3.display();

  //shooting input (mouse click)
  bullet.handleShooting();
  bullet.display();
  //have bullet fly towards mouse
  bullet.fly();

  //have player face mouse
  rotatePlayer();
  //handle player controls

  car.display();

  enemy.display();
  enemy.checkIfShot(bullet);
  enemy.wander(floor);
  enemy.handleChasing();
  enemy.handleDeath();
  enemy.checkIfPlayerInside(floor);

  enemy2.display();
  enemy2.checkIfShot(bullet);
  enemy2.wander(floor);
  enemy2.handleChasing();
  enemy2.handleDeath();
  enemy2.checkIfPlayerInside(floor);

  enemy3.display();
  enemy3.checkIfShot(bullet);
  enemy3.wander(floor2);
  enemy3.handleChasing();
  enemy3.handleDeath();
  enemy3.checkIfPlayerInside(floor2);

  enemy4.display();
  enemy4.checkIfShot(bullet);
  enemy4.wander(floor2);
  enemy4.handleChasing();
  enemy4.handleDeath();
  enemy4.checkIfPlayerInside(floor2);

  enemy5.display();
  enemy5.checkIfShot(bullet);
  enemy5.wander(floor2);
  enemy5.handleChasing();
  enemy5.handleDeath();
  enemy5.checkIfPlayerInside(floor2);

  enemy6.display();
  enemy6.checkIfShot(bullet);
  enemy6.wander(floor2);
  enemy6.handleChasing();
  enemy6.handleDeath();
  enemy6.checkIfPlayerInside(floor2);

  enemy7.display();
  enemy7.checkIfShot(bullet);
  enemy7.wander(floor3);
  enemy7.handleChasing();
  enemy7.handleDeath();
  enemy7.checkIfPlayerInside(floor3);

  enemy8.display();
  enemy8.checkIfShot(bullet);
  enemy8.wander(floor3);
  enemy8.handleChasing();
  enemy8.handleDeath();
  enemy8.checkIfPlayerInside(floor3);

  enemy9.display();
  enemy9.checkIfShot(bullet);
  enemy9.wander(floor3);
  enemy9.handleChasing();
  enemy9.handleDeath();
  enemy9.checkIfPlayerInside(floor3);

  enemy10.display();
  enemy10.checkIfShot(bullet);
  enemy10.wander(floor3);
  enemy10.handleChasing();
  enemy10.handleDeath();
  enemy10.checkIfPlayerInside(floor3);

  enemy11.display();
  enemy11.checkIfShot(bullet);
  enemy11.wander(floor3);
  enemy11.handleChasing();
  enemy11.handleDeath();
  enemy11.checkIfPlayerInside(floor3);

  enemy12.display();
  enemy12.checkIfShot(bullet);
  enemy12.wander(floor3);
  enemy12.handleChasing();
  enemy12.handleDeath();
  enemy12.checkIfPlayerInside(floor3);

  handlePlayerInput();

  canMoveUp = true;
  canMoveDown = true;
  canMoveLeft = true;
  canMoveRight = true;

  westWall.checkPlayerCollision();
  northWall.checkPlayerCollision();
  eastWall.checkPlayerCollision();

  southWall2.checkPlayerCollision();
  northWall2.checkPlayerCollision();
  eastWall2.checkPlayerCollision();

  westWall3.checkPlayerCollision();
  northWall3.checkPlayerCollision();
  eastWall3.checkPlayerCollision();

if (!car.playerDriving) {
  displayPlayer();
  westWall.move();
  northWall.move();
  eastWall.move();

  southWall2.move();
  northWall2.move();
  eastWall2.move();

  westWall3.move();
  northWall3.move();
  eastWall3.move();

  floor.move();
  floor2.move();
  floor3.move();

  bullet.move();
  enemy.move();
  enemy2.move();
  enemy3.move();
  enemy4.move();
  enemy5.move();
  enemy6.move();
  enemy7.move();
  enemy8.move();
  enemy9.move();
  enemy10.move();
  enemy11.move();
  enemy12.move();
  car.move()
}

if (car.playerDriving) {
  westWall.drive(car);
  northWall.drive(car);
  eastWall.drive(car);

  southWall2.drive(car);
  northWall2.drive(car);
  eastWall2.drive(car);

  westWall3.drive(car);
  northWall3.drive(car);
  eastWall3.drive(car);

  floor.drive(car);
  floor2.drive(car);
  floor3.drive(car)

  bullet.drive(car);
  enemy.drive(car);
  enemy2.drive(car);
  enemy3.drive(car);
  enemy4.drive(car);
  enemy5.drive(car);
  enemy6.drive(car);
  enemy7.drive(car);
  enemy8.drive(car);
  enemy9.drive(car);
  enemy10.drive(car);
  enemy11.drive(car);
  enemy12.drive(car);

  fill(255);
  text("Press SPACE to Honk", width/2, height-50);

  //space to honk horn
  if(keyIsDown(32)){
    hornSound.play();
  }
}

  car.enterCar();
  handleStageNumber();

  if(stage === 1) {
    arrow1.hideArrow(floor);
    arrow1.arrowAngle(floor);
  }

  if(stage === 2) {
    arrow1.hideArrow(floor2);
    arrow1.arrowAngle(floor2);
  }

  if(stage === 3) {
    arrow1.hideArrow(floor3);
    arrow1.arrowAngle(floor3);
  }

  arrow1.rotateArrow();
  arrow1.display();
}
if(stage === 4) {
  background(0, 200, 0);
  backgroundMusic.stop();
  victoryMusic.play();

  push();
  let size = 50 + 5 * sin(titleAngle/8);

  push();
  fill(0);
  textAlign(CENTER);
  textSize(size);
  textStyle(BOLD);
  text("You're Winner!", width/2, height/2);
  pop();
}
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

if(!car.playerDriving){
  //move stones when player is "walking", this creates illusion of player moving
  for (let i = 0; i < stoneAmount; i++) {
    stone[i].move();
  }
}

if(car.playerDriving){
  //move stones when player is "walking", this creates illusion of player moving
  for (let i = 0; i < stoneAmount; i++) {
    stone[i].drive(car);
  }
}

  //wrap stones around screen to have looping background
  for (let i = 0; i < stoneAmount; i++) {
    stone[i].handleWrapping();
  }
}


function displayStartScreen() {
  background(0);

  let titleSize = 40 + 5 * sin(titleAngle/8);
  let startSize = 12 + 2 * sin(titleAngle/8);

  push();
  fill(255);
  textAlign(CENTER);
  textSize(titleSize);
  textStyle(BOLD);
  text("BADASS BOB\nAND HIS\nBOUNCING BULLET", width/2, 5*height/11);

  textSize(startSize);
  textStyle(NORMAL);
  text("Press Space to Start", width/2, 3*height/4);
  pop();

  titleAngle += 50;

  //if Space is pressed
  if(keyIsDown(32)) {
    displayingStartScreen = false;
  }
}

function handleStageNumber() {
  if(!enemy.living && !enemy2.living) {
    stage = 2;
  }
  if(!enemy3.living && !enemy4.living && !enemy5.living && !enemy6.living) {
    stage = 3;
  }
  if(!enemy7.living && !enemy8.living && !enemy9.living && !enemy10.living && !enemy11.living && !enemy12.living) {
    stage = 4;
  }
}




/*
backgroundMusic
https://www.newgrounds.com/audio/listen/548279

pewSound
http://soundbible.com/1949-Pew-Pew.html

deathSound
https://retired.sounddogs.com/previews/104/mp3/546387_SOUNDDOGS__gr.mp3

hornSound
http://soundbible.com/60-Car-Horn-Honk-1.html

victoryMusic
https://www.newgrounds.com/audio/listen/330100
*/
