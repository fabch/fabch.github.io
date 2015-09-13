
// Constantes
var BACKGROUND_COLOR = '#282923', 
    BASE_COLOR       = '#fa2573', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px

//On initialise toutes les variables
var vertices, verticesDirection, isPaused;

function setup(){

  //on instancie la scène
  createCanvas(600, 600);
  BACKGROUND_COLOR = color('#282923');
  background(BACKGROUND_COLOR);
  //CanvasRenderingContext2D.imageSmoothingEnabled;
  isPaused =false;

  vertices = generateRandomPoints(50);
  vertices.push([0,0],[width,0],[width,height],[0,height]);
  verticesDirection = generateRandomVectors(50);

}

function draw(){
  noStroke();
  fill(BACKGROUND_COLOR);
  rect(0,0,width,height);
  colorMode(RGB,100);
  stroke('#ffffff');
  
  triangles = Delaunay.triangulate(vertices);

  for(var i=0; i<triangles.length; i+=3){
    var c = color(100,100,100,random(0,100));
  fill(c);
    triangle(vertices[triangles[i]][0],vertices[triangles[i]][1],vertices[triangles[i+1]][0],vertices[triangles[i+1]][1],vertices[triangles[i+2]][0],vertices[triangles[i+2]][1]);
    if(i==12) fillColors(vertices[triangles[i]][0],vertices[triangles[i]][1],vertices[triangles[i+1]][0],vertices[triangles[i+1]][1],vertices[triangles[i+2]][0],vertices[triangles[i+2]][1]);
  }
  noLoop();
  movePoints();
}

function fillColors(xa,ya,xb,yb,xc,yc){
  push();
  stroke('#ff0000');
  var m = (ya-yb) / (xa-xb);
  var p = ya-(xa*m);
  
  if(xb > xa){
    for(var xP=xa; xP<xb; xP++){
      var yP = xP*m + p;
      point(xP,yP);
    }
  }else{
    for(var xP=xa; xP<xb; xP++){
      var yP = xP*m + p;
      point(xP,yP);
    }  
  }
  pop();
}

function movePoints(){
  vertices.splice(-4);
  for(var i=0; i<vertices.length; i++){
    var v1 = createVector(vertices[i][0],vertices[i][1]);
    var v2 = p5.Vector.add(v1, verticesDirection[i]);
    vertices[i][0] = v2.x;
    vertices[i][1] = v2.y;
    if(!isInBound(vertices[i])){
      vertices[i][0] = round(random(0,width));
      vertices[i][1] = round(random(0,height));
    }
  }
  vertices.push([0,0],[width,0],[width,height],[0,height]);
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
function isBackgroundColor(testPoint,vA,vT){

  var vTestPoint = createVector(testPoint[0],testPoint[1]);
  vTestPoint.rotate(vA.heading());
  vTestPoint.add(vT);

  var bg = color(BACKGROUND_COLOR);
  var imagePoint = get(vTestPoint.x,vTestPoint.y);
  if(imagePoint[0]!=red(bg) || imagePoint[1]!=green(bg) || imagePoint[2]!=blue(bg)) return false;
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

