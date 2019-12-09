//Arrow
//shows player the direction of where to go

class Arrow {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(img) {
    this.img = img;

    this.x = width/2;
    this.y = height/2;

    this.angle = 0;

    this.showing = true;
  }

  // display
  //
  // Display the stone in a random part of the canvas

  display() {
    if(this.showing) {
      //display arrow
      image(this.img, this.x, this.y);
    }
  }


  arrowAngle(floor) {
    let floorX = floor.x + floor.w/2;
    let floorY = floor.y + floor.h/2;

    //top right quadrant
    if (floorX > this.x && floorY < this.y) {
      this.angle = atan(abs(floorX - this.x) / abs(this.y - floorY));
    }

    //bottom right quadrant
    if (floorX > this.x && floorY > this.y) {
      this.angle = -atan(abs(floorX - this.x) / abs(floorY - this.y)) + 180;
    }

    //bottom left quadrant
    if (floorX < this.x && floorY > this.y) {
      this.angle = atan(abs(this.x - floorX) / abs(floorY - this.y)) + 180;
    }

    //top left quadrant
    if (floorX < this.x && floorY < this.y) {
      this.angle = atan(abs(this.y - floorY) / abs(this.x - floorX)) + 270;
    }
  }

  rotateArrow() {
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
  }

  //hide arrow if player is close to destination
  hideArrow(floor) {
    let floorX = floor.x + floor.w/2;
    let floorY = floor.y + floor.h/2;

    let d = dist(floorX, floorY, this.x, this.y);

    if(d < 800) {
      this.showing = false;
    } else {
      this.showing = true;
    }
  }

}
