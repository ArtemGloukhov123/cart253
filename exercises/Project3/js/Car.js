//Enemy
//used for making buildings

class Car {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, img) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

    this.speed = 5;

    this.img = img;

    this.angle = 0;

    this.proximityRadius = 200;

    this.playerDriving = false;

    this.cooldown = 30;
  }

  display() {
    push();

    translate(this.x, this.y);
    this.rotateCar();
    rotate(this.angle);
    translate(-this.x, -this.y);

    imageMode(CENTER);
    image(this.img, this.x, this.y);

    noStroke();
    fill(250, 0, 0, 50);
    ellipse(this.x, this.y, this.proximityRadius);
    pop();

  }

  move() {
    //W is pressed
    if (keyIsDown(87)) {
      this.vy = 5;
    }
    //S is pressed
    else if (keyIsDown(83)) {
      this.vy = -5;
    } else {
      this.vy = 0;
    }

    //A is pressed
    if (keyIsDown(65)) {
      this.vx = 5;
    }
    //D is pressed
    else if (keyIsDown(68)) {
      this.vx = -5;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  rotateCar() {
    if (this.playerDriving && keyIsDown(87)) {
      //if A is pressed, rotate left
      if (keyIsDown(65)) {
        this.angle-=2;
      }
      //if D is pressed, rotate right
      if (keyIsDown(68)) {
        this.angle+=2;
      }
    }
    //backing up
    if (this.playerDriving && keyIsDown(83)) {
      //if A is pressed, rotate rght
      if (keyIsDown(65)) {
        this.angle+=2;
      }
      //if D is pressed, rotate left
      if (keyIsDown(68)) {
        this.angle-=2;
      }
    }
  }

  enterCar() {
    let d = dist(width/2, height/2, this.x, this.y)
    this.cooldown --;

    this.cooldown = constrain(this.cooldown, 0, 30);

    if(keyIsDown(69) && d < this.proximityRadius && this.cooldown <= 0) {
      this.playerDriving = !this.playerDriving;
      this.cooldown = 30;
    }
  }

}
