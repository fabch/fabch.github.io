
// Constantes
var BACKGROUND_COLOR = '#282923', 
    BASE_COLOR       = '#fa2573', 
    BASE_LENGTH      = 50, //px
    BASE_GROW        = 4,  //px
    BASE_DEV         = 10, //%
    DOT_SPACE        = 10; //px
    BETA             = 3;  //px

//On initialise toutes les variables
var vertices, verticesDirection, IS_PAUSED, loopCount, c, img, colorTab;

function setup(){

  //on instancie la scène
  
  colorMode(HSB, 360,100,100);
  IS_PAUSED        = false;
  BACKGROUND_COLOR = color(70,15,16);
  BASE_COLOR       = color(338,15,16);
  createCanvas(800, 800);
  background(BACKGROUND_COLOR);

}

function draw(){

  colorMode(HSB, 360,100,100);
  for(var i =0; i<=width; i++){
    for(var j =0; j<=height; j++){
      var c = color(random(0,360),50,50);
      stroke(c);
      point(i,j);
    }
  }
  
  noLoop();
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

  if(key === 's' || key === 'S'){
    save('imageG.png');
  }
}