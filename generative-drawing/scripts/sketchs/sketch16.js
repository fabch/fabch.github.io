
// Constantes
var BACKGROUND_COLOR = '#282923'  //hex
   ,BASE_COLOR       = '#fa2573'  //hex
   ,NB_POINTS        = 50         //number
   ,BETA             = 4          //px
   ,ALPHA            = 8          //px
   ,TRI_BORDER       = false;     //bool

//On initialise toutes les variables
var a, b, mU, can, vertices, verticesD, IS_PAUSED, c, loopCount;

function setup(){
  //setUp
  IS_PAUSED        = false;
  BACKGROUND_COLOR = color(BACKGROUND_COLOR);
  BASE_COLOR       = color(BASE_COLOR);

  //on instancie la scène
  can = createCanvas(800, 800);
  frameRate(30);
  background(BACKGROUND_COLOR);
  loopCount = 0;

  a  = sf2d(random(0,20),random(0,20),random(0,20),random(0,20));
  //a  = sf2d(4,1,7,8);
  b  = sf2d(random(0,20),random(0,20),random(0,20),random(0,20));
  mU = mutatator(a,b);
}

function draw(){

  
  fill(BACKGROUND_COLOR);
  rect(0,0,width,height);
  translate(width/2,height/2);
  drawGrid();

  stroke('#ff0000');
  drawEntity(a);
  muteEntity();
  //console.info(loopCount);
  loopCount++;
  if(loopCount%60 == 0){
    a = b;
    b  = sf2d(random(0,20),random(0,20),random(0,20),random(0,20));
    mU = mutatator(a,b);
  }
  //noLoop();
}

function drawEntity(c){
  for(var i = 0; i<c.length; i+=1){
    point(c[i].x, c[i].y);
  }
}

function mutatator(a,b){
  var t = [];
  _.each(a,function(e,i,a){
    var m = p5.Vector.sub(b[i], a[i]);
    m.setMag(m.mag()/60);
    t.push(m);
  });
  return t;
}

function muteEntity(){
  _.each(a,function(e,i,t){
    e.add(mU[i]);
  });
}

function sf2d(n1,n2,n3,n4){
  var t = [];

  stroke('#1a6f17');
  for(var i = 0; i<TWO_PI; i+=0.001){
    var raux = pow(abs(pow(abs(cos(n1 * i/4)),n3)) + abs(abs(sin(n1 * i/4))),n4);
    var r = pow(abs(raux),(-1/n2));
    var x = r * cos(i) * 100;
    var y = r * sin(i) * 100;
    t.push(createVector(x,y));
  }
  return t;
}


function drawGrid(){
  stroke('#1a6f17');
  strokeWeight(1);
  noFill();
  line(0, -height, 0, height); //axe y;
  line(-width, 0, width, 0); //axe x
  noStroke();
  fill('#1a6f17');
  triangle(50,5,50,-5,55,0); // direction x
}

//on génère un tableau de points aléatoirement
function generateRandomPoints(nb){
  var tab=[];
  for(var i=0; i<nb; i++){
    tab.push([ round(random(0,width)) , round(random(0,height)) ]);
  }
  return tab;
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
