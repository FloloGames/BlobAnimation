class Diagramm {
  constructor(x1, y1, x2, y2) {
    this.anzahl = [];
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    this.xAxeMax = 0;
    this.yAxeMax = 0;
    this.xAxeMin = 0;
    this.yAxeMin = 0;
  }
  show(){
    fill(0);
    noStroke();
    rectMode(CORNERS);
    rect(this.a.x, this.a.y, this.b.x, this.b.y);
    noFill();
    stroke(255);
    strokeWeight(3);
    beginShape();
    for (var i = 0; i < this.anzahl.length; i++) {
      let x = map(i*genauigkeit, this.xAxeMin, this.xAxeMax, this.a.x, this.b.x);
      let y = map(this.anzahl[i], this.yAxeMin, this.yAxeMax, this.b.y, this.a.y);
      vertex(x, y);
    }
    endShape();
  }
  addInfo(info){
    this.anzahl.push(info);
  }
  setAxe(minX, maxX, minY, maxY){
    this.xAxeMax = maxX;
    this.yAxeMax = maxY;
    this.xAxeMin = minX;
    this.yAxeMin = minY;
  }
}
