//CONSTANTES
var BACKGROUND_COLOR = '#282923'  //hex
   ,BASE_COLOR       = '#292325'  //hex
   ,ALPHA            = 0.5        //0.5<-->255
   ,NB_POINTS        = 50         //number
   ,IS_PAUSED        = false
   ,IS_FIRST         = true;

//On initialise toutes les variables
var pList;

function setup(){

  if(IS_FIRST) initCommand();
  console.info(BACKGROUND_COLOR, BASE_COLOR, ALPHA, NB_POINTS, IS_PAUSED,IS_FIRST);
  BASE_COLOR       = color(BASE_COLOR);
  BACKGROUND_COLOR = color(BACKGROUND_COLOR);
  createCanvas(800, 800);
  background(BACKGROUND_COLOR);
  pList =[];
  populateList();
}

function draw(){
  for(var i = 0; i < pList.length; i += 1){

    var p = pList[i];
    var iP = get(p.x, p.y);
    // verifie que le point est toujours dans le canvas et n'est pas déjà occupé
    if( !isInBound(p) || (iP[0] != red(BACKGROUND_COLOR) || iP[1] != green(BACKGROUND_COLOR) || iP[2] != blue(BACKGROUND_COLOR)))
    {
      pList.splice(i,1);    //suppresion du point
      continue;             //passage au point suivant
    }

    stroke(p.color);
    point(p.x, p.y);

    //déplacement du point
    if (p.axe === 'x') p.x += p.d;
    else               p.y += p.d;

    //modification de la couleur du point
    colorMode(HSB, 255,255,255);
    var s   = (saturation(p.color) + ALPHA < 255) ? saturation(p.color) + ALPHA : hue(BASE_COLOR);
    var b   = (brightness(p.color) + ALPHA < 255) ? brightness(p.color) + ALPHA : hue(BASE_COLOR);
    p.color = color(hue(p.color), s, b);
    matrice(p);
  }
}

//génère une list de points et ses paramètres 
function populateList(){

  for (var i=0; i<NB_POINTS; i++){

      var a = {};
      a.axe   = (random(-1,1) > 0) ? 'x' : 'y';   //axe déplacement
      a.d     = (random(-1,1) > 0) ? 1   :  -1;   //direction déplacement
      a.color = BASE_COLOR;                       //couleur
      a.delay = round(random(0,90));              //delay depart
      

      //on place le point aléatoirement en function de son déplacement 
      //(ie : si il se déplace vers la gauche on le place sur le bord droite du canvas)
      if      (a.axe == 'x' && a.d == 1)       //droite
      {
        a.x = 1;
        a.y = random(0,height);
      } 
      else if (a.axe == 'y' && a.d == -1) //haut
      { 
        a.x = random(0,width);
        a.y  =height-1;
      } 
      else if (a.axe == 'x' && a.d == -1) //gauche
      { 
        a.x = width-1;
        a.y = random(0,height);
      } 
      else                            //bas
      { 
        a.x = random(0,width);
        a.y = 1;
      }
      pList.push(a);

  }

}

// génère un nouveau point à partir du point donné
function matrice(pR){

  if(random(0,100) > 96){
    var n = {};
    n.axe   = (pR.axe =='x')      ? 'y' : 'x'; //axe deplacement
    n.d     = (random(-1, 1) > 0) ? 1 : -1;    //direction déplacement
    n.color = pR.color;                        //couleur
    n.delay = round(random(0,60));             //delay départ
    n.x     = pR.x;    
    n.y     = pR.y;    
    pList.push(n);
  }

}

// on verifie que le point est toujours dans le canvas
function isInBound(tP){
  return (tP.x > 0 && tP.x < width && tP.y > 0 && tP.y < height) ? true : false;
}

//function de mise en pause de la boucle draw()
function keyPressed(){

  if(key != 'p' && key != 'P') return false;

  if (IS_PAUSED === true) {
    console.log('unpause'); 
    IS_PAUSED = false;
    loop();
  } else {
    console.log('pause');
    IS_PAUSED = true;
    noLoop();
  }

}
function initCommand(){
  IS_FIRST = false; 

  l1 = createElement('label','NB_POINTS : ' + NB_POINTS);
  l1.parent('commandBlock');
  s1 = createSlider(1, 80, NB_POINTS);
  s1.attribute("step", "1");
  s1.parent('commandBlock');
  s1.elt.addEventListener('change',function(e){
    NB_POINTS = e.target.value;
    l1.html('NB_POINTS : ' + NB_POINTS);
  });

  
  l2 = createElement('label','ALPHA : ' + ALPHA);
  l2.parent('commandBlock');
  s2 = createSlider(0.5, 20, ALPHA);
  s2.attribute("step", "0.5");
  s2.parent('commandBlock');
  s2.elt.addEventListener('change',function(e){
    ALPHA = e.target.value;
    l2.html('ALPHA : ' + ALPHA);
  });

  l3 = createElement('label','BASE_COLOR :' + BASE_COLOR);
  l3.parent('commandBlock');
  s3 = createElement('input');
  s3.attribute("type", "color");
  s3.attribute("value", BASE_COLOR);
  s3.parent('commandBlock');
  s3.elt.addEventListener('change',function(e){
    BASE_COLOR = color(e.target.value);
    l3.html('BASE_COLOR : ' + BASE_COLOR);
  });

  l4 = createElement('label','BACKGROUND_COLOR : ' + BACKGROUND_COLOR);
  l4.parent('commandBlock');
  s4 = createElement('input');
  s4.attribute("type", "color");
  s4.attribute("value", BACKGROUND_COLOR);
  s4.parent('commandBlock');
  s4.elt.addEventListener('change',function(e){
    BACKGROUND_COLOR = color(e.target.value);
    l4.html('BACKGROUND_COLOR : ' + BACKGROUND_COLOR);
  });

  s5 = createButton("Apply",1);
  s5.parent('commandBlock');
  s5.elt.addEventListener('click',function(e){
    setup();
  });

}
