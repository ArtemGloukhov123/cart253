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
    this.x = width/2;
    this.y = height/2;

    this.vx = 0;
    this.vy = 0;

    this.speed = 20;

    this.angle = 0;

    this.angleValues = [];

    this.cooldown = 0;
    this.cooldownMax = 30;
  }

  //when mouse is pressed, register vx and vy for that bullet
  handleShooting() {
    this.cooldown --;
    this.cooldown = constrain(this.cooldown, 0, this.cooldownMax);

    if(mouseIsPressed && this.cooldown === 0) {
      this.flyDirection();
      this.angleValues.push(this.angle);

      this.cooldown = this.cooldownMax;
      this.x = width/2;
      this.y = height/2;
    }
  }

  fly() {
    let i = this.angleValues.length - 1;

    this.angleValues.push(0);

    let angleVal = this.angleValues[i];

    this.vx = this.speed * sin(this.angle);
    this.vy = this.speed * cos(this.angle);

    this.x += this.vx;
    this.y += this.vy;
    console.log("this x is " + this.x);
  }


  display() {
    image(this.image, this.x, this.y);
  }


  flyDirection() {
    let x = mouseX - width / 2;
    let y = height / 2 - mouseY ;

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
    console.log("angle is " + this.angle);
  }
}
