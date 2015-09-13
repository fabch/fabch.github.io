
// Constantes
var BACKGROUND_COLOR = '#282923', 
    BASE_COLOR       = '#fa2573', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px

//On initialise toutes les variables
var entities, v, isPaused, x1, y1, x2, x3, DIAG, nbline, maxlines;

function setup(){

  //on instancie la scène
  createCanvas(600, 600);
  BACKGROUND_COLOR = color('#282923');
  background(BACKGROUND_COLOR);
  CanvasRenderingContext2D.imageSmoothingEnabled;
  isPaused =false;
  DIAG = sqrt(sq(width) + sq(height));

  //définition des variables
  v = p5.Vector.random2D();
  
  x1 = randomGaussian(width/2,width/2);
  y1 = randomGaussian(width/2,width/2);
  x2 = x3 = 1;
  nbline = 0;
  maxlines = round(random(1,12));
}

function draw(){
  fill(BACKGROUND_COLOR);
  stroke(BACKGROUND_COLOR);
  strokeWeight(2);

  push();
  translate(x1,y1);
  rotate(v.heading());
  rect(-DIAG,0,DIAG*2,4);
  x1+=2;
  nbline+=1;
  if(nbline>maxlines){
    fill('#ffffff');
    rect(-DIAG,0,DIAG*2,6);
    x1 = randomGaussian(width/2,width/2);
    y1 = randomGaussian(width/2,width/2);
    v = p5.Vector.random2D();
    maxlines = round(random(1,4));
    nbline=0;
  }
  pop();
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

function test(){
  stroke(BASE_COLOR);
  line((width/2)-50, height/2,(width/2)+50,height/2);
  fill(BASE_COLOR);
  triangle((width/2)+50,(height/2)-10,(width/2)+50,(height/2)+10,(width/2)+60,height/2);

  translate(width/2,height/2);
  rotate(HALF_PI);

  stroke('#ffffff');
  fill('#ffffff');
  line(-50, 0,50,0);
  triangle(50,-10,50,10,60,0);

  stroke('#000000');
  fill('#000000');
  line(-50, 0,50,0);
  triangle(50,-10,50,10,60,0);
}
//génere le dessin des lignes et points
function drawline(){
  for(var i=0; i<entities.length; i++){
    var origine = entities[i][0];
    var currentVector = entities[i][1];
    var newLength = randomGaussian(BASE_LENGTH, BASE_GROW);
    var finalX = origine.x + currentVector.x * newLength;
    var finalY = origine.y + currentVector.y * newLength;
    line( origine.x, origine.y, finalX,finalY);

    var pointX = finalX + currentVector.x * DOT_SPACE;
    var pointY = finalY + currentVector.y * DOT_SPACE;
    point(pointX,pointY);

    matrice(pointX, pointY, entities[i]);

    var origineX = pointX + currentVector.x * DOT_SPACE;
    var origineY = pointY + currentVector.y * DOT_SPACE;

    entities[i][0] = { x:origineX, y:origineY };

    currentVector.rotate(randomGaussian(0,TWO_PI*BASE_DEV/100));
    entities[i][1] = currentVector;
  }
}

//génere un nouveau point à partir des coordonées
function matrice(pointX, pointY, entitie){

}

//dessine un triangle à l'ajouts d'une branche
function matrice(pointX, pointY, entitie){

}

//on génère un tableau de points aléatoirement
function generateRandomPoints(nb){
  var tab=[];
  for(var i=0; i<nb; i++){
    tab.push([ round(random(0,width)) , round(random(0,height)) ]);
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