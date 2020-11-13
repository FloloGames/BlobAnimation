class Food {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.radius = 10;
  }
  show(){
    fill(255, 255, 0);
    stroke(0);
    strokeWeight(1);
    ellipse(this.loc.x, this.loc.y, this.radius);
  }
}
