(function(p) {

  //CONSTANTES
  var BACKGROUND_COLOR = '#282923'  //hex
     ,BASE_COLOR       = '#292325'  //hex
     ,ALPHA            = 0.5        //0.5<-->255
     ,NB_POINTS        = 50         //number
     ,IS_PAUSED        = false
     ,IS_FIRST         = true;

  //On initialise toutes les variables
  var can, pList;

  p.setup = function (){
    BASE_COLOR       = p.color(BASE_COLOR);
    BACKGROUND_COLOR = p.color(BACKGROUND_COLOR);
    can = p.createCanvas(800, 800);
    can.parent('canvasWrapper');
    p.background(BACKGROUND_COLOR);
    pList =[];
    populateList();
  }

  p.draw = function (){
    for(var i = 0; i < pList.length; i += 1){

      var pA = pList[i];
      var iP = p.get(pA.x, pA.y);
      // verifie que le point est toujours dans le canvas et n'est pas déjà occupé
      if( !isInBound(pA) || (iP[0] != p.red(BACKGROUND_COLOR) || iP[1] != p.green(BACKGROUND_COLOR) || iP[2] != p.blue(BACKGROUND_COLOR)))
      {
        pList.splice(i,1);    //suppresion du point
        continue;             //passage au point suivant
      }

      p.stroke(pA.color);
      p.point(pA.x, pA.y);

      //déplacement du point
      if (pA.axe === 'x') pA.x += pA.d;
      else               pA.y += pA.d;

      //modification de la couleur du point
      p.colorMode(p.HSB, 255,255,255);
      var s   = (p.saturation(pA.color) + ALPHA < 255) ? p.saturation(pA.color) + ALPHA : p.hue(BASE_COLOR);
      var b   = (p.brightness(pA.color) + ALPHA < 255) ? p.brightness(pA.color) + ALPHA : p.hue(BASE_COLOR);
      pA.color = p.color(p.hue(pA.color), s, b);
      matrice(pA);
    }
  }

  //génère une list de points et ses paramètres 
  function populateList(){

    for (var i=0; i<NB_POINTS; i++){

        var a = {};
        a.axe   = (p.random(-1,1) > 0) ? 'x' : 'y';   //axe déplacement
        a.d     = (p.random(-1,1) > 0) ? 1   :  -1;   //direction déplacement
        a.color = BASE_COLOR;                       //couleur
        a.delay = p.round(p.random(0,90));              //delay depart
        

        //on place le point aléatoirement en function de son déplacement 
        //(ie : si il se déplace vers la gauche on le place sur le bord droite du canvas)
        if      (a.axe == 'x' && a.d == 1)       //droite
        {
          a.x = 1;
          a.y = p.random(0,p.height);
        } 
        else if (a.axe == 'y' && a.d == -1) //haut
        { 
          a.x = p.random(0,p.width);
          a.y  =p.height-1;
        } 
        else if (a.axe == 'x' && a.d == -1) //gauche
        { 
          a.x = p.width-1;
          a.y = p.random(0,p.height);
        } 
        else                            //bas
        { 
          a.x = p.random(0,p.width);
          a.y = 1;
        }
        pList.push(a);

    }
  }

  // génère un nouveau point à partir du point donné
  function matrice(pR){

    if(p.random(0,100) > 96){
      var n = {};
      n.axe   = (pR.axe =='x')      ? 'y' : 'x'; //axe deplacement
      n.d     = (p.random(-1, 1) > 0) ? 1 : -1;    //direction déplacement
      n.color = pR.color;                        //couleur
      n.delay = p.round(p.random(0,60));             //delay départ
      n.x     = pR.x;    
      n.y     = pR.y;    
      pList.push(n);
    }

  }

  // on verifie que le point est toujours dans le canvas
  function isInBound(tP){
    return (tP.x > 0 && tP.x < p.width && tP.y > 0 && tP.y < p.height) ? true : false;
  }

  //function de mise en pause de la boucle draw()
  function keyPressed(){

    if(key != 'p' && key != 'P') return false;

    if (IS_PAUSED === true) {
      console.log('unpause'); 
      IS_PAUSED = false;
      p.loop();
    } else {
      console.log('pause');
      IS_PAUSED = true;
      p.noLoop();
    }

  }
})