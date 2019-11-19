//Bullet
//when mouse is clicked, bullet will fly from player towards mouse
//when hits enemy, enemy dies.

class Bullet {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(img) {

    this.image = img;

    //origin point of the bullet, always starts from center
    this.x = width / 2;
    this.y = height / 2;

    this.vx = 0;
    this.vy = 0;

    this.speed = 15;

    this.angle = 0;

    this.angleValues = [];

    this.cooldown = 0;
    this.cooldownMax = 30;

    this.moveSpeed = 5;

    this.collided = false;
  }

  //when mouse is pressed, register angle for that bullet
  handleShooting() {
    this.cooldown--;
    this.cooldown = constrain(this.cooldown, 0, this.cooldownMax);

    if (mouseIsPressed && this.cooldown === 0) {
      this.collided = false;
      this.flyDirection();
      this.angleValues.push(this.angle);

      this.cooldown = this.cooldownMax;
      this.x = width / 2;
      this.y = height / 2;
    }
  }

  //have bullet fly at the angle recorded
  fly() {
    let i = this.angleValues.length - 1;

    this.angleValues.push(0);

    let angleVal = this.angleValues[i];

    this.vx = this.speed * sin(this.angle);
    this.vy = this.speed * cos(this.angle);

    this.x += this.vx;
    this.y += this.vy;
  }

  //show image of bullet
  display() {
    if (!this.collided) {
      image(this.image, this.x, this.y);
    }
  }

  //determine angle of mouse from its x and y values, used for angle
  //of bullet
  flyDirection() {
    let x = mouseX - width / 2;
    let y = height / 2 - mouseY;

    if (x > 0 && y < 0) {
      this.angle = atan(abs(x) / abs(y));
    }

    if (x > 0 && y > 0) {
      this.angle = atan(abs(y) / abs(x)) + 90;
    }

    if (x < 0 && y > 0) {
      this.angle = atan(abs(x) / abs(y)) + 180;
    }

    if (x < 0 && y < 0) {
      this.angle = atan(abs(y) / abs(x)) + 270;
    }
  }

  move() {
    //W is pressed
    if (keyIsDown(87)) {
      this.vy = this.moveSpeed;
    }
    //S is pressed
    else if (keyIsDown(83)) {
      this.vy = -this.moveSpeed;
    } else {
      this.vy = 0;
    }

    //A is pressed
    if (keyIsDown(65)) {
      this.vx = this.moveSpeed;
    }
    //D is pressed
    else if (keyIsDown(68)) {
      this.vx = -this.moveSpeed;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  handleHorizontalCollision(wall) {
    let wallTop = wall.y;
    let wallBottom = wall.y + wall.h;
    let wallLeft = wall.x;
    let wallRight = wall.x + wall.w;

    if (this.x < wallRight && this.x > wallLeft) {
      if (this.y < wallBottom && this.y > wallTop) {
        this.angle = -this.angle;
      }
    }
  }

  handleVertcalCollision(wall) {
    let wallTop = wall.y;
    let wallBottom = wall.y + wall.h;
    let wallLeft = wall.x;
    let wallRight = wall.x + wall.w;

    if (this.y < wallBottom && this.y > wallTop) {
      if (this.x < wallRight && this.x > wallLeft) {
        this.angle = -(this.angle - 180);
      }
    }
  }
}
