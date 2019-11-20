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
      this.vy = this.speed;
    }
    //S is pressed
    else if (keyIsDown(83)) {
      this.vy = -this.speed;
    } else {
      this.vy = 0;
    }

    //A is pressed
    if (keyIsDown(65)) {
      this.vx = this.speed;
    }
    //D is pressed
    else if (keyIsDown(68)) {
      this.vx = -this.speed;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;
    this.y += this.vy;

}

}
