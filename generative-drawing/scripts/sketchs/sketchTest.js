
// Constantes
var BACKGROUND_COLOR = '#282923', 
    BASE_COLOR       = '#fa2573', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px

//On initialise toutes les variables
var entities, v;

function setup(){

  //on instancie la scène
  createCanvas(600, 600);
  background(BACKGROUND_COLOR);
  CanvasRenderingContext2D.imageSmoothingEnabled;

  //définition des variables
  v = p5.Vector.random2D();
  entities = [
    [ { x:0 , y:0 } , v ]
  ];

}

function draw(){

  var v1 = createVector(120,100);
  var v2 = v1.copy();

  stroke('#ff0000');
  point(v2.x,v2.y);

  push();
  translate(width/2,height/2);
  rotate(HALF_PI);

  stroke('#ffffff');
  point(v1.x,v2.y);
  pop();

  
  v2.rotate(HALF_PI);
  v2.add(width/2,height/2);
  stroke('#00ff00');
  console.log(v2);
  point(v2.x,v2.y);

}

function test(){
  stroke(BASE_COLOR);
  line((width/2)-50, height/2,(width/2)+50,height/2);
  fill(BASE_COLOR);
  triangle((width/2)+50,(height/2)-10,(width/2)+50,(height/2)+10,(width/2)+60,height/2);

  push();
  translate(width/2,height/2);
  rotate(HALF_PI);

  stroke('#ffffff');
  fill('#ffffff');
  line(-50, 0,50,0);
  triangle(50,-10,50,10,60,0);
  pop();

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
  if(imagePoint[0]!=red(backgroundColor) || imagePoint[1]!=green(backgroundColor) || imagePoint[2]!=blue(backgroundColor)) return false;
  return true;
}

        
