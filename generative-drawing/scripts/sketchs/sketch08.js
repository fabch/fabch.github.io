
// Constantes
var BACKGROUND_COLOR = '#FFFFFF', 
    BASE_COLOR       = '#fa2573', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px

//On initialise toutes les variables
var entities, v, vT,vA;

function setup(){

  //on instancie la scène
  createCanvas(600, 600);
  background(BACKGROUND_COLOR);
  //CanvasRenderingContext2D.imageSmoothingEnabled;

  //définition des variables
  v = p5.Vector.random2D();
  entities = [
    [ { x:0 , y:0 } , v ]
  ];

}

function draw(){
  push();

  translate(50,50);

  rotate(QUARTER_PI/2);
  drawGrid();
  stroke('#000000');
  point(30,30);
  pop();

  vT = createVector(50,50);
  vA = p5.Vector.fromAngle(QUARTER_PI/2);
  console.log(isBackgroundColor([30,30],vA,vT)); //false;

  noLoop();
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
function drawGrid(){
  push();
  stroke('#691d18');
  strokeWeight(1);
  noFill();
  line(0, -height, 0, height); //axe y;
  line(-width, 0, width, 0); //axe x
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