// Auteur : Fabien Bonnamy
// Site web : tutoprocessing.com/random-walker
//Sketch d'apprentissage qui montre comment faire un random walker
// Un random walker est une particule qui se deplace de facon aléatoire sur l'ecran 

//On initialise toutes les variables

var positionx ,positiony, initx, inity, directionx, directiony, taille, thau, distance, xInc, count, graypoints;

function setup(){
  createCanvas(600, 600);
  background('#333333'); // on donne un fond blanc 
  smooth(); // on améliore le rendu (en option)
  xInc=0;
  count=0;
  graypoints=[];
  iterationstop = 0;

  // on place notre future ellipse au centre de l'éctan
  positionx = 0;
  positiony = height/2;
  initx     = positionx;
  inity     = positiony;

}

function draw(){
  if(count<7) cloud();
  else if (count==7) compute();
  else {
    drip();
  }
}

function cloud(){
  xInc+= 0.10;
  //on choisi au hasard un mouvement pour x et y
  directionx = round(randomGaussian(6, 0));    //deplacement sur l'axe x proche de 0
  directiony = map(noise(xInc), 0, 1, -8, 8);   //déplacement sur l'axe y entre 0 et -6

  //on sauvegarde la dernière position
  initx     = positionx;
  inity     = positiony;

  // La nouvelle position de l'ellispe est égale à son ancienne position (x et y)
  positionx = positionx + directionx;
  positiony = positiony + directiony;

  //calcul de la distance et de l'angle entre les 2 points
  distance = dist(initx,inity,positionx,positiony);
  thau = atan2((positiony - inity) , (positionx - initx));

  //si le nouveau point sort de l'écran on en calcul un nouveau en bas de l'écran
  if(positiony < 0 || positiony > height || positionx < 0 || positionx > width){

    positionx = 4;
    positiony = floor(random(1, height));
    
    initx = positionx;
    inity = positiony;

    count+=1;
  }

  taille = round(random(6, 50)); // on change la taille de l'ellispe à chaque tour du draw pour rendre ça plus funky

  push();

  translate(positionx,positiony);
  rotate(thau);

  noFill();
  stroke('#555555');
  line(0, 0, taille, taille); // enfin on dessinne notre ellipse



  pop();
  //line(initx,inity,positionx,positiony);
}

function compute(){
  count+=1;
  xInc=0;
  var c = color('#333333');
  loadPixels();
  var d =1; //pixeldensity
  var nbpixels = 4 * (width * d) * (height * d);

  for (var i = 0; i < nbpixels; i+=4) {
    if( pixels[i] != red(c) || pixels[i+1] != green(c) || pixels[i+2] != blue(c) || pixels[i+3] != alpha(c)){
      var a =[(i/4) % width, floor((i/4)/width) ];
      append(graypoints, a);
    }
  }

}

function drip(){

  colorMode(HSB, 360, 100, 100, 1);
  xInc+=0.3;
  if(10 +xInc < 20){
    var c = color(360, 0, 10+xInc,1);
    for (var k=0; k<graypoints.length; k++) {
      stroke(c);
      graypoints[k][1]+=2;
      var testingpoint = get(graypoints[k][0],graypoints[k][1]);

      if( testingpoint[0]!=51 || testingpoint[1]!=51 || testingpoint[2]!=51 ){
        graypoints.splice(k,1);
      }else{
        point(graypoints[k][0], graypoints[k][1]);
      }
    }

  }
}