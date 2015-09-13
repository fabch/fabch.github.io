
// Constantes
var BACKGROUND_COLOR = '#282923', 
    BASE_COLOR       = '#fa2573', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px

//On initialise toutes les variables
var vertices, IS_PAUSED;

function setup(){

  //on instancie la scène
  IS_PAUSED        = false;
  BACKGROUND_COLOR = color('#282923');
  BASE_COLOR       = color('#fa2573');
  createCanvas(displayWidth, displayHeight);
  background(BACKGROUND_COLOR);
  
  vertices = generateRandomPoints(50);

}

function draw(){

  cleanCanva();
  drawNet();
  noLoop();
}

function cleanCanva(){

  noStroke();
  fill(BACKGROUND_COLOR);
  rect(0,0,width,height);

}

function drawNet(){

  colorMode(RGB,100);
  stroke(BASE_COLOR);
  noFill();

  var t = Delaunay.triangulate(vertices); //cf delaunay.js

  for(var i=0; i<t.length; i+=3){

    triangle( 
       vertices[t[i]][0]
      ,vertices[t[i]][1]
      ,vertices[t[i+1]][0]
      ,vertices[t[i+1]][1]
      ,vertices[t[i+2]][0]
      ,vertices[t[i+2]][1]
    );

    computeFill( 
       vertices[t[i]][0]
      ,vertices[t[i]][1]
      ,vertices[t[i+1]][0]
      ,vertices[t[i+1]][1]
      ,vertices[t[i+2]][0]
      ,vertices[t[i+2]][1]
    );
  }
  vertices.pop();

}

function computeFill(x1,y1,x2,y2,x3,y3){

  var vM, m1, m2, p1, p2 
     ,v1 = createVector(x1,y1)
     ,v2 = createVector(x2,y2)
     ,v3 = createVector(x3,y3)
     ,d1 = dist(v1,v2)          //1=>2
     ,d2 = dist(v2,v3)          //2=>3
     ,d3 = dist(v3,v1)          //3=>1

  //On calcul le plus grand côté et on défini le point opposé en vA

  if (d1 > d2 && d1 >d3) { computeEq(v3,v2,v1); } 
  else if(d2 > d3)       { computeEq(v1,v2,v3); }
  else                   { computeEq(v2,v1,v3); }

}

//On résout les équations des droites passants par le point A

function computeEq(vA,vB,vC){

  vM = vA;
  m1 = (vA.y - vB.y) / (vA.x - vB.x);
  m2 = (vA.y - vC.y) / (vA.x - vC.x);
  p1 = vA.y - (vA.x * m1);
  p2 = vA.y - (vA.x * m2);
  //AC => y = x * m1 + p1
  //AB => y = x * m2 + p2
  computeMove(vA,vB,vC);
}

function computeMove(vA,vB,vC){

  if        (vA.x > vB.x && vA.x > vC.x && vB.x > vC.x){ console.log('ABC') //ABC sur x 

  } else if (vA.x > vB.x && vA.x > vC.x && vB.x < vC.x){ console.log('ACB') //ACB sur x 

  } else if (vA.x < vB.x && vA.x > vC.x && vB.x > vC.x){ console.log('BAC') //BAC sur x    

  } else if (vA.x < vB.x && vA.x < vC.x && vB.x > vC.x){ console.log('BCA') //BCA sur x 

  } else if (vA.x > vB.x && vA.x < vC.x && vB.x < vC.x){ console.log('CAB') //CAB sur x 

  } else if (vA.x < vB.x && vA.x < vC.x && vB.x < vC.x){ console.log('CBA') //CBA sur x 

  }
  
}






/**********************************************************************************************************UTILS*/

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

  var tab = [];
  for(var i = 0; i < nb; i++){
    tab.push([round(random(0,width)) , round(random(0,height))]);
  }
  return tab;

}

// on verifie que le point est toujours dans le canvas
function isInBound(testPoint){

  return (testPoint[0] > 0 && testPoint[0] < width && testPoint[1] > 0 && testPoint[1] < height) ? true : false;

}

//on vérifie si la couleur du pixel aux coordonnées est celle du background
function isBackgroundColor(testPoint,vA,vT){

  var vT = createVector(testPoint[0],testPoint[1]);
  vTestPoint.rotate(vA.heading());
  vTestPoint.add(vT);

  var bg = color(BACKGROUND_COLOR);
  var imagePoint = get(vTestPoint.x,vTestPoint.y);
  return (imagePoint[0] != red(bg) || imagePoint[1] != green(bg) || imagePoint[2] != blue(bg)) ? false : true;

}

//function de mise en pause de la boucle
function keyPressed(){

  if(key === 'p' || key === 'P'){
    if(IS_PAUSED === true) {
      console.log('unpause'); 
      IS_PAUSED = false;
      loop();
    } else {
      console.log('pause');
      IS_PAUSED = true;
      noLoop();
    }
  }

}

