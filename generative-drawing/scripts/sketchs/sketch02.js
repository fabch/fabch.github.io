// Auteur : Fabien Bonnamy
// Site web : tutoprocessing.com/random-walker
//Sketch d'apprentissage qui montre comment faire un random walker
// Un random walker est une particule qui se deplace de facon aléatoire sur l'ecran 

//On initialise toutes les variables

var i=0;

function setup(){
  createCanvas(600, 600);
  background('#333333'); // on donne un fond blanc 
  smooth(); // on améliore le rendu (en option)
}

function draw(){
  cloud();
  console.log(pixels);
}

function cloud(){

  

  noFill();
  stroke('#ffffff');
  bezier(0,0, 0,300, 300,300, 300,0);
  point (0,300);
  point (300,300);
  loadPixels();
}