//Level

class Level {

  constructor(number) {
    this.levelNumber = number;

    //default of 2 bushes
    this.bushAmount = 2;

    //default of 2 prey
    this.preyAmount = 2;

    //default of 1 hunter
    this.hunterAmount = 1;

  }

  levelScreen() {
    background(0, 255, 0);

    push();
    textAlign(CENTER);
    text("Level " + this.levelNumber + "\n", width/2, height/2);
    pop();
  }

displayBushes(bush) {
  for(let i = 0; i < this.bushAmount; i++) {
    image(bush.image, bush.x[i], bush.y[i]);
  }
}


setBushCoordinates(bush) {
  for (let i = 0; i < this.bushAmount; i++) {
    bush.x.push(random(width));
    bush.y.push(random(height));
  }
}

}
