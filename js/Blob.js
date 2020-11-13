class Blob {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.startLoc = createVector(x, y);
    this.foodCount = 0;
    this.infected = false;
    this.infektionszeit = 0;
    this.canMove = true;
    this.radius = 30;
  }
  nextRound(){
    if(this.infected && poisonFood){
      this.infektionszeit++;
      if(this.infektionszeit >= infektionszeit){
        blobs.splice(this, 1);
      }
    }
  }
  show(){
    if(this.infected && poisonFood){
      fill(150, 200, 55);
    } else {
      fill(150, 130, 55);
    }
    stroke(0);
    strokeWeight(1);
    ellipse(this.loc.x, this.loc.y, this.radius);
  }
  move(){
    if(this.canMove){
      if(food.length > 0){
        let winner = 0;
        for (var i = 0; i < food.length; i++) {
          let d = dist(food[i].loc.x, food[i].loc.y, this.loc.x, this.loc.y);
          let winnerD = dist(food[winner].loc.x, food[winner].loc.y, this.loc.x, this.loc.y);
          if(d <= winnerD){
            winner = i;
          }
        }
        let tar = food[winner].loc;
        let dir = p5.Vector.sub(tar, this.loc);
        dir.normalize();
        dir.mult(3);
        this.loc.add(dir);
        let d = dist(this.loc.x, this.loc.y, food[winner].loc.x, food[winner].loc.y);

        if(d <= this.radius/2+food[winner].radius/2){
          if(food[winner].infected == true && poisonFood){
            if(this.infected == false){
              this.infected = true;
            } else {
              splice(this, 1);
            }
          }
          food.splice(winner, 1);
          this.foodCount++;
        }
        // stroke(255);
        // strokeWeight(2);
        // line(this.loc.x, this.loc.y, tar.x, tar.y);
      } else {
        // stroke(255);
        // strokeWeight(2);
        // line(this.loc.x, this.loc.y, this.startLoc.x, this.startLoc.y);
        let dir = p5.Vector.sub(this.startLoc, this.loc);
        dir.normalize();
        dir.mult(3);
        this.loc.add(dir);
        let d = dist(this.loc.x, this.loc.y, this.startLoc.x, this.startLoc.y);
        if(d <= 4){
          this.canMove = false;
        }
      }
    }
  }
}
