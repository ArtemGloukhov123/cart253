// Predator
//
// A class that represents a simple predator
// controlled by any selected keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, up, down, left, right, sprint, displayPic) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = up;
    this.downKey = down;
    this.leftKey = left;
    this.rightKey = right;
    //sprint button
    this.sprintKey = sprint;
    //keep track of number of prey eaten
    this.preyEaten = 0;
    this.avatar = displayPic;
    //detect if animal is alive
    this.living = true;

  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    //speed of predator, made as separate variable for the math
    let predatorSpeed;

    if(this.living) {
      if(keyIsDown(this.sprintKey)) {
        //if sprint key is down, preadator's speed is doubled
        predatorSpeed = this.speed * 2;
      }
      else {
        //if not, predator's speed is its default speed
        predatorSpeed = this.speed;
      }

      // Horizontal movement
      if (keyIsDown(this.leftKey)) {
        this.vx = -predatorSpeed;
      }
      else if (keyIsDown(this.rightKey)) {
        this.vx = predatorSpeed;
      }
      else {
        this.vx = 0;
      }
      // Vertical movement
      if (keyIsDown(this.upKey)) {
        this.vy = -predatorSpeed;
      }
      else if (keyIsDown(this.downKey)) {
        this.vy = predatorSpeed;
      }
      else {
        this.vy = 0;
      }
    }
    else {
      //if animal is dead, it can no longer move
      this.vy = 0;
      this.vx = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    if(this.living) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
      if (d < this.radius + prey.radius) {
        // Increase predator health and constrain it to its possible range
        this.health += this.healthGainPerEat;
        this.health = constrain(this.health, 0, this.maxHealth);
        // Decrease prey health by the same amount
        prey.health -= this.healthGainPerEat;
        // Check if the prey died and reset it if so
        if (prey.health < 0) {
          prey.reset();
          //when prey dies, increase preyEaten by 1
          this.preyEaten ++;
        }
      }
    }
    if (this.health < 1) {
      //prevent animal from moving anymore
      this.living = false;
      //diplay skull
      imageMode(CENTER);
      image(skullPic, this.x, this.y, 50, 60);
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    //constrain radius to over 1 pixel so picture do not glitch out
    let contrainedRadius = constrain(this.health, 1, this.maxHealth);
    //fill(this.fillColor);
    this.radius = contrainedRadius;
    ellipse(this.x, this.y, this.radius * 2);
    //display picture represnting the animal
    imageMode(CENTER);
    image(this.avatar, this.x, this.y, this.radius*2, this.radius*2)

    //display prey eaten on each predator
    strokeWeight(3);
    stroke(255);
    fill(0);
    textAlign(CENTER);
    textSize(20);
    text(this.preyEaten, this.x, this.y+6);
    pop();
  }
}
