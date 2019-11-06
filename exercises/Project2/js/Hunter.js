//Hunter

class Hunter {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;

    this.visionRadius = 180;

    this.chasing = false;

    this.visionCalm = color(0, 200, 0, 50);
    this.visionAggro = color(200, 0, 0, 50);
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move(predator) {

    if (this.chasing & !predator.hidden) {
      if(predator.x < this.x) {
        this.x -= 3.5;
      }
      else if(predator.x > this.x) {
        this.x += 3.5;
      }
        if(predator.y < this.y) {
          this.y -= 3.5;
        }
        else if(predator.y > this.y) {
          this.y += 3.5;
        }
      }
      else {
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

    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display(predator) {
    push();

    //display vision circle
    noStroke();

    let d = dist(predator.x, predator.y, this.x, this.y)

    if (this.chasing) {
      fill(this.visionAggro);
    } else {
      fill(this.visionCalm);
    }
    ellipse(this.x, this.y, this.visionRadius * 2);

    //display hunter
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

  //chases the predator if they enter hunter's vision
  handleChasing(predator) {

    let d = dist(predator.x, predator.y, this.x, this.y)

    if (d < this.visionRadius + predator.radius & !predator.hidden) {
      this.chasing = true;
    }

    else {
      this.chasing = false;
    }
  }

  handleEating(predator) {
    // Calculate distance from the hunter to the predator
    let d = dist(this.x, this.y, predator.x, predator.y);

    // Check if the distance is less than their two radii (an overlap)
    //won't harm tiger if tiger is hidden and hunter accidentally roams over bush
    if (!predator.hidden & d < this.radius + predator.radius) {
      predator.health -= 0.3;
      //constrained at over 1 so that image does not glitch
      predator.health = constrain(predator.health, 1, predator.maxHealth);
    }
  }

}
