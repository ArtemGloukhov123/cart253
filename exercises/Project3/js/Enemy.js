//Enemy
//used for making buildings

class Enemy {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y) {

    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

    this.walking = true;
    this.chasing = false;

    this.visionRadius = 250;

    this.visionCalm = color(0, 200, 0, 50);
    this.visionAggro = color(200, 0, 0, 50);

    this.speed = 4;


    this.imageNumber = 0;

    this.tx = random(100);
    this.ty = random(100);

    this.living = true;

    this.hitboxRadius = 20;

    this.enemyAngle = 0;

    this.playerInside = false;
  }

  // display
  //
  // Display the stone in a random part of the canvas

  display() {
    if (this.living) {
      push();

      //display vision circle
      noStroke();

      if (this.chasing) {
        this.rotateToPlayer();
        translate(this.x, this.y);
        rotate(this.enemyAngle);
        translate(-this.x, -this.y);
      }

      if (this.chasing) {
        fill(this.visionAggro);
      } else {
        fill(this.visionCalm);
      }
      ellipse(this.x, this.y, this.visionRadius * 2);

      imageMode(CENTER);

      if (this.walking) {
        image(enemyImages[imageNumber], this.x, this.y);
        imageNumber++;

        //23 is the number of sprites in the animation
        if (imageNumber > 23) {
          imageNumber = 0;
        }
      } else {
        image(enemyImages[0], this.x, this.y);
      }

      pop();
    }
  }


  wander(floor) {
    let playerX = width / 2;
    let playerY = height / 2;

    if (this.chasing) {
      if (playerX < this.x) {
        this.x -= 4;
        this.constrainArea();
      } else if (playerX > this.x) {
        this.x += 4;
        this.constrainArea();
      }
      if (playerY < this.y) {
        this.y -= 4;
        this.constrainArea();
      } else if (playerY > this.y) {
        this.y += 4;
        this.constrainArea();
      }
      this.rotateToPlayer();
    } else {
      // Set velocity via noise()
      this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
      this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
      // Update position
      this.x += this.vx;
      this.y += this.vy;
      // Update time properties
      this.tx += 0.01;
      this.ty += 0.01;
    }
    this.constrainArea();
  }

  handleChasing() {
    let playerX = width / 2;
    let playerY = height / 2;

    let d = dist(playerX, playerY, this.x, this.y)

    if (d < this.visionRadius && this.playerInside) {
      this.chasing = true;
    } else {
      this.chasing = false;
    }
  }

  checkIfPlayerInside(floor) {
    let floorLeft = floor.x;
    let floorRight = floor.x + floor.w;
    let floorTop = floor.y;
    let floorBottom = floor.y + floor.h;

    let playerX = width/2;
    let playerY = height/2;

    if(playerX < floorRight && playerX > floorLeft && playerY < floorBottom && playerY > floorTop) {
      this.playerInside = true;
    } else {
      this.playerInside = false;
    }
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

  preloadTorsoImages() {
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

  preloadLegImages() {
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

  constrainArea() {
    this.x = constrain(this.x, floor.x + 40, floor.x + floor.w - 40);
    this.y = constrain(this.y, floor.y + 40, floor.y + floor.h - 40);
  }

  checkIfShot(bullet) {
    let d = dist(bullet.x, bullet.y, this.x, this.y);

    if (d < this.hitboxRadius) {
      this.living = false;
      bullet.collided = true;
      //"despawns" the bullet from the area
      bullet.x = -100000;
      bullet.y = -100000;
    }

  }

  handleDeath() {
    if (!this.living) {
      this.x = -1000;
      this.y = -1000;
    }
  }


  rotateToPlayer() {
    let x = width / 2;
    let y = height / 2;

    //top right quadrant
    if (x > this.x && y < this.y) {
      this.enemyAngle = atan(abs(x - this.x) / abs(this.y - y));
    }

    //bottom right quadrant
    if (x > this.x && y > this.y) {
      this.enemyAngle = -atan(abs(x - this.x) / abs(y - this.y)) + 180;
    }

    //bottom left quadrant
    if (x < this.x && y > this.y) {
      this.enemyAngle = atan(abs(this.x - x) / abs(y - this.y)) + 180;
    }

    //top left quadrant
    if (x < this.x && y < this.y) {
      this.enemyAngle = atan(abs(this.y - y) / abs(this.x - x)) + 270;
    }

  }



}
