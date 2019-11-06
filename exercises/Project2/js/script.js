// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;
let tigerImage;

let hunter = [];
let hunterAmount = 1;

let bush;
let bushAmount = 3;
let bushImage;

let zebraImage;
let zebra;


//array for storing sprout images to make background
let sprouts = [];
let sproutX = [];
let sproutY = [];
let numberOfSprouts = 35;

let gameStarted = false;
let gameIsOver = false;

let tigerAngle = 0;
let zebraAngle = 160;

let zebraSkullImage;

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
  zebraSkullImage = loadImage('assets/images/zebradead.png')
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(tigerImage, 100, 100, 5, color(200, 200, 0), 40);

  bush = new Bush(bushImage, random(width), random(height));

  zebra = new Prey(zebraImage, 200, 200, 3, 100, 25);

  for (let i = 0; i < hunterAmount; i++) {
    hunter[i] = new Hunter(random(width), random(height), 5, color(200, 200, 200), 20);
  }

  setSproutCoordinates();
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
titleScreen();

  if (!gameIsOver & gameStarted) {
    background(128, 235, 52);
    displaySprouts();

    // Handle input for the tiger
    tiger.handleInput();
    tiger.display();
    tiger.move();
    tiger.handleHiding(bush);
    tiger.handleEating(zebra);

    for (let i = 0; i < hunterAmount; i++) {
      hunter[i].move(tiger);
      hunter[i].display(tiger);
      hunter[i].handleChasing(tiger);
      hunter[i].handleEating(tiger);
    }

    zebra.move(tiger);
    zebra.display(tiger);
    zebra.handleRunning(tiger);

    bush.display();

    displayScore();

    addDifficulty();

    if (tiger.health < 2) {
      gameIsOver = true;
    }

  }

  if (gameIsOver) {
    gameOverScreen();
  }
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

//display the score in the top left corner
function displayScore() {
  push();
  textAlign(LEFT);
  textSize(40);
  text("SCORE: " + tiger.score, 10, 40);

  textSize(20);
  let message = "Press Left Shift to sprint\n";
  message = message + "Hide behind the bush to avoid detection";
  text(message, 10, height - 40);
  pop();
}


function gameOverScreen() {
  background(255, 50, 50);

  push();
  textSize(60);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height * 0.4);

  textSize(30);
  text("You caught " + tiger.score + " prey before you got caught.", width / 2, height / 2);

  text("Press mouse to restart.", width / 2, height * 0.6);
  pop();

  //reset game on mouse click
  if (mouseIsPressed) {
    gameIsOver = false;
    tiger.health = tiger.maxHealth;

    hunterAmount
    //respawn tiger
    tiger.x = random(width);
    tiger.y = random(height);
    tiger.display();
    //reset score
    tiger.score = 0;
    //respawn hunter
    hunter.x = random(width);
    hunter.y = random(height);
    //hunter.display(tiger);
    //respawn bush
    bush.x = random(width);
    bush.y = random(height);
    bush.display();
  }
}

function titleScreen() {
background(150, 255, 135);
textAlign(CENTER);

//title
fill(0);
textSize(65);
textStyle(BOLD);
text("Tiger Game", width/2, height/2);

//start instruction
textStyle(NORMAL);
textSize(20);
text("Click To Play", width/2, 0.6*height);

imageMode(CENTER);


let tigerImageX = map((cos(tigerAngle) * width/2), -width/2, width/2, 100, width-100);
let tigerImageY = map((sin(tigerAngle) * height/2), -height/2, height/2, 100, height-100);
image(tigerImage, tigerImageX, tigerImageY, 130, 130);

let zebraImageX = map((cos(zebraAngle) * width/2), -width/2, width/2, 100, width-100);
let zebraImageY = map((sin(zebraAngle) * height/2), -height/2, height/2, 100, height-100);
image(zebraImage, zebraImageX, zebraImageY, 130, 130);

tigerAngle += 0.05;
zebraAngle += 0.05;

  if(mouseIsPressed)
  {
    gameStarted = true;
  }
}


//adds a hunter every 3 points scored, up to 4 hunters
function addDifficulty() {
  if (tiger.score > 0 & tiger.score % 9 === 0) {
    hunterAmount = 4;
    let newHunter = new Hunter(random(width), random(height), 5, color(200, 200, 200), 20);
    hunter.push(newHunter);
  }
    else if (tiger.score > 0 & tiger.score % 6 === 0) {
      hunterAmount = 3;
      let newHunter = new Hunter(random(width), random(height), 5, color(200, 200, 200), 20);
      hunter.push(newHunter);
    }
      else if (tiger.score > 0 & tiger.score % 3 === 0) {
        hunterAmount = 2;
        let newHunter = new Hunter(random(width), random(height), 5, color(200, 200, 200), 20);
        hunter.push(newHunter);
      }
}
