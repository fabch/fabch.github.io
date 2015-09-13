
// Constantes
var BACKGROUND_COLOR = '#282923', 
    BASE_COLOR       = '#fa2573', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px

//On initialise toutes les variables
var entities, entitiestmp, entitiesDirection, alpha, isPaused, a, b, c, currentDist;

function setup(){

  //on instancie la scène
  createCanvas(600, 600);
  BACKGROUND_COLOR = color('#282923');
  background(BACKGROUND_COLOR);
  CanvasRenderingContext2D.imageSmoothingEnabled;
  isPaused =false;

  entities = generateRandomPoints(30);
  entitiestmp = [];
  entitiesDirection = generateRandomVectors(30);
  currentDist = 0;

}

function draw(){
  noStroke();
  fill(BACKGROUND_COLOR);
  rect(0,0,width,height);
  drawTriangle();
  movePoints();
}

function drawTriangle(){
  stroke(color(255,255,255,65));
  fill(color(255,255,255,25));
  var pIndex = 0;
  a = entities[0];
  entitiestmp.push(a);

  for(var i=0; i<entities.length; i++){
    point(entities[i][0],entities[i][1]);
  }

  for(var i=0; i<entities.length; i++){
    var newDist = dist(entities[0][0],entities[0][1],entities[i][0],entities[i][1]);
    if(newDist>currentDist && newDist>0) {
      currentDist = newDist;
      pIndex = i;
    }
  }

  b = entities[pIndex];
  entities.splice(pIndex, 1);
  entitiestmp.push(b);

  while(entities.length>0){

    currentDist =0;
    var center = [ (a[0]+b[0])/2, a[1]+b[1]/2 ];
    var pIndex = 0;

    for(var i=0; i<entities.length; i++){
      var newDist = dist(center[0],center[1],entities[i][0],entities[i][1]);
      if(newDist>currentDist && newDist>0) {
        currentDist = newDist;
        pIndex = i;
      }
    }
    c = entities[pIndex];
    entities.splice(pIndex, 1);
    entitiestmp.push(c);
    
    triangle(a[0],a[1],b[0],b[1],c[0],c[1]);
    a = b;
    b = c;
  }
  entities = entitiestmp;
  entitiestmp =[];
 
}

function movePoints(){
  for(var i=0; i<entities.length; i++){
    var v1 = createVector(entities[i][0],entities[i][1]);
    var v2 = p5.Vector.add(v1, entitiesDirection[i]);
    entities[i][0] = v2.x;
    entities[i][1] = v2.y;
    if(!isInBound(entities[i])){
      entities[i][0] = round(random(0,width));
      entities[i][1] = round(random(0,height));
    }
  }
}

function drawGrid(){
  push();
  stroke('#691d18');
  strokeWeight(1);
  noFill();
  line(0, -height, 0, height); //axe y;
  line(-width, 0, width, 0); //axe x
  rect(0,0,width,height); //bound
  noStroke();
  fill('#691d18');
  triangle(50,5,50,-5,55,0); // direction x
  pop();
}


//on génère un tableau de points aléatoirement
function generateRandomPoints(nb){
  var tab=[];
  for(var i=0; i<nb; i++){
    tab.push([ round(random(0,width)) , round(random(0,height)) ]);
  }
  return tab;
}

//on génère un tableau de points aléatoirement
function generateRandomVectors(nb){
  var tab=[];
  for(var i=0; i<nb; i++){
    var v = p5.Vector.random2D();
    v.setMag(2);
    tab.push(v);
  }
  return tab;
}

// on verifie que le point est toujours dans le canvas
function isInBound(testPoint){
  if(testPoint[0]>0 && testPoint[0]<width && testPoint[1]>0 && testPoint[1]<height) return true;
  return false;
}

//on vérifie si la couleur du pixel aux coordonnées est celle du background
function isBackgroundColor(testPoint){
  var imagePoint = get(testPoint[0],testPoint[1]);
  if(imagePoint[0]!=red(BACKGROUND_COLOR) || imagePoint[1]!=green(BACKGROUND_COLOR) || imagePoint[2]!=blue(BACKGROUND_COLOR)) return false;
  return true;
}

//function de mise en pause de la boucle
function keyPressed(){
  if(key === 'p' || key === 'P'){
    if(isPaused === true) {
      console.log('unpause'); 
      isPaused = false;
      loop();
    }else {
      console.log('pause');
      isPaused = true;
      noLoop();
    }
  }
}