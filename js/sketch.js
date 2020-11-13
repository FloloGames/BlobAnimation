let changeSceneButton;
let poisonFoodButton;
let food = [];
let blobs = [];
let spawnedFood = 200;
let showDia = false;
let poisonFood = true;
let dia;
let genauigkeit = 1;
let count = 0;
let round = 0;

let infektionszeit;//In runden angeben

function setup(){
  changeSceneButton = select('#change_button');
  poisonFoodButton = select('#vergiftetes_essen_button');
  createCanvas(displayWidth, displayHeight);
  spawnFood();
  spawnBlob();
  spawnBlob();
  dia = new Diagramm(0, 0, width, height);
  dia.addInfo(0);
  changeSceneButton.mousePressed(changeSceneButtonPressed);
  poisonFoodButton.mousePressed(setPoisonFood);
  infektionszeit = 3;//Runden
}
function changeSceneButtonPressed(){
  showDia = !showDia;
}
function setPoisonFood(){
  poisonFood = !poisonFood;
  print('Poinsonfood =', poisonFood);
}
function draw(){
  if(showDia){
    updateBlobs(0);
    testIfHaveFood();
    dia.show();
  } else {
    background(44, 44, 130);
    updateFood();
    updateBlobs(1);
    testIfHaveFood();
  }
}
function updateBlobs(z){
  if(z == 0){
    for(let i = blobs.length-1; i >= 0; i--){
      blobs[i].move();
    }
  } else {
    for(let i = blobs.length-1; i >= 0; i--){
      blobs[i].show();
      blobs[i].move();
    }
  }
}
function updateFood(){
  for(let i = food.length-1; i >= 0; i--){
    food[i].show();
  }
}
function spawnFood(){
  for (var i = 0; i < spawnedFood; i++) {
    let f = new Food(random(width), random(height));
    food.push(f);
  }
}
function spawnBlob(){
  let b = new Blob(random(width), random(height));
  blobs.push(b);
}
function testIfHaveFood(){
  let bool = true;
  for(let i = blobs.length-1; i >= 0; i--){
    if(blobs[i].canMove){
      bool = false;
    }
  }
  if(bool){
    for(let i = blobs.length-1; i >= 0; i--){
      blobs[i].nextRound();
      if(blobs[i].foodCount == 0){
        //Tot
        blobs.splice(i, 1);
      } else if(blobs[i].foodCount == 1){
        //Leben
        blobs[i].foodCount = 0;
        blobs[i].canMove = true;
      } else if(blobs[i].foodCount > 1){
        //Bruder
        blobs[i].foodCount = 0;
        blobs[i].canMove = true;
        spawnBlob();
      }
    }
    spawnFood();
    round++;
    count++;
    print('Runde:', round, 'Blobs:', blobs.length);
    if(count >= genauigkeit){
      count = 0;
      dia.setAxe(0, round, 0, spawnedFood);
      dia.addInfo(blobs.length);
    }
  }
}
