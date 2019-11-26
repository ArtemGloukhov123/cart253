//Floor
//used for making buildings

class Floor {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, w, h) {

    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.vx = 0;
    this.vy = 0;

    this.speed = 5;
  }

  // display
  //
  // Display the stone in a random part of the canvas

  display() {
    push();
    noStroke();
    rectMode(CORNER);
    fill(150);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  move() {

    //W is pressed
    if (keyIsDown(87)) {
      if (canMoveUp) {
        this.vy = 5;
      } else {
        this.vy = 0;
      }
    }
    //S is pressed
    else if (keyIsDown(83)) {
      if (canMoveDown) {
        this.vy = -5;
      } else {
        this.vy = 0;
      }
    } else {
      this.vy = 0;
    }

    //A is pressed
    if (keyIsDown(65)) {
      if (canMoveLeft) {
        this.vx = 5;
      } else {
        this.vx = 0;
      }
    }
    //D is pressed
    else if (keyIsDown(68)) {
      if (canMoveRight) {
        this.vx = -5;
      } else {
        this.vx = 0;
      }
    } else {
      this.vx = 0;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

drive(car) {
  //W is pressed
  if (keyIsDown(87)) {
    this.vx = (-sin(car.angle)) * this.speed * 2;
    this.vy = (cos(car.angle)) * this.speed * 2;
  }
  else if (keyIsDown(83)) {
    this.vx = -(-sin(car.angle)) * this.speed * 2;
    this.vy = -(cos(car.angle)) * this.speed * 2;
  }else {
    this.vx = 0;
    this.vy = 0;
  }

  this.x += this.vx;
  this.y += this.vy;
}

}
