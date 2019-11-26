//Wall
//used for making buildings

class Wall {

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


checkPlayerCollision() {
  let playerX = width/2;
  let playerY = height/2;

  let wallTop = this.y;
  let wallBottom = this.y + this.h;
  let wallLeft = this.x;
  let wallRight = this.x + this.w;

  if(playerX < wallRight && playerX > wallLeft && playerY < wallBottom && playerY > wallTop) {
    playerCollided = true;
    canMove = false;
    console.log("I'm in a wall!")
  }
  else {
    playerCollided = false;
    canMove = true;
  }
}

}
