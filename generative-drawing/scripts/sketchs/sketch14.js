
// Constantes
var BACKGROUND_COLOR = '#282923'  //hex
   ,BASE_COLOR       = '#fa2573'  //hex
   ,NB_POINTS        = 50         //number
   ,BETA             = 4          //px
   ,ALPHA            = 8          //px
   ,TRI_BORDER       = false;     //bool

//On initialise toutes les variables
var can, vertices, verticesD, IS_PAUSED, c, loopCount;

function setup(){
  //setUp
  IS_PAUSED        = false;
  BACKGROUND_COLOR = color(BACKGROUND_COLOR);
  BASE_COLOR       = color(BASE_COLOR);

  //on instancie la scène
  can = createCanvas(800, 800);
  frameRate(1);
  background(BACKGROUND_COLOR);

  vertices = generateRandomPoints(NB_POINTS);
  vertices.push([-1,-1],[width+1,-1],[width+1,height+1],[-1,height+1]);
  verticesD = generateRandomVectors(NB_POINTS);
  loopCount = 0;
}

function draw(){

  noStroke();
  fill(BACKGROUND_COLOR);
  rect(0,0,width,height)
  noFill();

  var t = Delaunay.triangulate(vertices); //cf delaunay.js

  for(var i=0; i<t.length; i+=3){

    var ax = vertices[t[i]][0]
       ,ay = vertices[t[i]][1]
       ,bx = vertices[t[i+1]][0]
       ,by = vertices[t[i+1]][1]
       ,cx = vertices[t[i+2]][0]
       ,cy = vertices[t[i+2]][1];

    colorMode(HSB, 255,255,255);
    stroke(color( hue(BACKGROUND_COLOR),  60,  60));

    if(TRI_BORDER) triangle(ax,ay,bx,by,cx,cy);
    computeFill(ax,ay,bx,by,cx,cy);

  }
  //saveFrame();
  movePoints();
  noLoop();
}

// pour chaque triangle on calcul le côté le plus long
function computeFill(x1,y1,x2,y2,x3,y3){

  var vM, m1, m2, p1, p2, x, y 
     ,v1 = createVector(x1,y1)
     ,v2 = createVector(x2,y2)
     ,v3 = createVector(x3,y3)
     ,d1 = p5.Vector.dist(v1,v2) 
     ,d2 = p5.Vector.dist(v2,v3)
     ,d3 = p5.Vector.dist(v3,v1) 

  //on défini le point opposé en vA
  if (d1 > d2 && d1 >d3) { computeEq(v3,v1,v2); } 
  else if(d2 > d3)       { computeEq(v1,v2,v3); }
  else                   { computeEq(v2,v3,v1); }

}

function computeEq(vA,vB,vC){

  // on calcul la translation et la rotation du plan pour obtenir l'origine en C et l'axe x sur CB
  var vAt = p5.Vector.sub(vA,vC);
  var vBt = p5.Vector.sub(vB,vC);
  var r   = vBt.heading();

  vAt.rotate(-r);
  vBt.rotate(-r);

  //on calcul les équations des doites CA et AB
  m1 = -vAt.y / -vAt.x;
  m2 = (vBt.y - vAt.y) / (vBt.x - vAt.x);
  p1 = vAt.y - (vAt.x * m1);
  p2 = vBt.y - (vBt.x * m2);

  push();
  translate(vC.x, vC.y);
  rotate(r);

  //on rempli le triangle
  for(var x = ALPHA; x < vBt.x-ALPHA; x+=BETA){
    c = BACKGROUND_COLOR;
    for(var y = ALPHA; y < ((x * m2) + p2)-ALPHA && y < ((x * m1) + p1)-ALPHA; y++){
      var s = (saturation(c)+2 <255) ? saturation(c)+2 : 255;
      var b = (brightness(c)+2 <255) ? brightness(c)+2 : 255;
      c = color( hue(c),  s,  b);
      stroke(c);
      point(x,y);
    } 
  }
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

//on génère un tableau de vecteurs alétoirement
function generateRandomVectors(nb){
  var t=[];
  for(var i=0; i<nb; i++){
    var v = p5.Vector.random2D();
    v.setMag(2);
    t.push(v);
  }
  return t;
}

//on déplace les points en fonction de leur vecteur
function movePoints(){
  vertices.splice(-4);
  for(var i=0; i<vertices.length; i++){
    var v1 = createVector(vertices[i][0],vertices[i][1]);
    var v2 = p5.Vector.add(v1, verticesD[i]);
    vertices[i][0] = v2.x;
    vertices[i][1] = v2.y;
    verticesD[i].rotate(HALF_PI/4);
  }
  vertices.push([-1,-1],[width+1,-1],[width+1,height+1],[-1,height+1]);
}

//function de mise en pause de la boucle draw()
function keyPressed(){
  if(key === 'p' || key === 'P'){
    if(IS_PAUSED === true) {
      console.log('unpause'); 
      IS_PAUSED = false;
      loop();
    }else {
      console.log('pause');
      IS_PAUSED = true;
      noLoop();
    }
  }

  if(keyCode === 39){
    redraw();
  }

  if(key === 's' || key === 'S'){
    saveFrame();
  }

}

function saveFrame(){
  filenumber = loopCount;
  if(loopCount < 10) filenumber = '0' + filenumber;
  download(can.canvas, 'sketch_' + filenumber);
  loopCount++;
}

function download(canvas, filename) {

    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL();

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {

        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        lnk.dispatchEvent(e);

    } else if (lnk.fireEvent) {

        lnk.fireEvent("onclick");
    }
}
