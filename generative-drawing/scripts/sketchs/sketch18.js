
// Constantes
var BACKGROUND_COLOR = '#282923', 
    BASE_COLOR       = '#ffffff', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    NB_POINTS        = 500//int
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px
    BETA             = 10;  //px

//On initialise toutes les variables
var vertices, verticesDirection, IS_PAUSED, loopCount, c, img;

function preload() {
  img = loadImage("assets/vermeer-girl-with-a-pearl-earring.jpg");
}

function setup(){

  //on instancie la scène
  
  colorMode(HSB, 360,100,100);
  IS_PAUSED        = false;
  BACKGROUND_COLOR = color(70,15,16);
  BASE_COLOR       = color(0,0,100);
  createCanvas(800, 800);
  background(BACKGROUND_COLOR);
  image(img, 0, 0);
  loopCount = 0;

  vertices = generateRandomPoints(NB_POINTS);
  //verticesDirection = generateRandomVectors(NB_POINTS);
  //vertices.push([-1,-1],[width+1,-1],[width+1,height+1],[-1,height+1]);

}

function draw(){

  //cleanCanvas();
  drawNet();
  noLoop();
  //movePoints();
}


//on génère un tableau de points aléatoirement
function generateRandomPoints(nb){
  var tab=[];
  for(var i=0; i<nb; i++){
    tab.push([ round(random(0,width)) , round(random(0,height)) ]);
  }
  return tab;
}

function drawNet(){
  stroke(BASE_COLOR);
  noFill();

  //vertices.push([ mouseX , mouseY ]);
  var t = Delaunay.triangulate(vertices); //cf delaunay.js

  for(var i=0; i<t.length; i+=3){

    var v1 = createVector(vertices[ t[i] ][0], vertices[ t[i]   ][1])
       ,v2 = createVector(vertices[ t[i+1] ][0], vertices[ t[i+1] ][1])
       ,v3 = createVector(vertices[ t[i+2] ][0], vertices[ t[i+2] ][1])

    var cc = p5.Vector.lerp(v1,v2,0.5);
    var gg = p5.Vector.lerp(v3,cc,2/3);
    var c = img.get(gg.x, gg.y);

    colorMode(RGB,255,255,255,1);
    noStroke();
    //fill(c[0],c[1],c[2]);
    //triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
    /* pour voir le centroid 
    stroke(255,0,0,1);
    point(gg.x,gg.y); */
    stroke(c[0],c[1],c[2]);
    for(var j=0; j<1; j+=0.05){
      var aa = p5.Vector.lerp(v1,v2,j);
      var bb = p5.Vector.lerp(v1,v3,j);

      line(bb.x,bb.y,aa.x,aa.y);

      
    }

    
  }
  vertices.pop();
}