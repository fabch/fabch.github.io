// Auteur : Fabien Bonnamy
// Site web : tutoprocessing.com/random-walker
//Sketch d'apprentissage qui montre comment faire un random walker
// Un random walker est une particule qui se deplace de facon aléatoire sur l'ecran 

//On initialise toutes les variables

var positionx ,positiony, initx, inity, directionx, directiony, taille, thau, distance, xInc;

function setup(){
  createCanvas(600, 600);
  background('#282923'); // on donne un fond blanc 
  smooth(); // on améliore le rendu (en option)
  xInc=0;

  // on place notre future ellipse au centre de l'éctan
  positionx = width/2;
  positiony = height-4;
  initx     = positionx;
  inity     = positiony;
}

function draw(){
  cloud();
}

function cloud(){
  xInc+= 0.10;
  //on choisi au hasard un mouvement pour x et y
  directionx = map(noise(xInc), 0, 1, -8, 8);    //deplacement sur l'axe x proche de 0
  directiony = round(randomGaussian(-6, 6));          //déplacement sur l'axe y entre 0 et -6

  //on sauvegarde la dernière position
  initx     = positionx;
  inity     = positiony;

  // La nouvelle position de l'ellispe est égale à son ancienne position (x et y)
  positionx = positionx + directionx;
  positiony = positiony + directiony;

  //calcul de la distance et de l'angle entre les 2 points
  distance = dist(initx,inity,positionx,positiony);
  console.log(dist);
  thau = atan2((positiony - inity) , (positionx - initx));

  //si le nouveau point sort de l'écran on en calcul un nouveau en bas de l'écran
  if(positiony < 0 || positiony > height || positionx < 0 || positionx > width){

    positionx = floor(random(1, width));
    positiony = height;
    
    initx = positionx;
    inity = positiony;
  }

  taille = round(random(6, 12)); // on change la taille de l'ellispe à chaque tour du draw pour rendre ça plus funky

  push();

  translate(positionx,positiony);
  rotate(thau);

  noFill();
  stroke('#000000');

  //curve( positionx-taille, initx, initx, inity, positionx, positiony, positionx-taille, positiony);
  //bezier(0,0, -taille,0, directiony-taille,directiony, directionx,directiony);
  ellipse(0, 0, distance*2, distance*2); // enfin on dessinne notre ellipse

  fill('#20211c');
  noStroke();
  //ellipse( -distance/2, 0, distance*2, distance*2 ); // enfin on dessinne notre ellipse
  pop();
  //line(initx,inity,positionx,positiony);
}