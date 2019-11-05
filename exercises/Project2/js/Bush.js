// Bush
//
// The bush is a place for the predator to hide
// and recieve a speed boost for a small period of time

class Bush {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;
  }

  // display
  //
  // Display the bush in a random part of the canvas

  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}
