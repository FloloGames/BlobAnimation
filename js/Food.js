class Food {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.infected = false;
    this.radius = 10;
    if(random(1) <= 0.005 && poisonFood){
      this.infected = true;
    }
  }
  show(){
    if(this.infected == true && poisonFood){
      fill(255, 120, 20);
    } else {
      fill(255, 255, 0);
    }
    stroke(0);
    strokeWeight(1);
    ellipse(this.loc.x, this.loc.y, this.radius);
  }
}
