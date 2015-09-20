(function(pfive){

  var BACKGROUND_COLOR  = [40,41,35]  //hex
      ,BASE_COLOR       = [200,200,200]  //hex
      ,ALPHA            = 0        
      ,THETA            = 0.001       //0.5<-->255
      ,NB_POINTS        = 50         //number
      ,COEFF_DUPLI      = 4
      ,DELAY            = 20
      ,IS_PAUSED        = false
      ,IS_FIRST         = true;

  //On initialise toutes les variables
  var can, pList;

  pfive.setup = function (){
    pfive.colorMode(pfive.RGB,255)
    pfive.devicePixelScaling(false);
    BASE_COLOR       = pfive.color(BASE_COLOR);
    BACKGROUND_COLOR = pfive.color(BACKGROUND_COLOR);
    ALPHA = 0;

    can = pfive.createCanvas(800, 800);
    can.parent('canvasWrapper');
    pfive.background(BACKGROUND_COLOR);
    pList =[];
    populateList();
  }

  pfive.draw = function (){
    if(ALPHA < 1) ALPHA += THETA;
    for(var i = 0; i < pList.length; i += 1){

      var pA = pList[i];
      if(pA.delay > 0) {
        pA.delay--;
        continue;
      }
      var iP = pfive.get(pA.x, pA.y);
      // verifie que le point est toujours dans le canvas et n'est pas déjà occupé
      if( !isInBound(pA) || (iP[0] != pfive.red(BACKGROUND_COLOR) || iP[1] != pfive.green(BACKGROUND_COLOR) || iP[2] != pfive.blue(BACKGROUND_COLOR)))
      {
        pList.splice(i,1);    //suppresion du point
        continue;             //passage au point suivant
      }

      //modification de la couleur du point
      pfive.colorMode(pfive.RGB, 255,255,255,1);
      pA.color = pfive.color(pfive.red(pA.color), pfive.green(pA.color), pfive.blue(pA.color), ALPHA);

      pfive.stroke(pA.color);
      pfive.point(pA.x, pA.y);

      //déplacement du point
      if (pA.axe === 'x') pA.x += pA.d;
      else                pA.y += pA.d;

      matrice(pA);
    }
  }

  /* COMMANDS
   ----------------------------------------------------------------------------*/
  pfive.getCommands = function(){
    return {
      inputs : {
        nbpoints : {
            label    : 'Points'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 50
              ,step        : 10
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 10, '50%' : 50, 'max' : 100 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setNbPoints
        }
        ,coeffdupli : {
            label    : 'Duplication'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 4
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 0, '50%' : 20, 'max' : 40 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setCoeffDupli
        }
        ,delay : {
            label    : 'Delay max'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 20
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 0, '50%' : 20, 'max' : 40 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setDelay
        }
        ,color : {
            label    : 'Couleur'
            ,type    : 'color'
            ,default : [200,200,200]
            ,action : setColor
        }
      }
      ,buttons : {
        redraw : {
          content : 'Redessiner'
          ,attr : { class : 'btn' }
          ,action : redessine
        }
      }
    };
  }

  var setNbPoints = function (value){
    NB_POINTS = pfive.round(value); 
  }

  var setColor = function (value){
    BASE_COLOR = value; 
  }

  var setCoeffDupli = function (value){
    COEFF_DUPLI = pfive.round(value); 
  }

  var setDelay = function (value){
    DELAY = pfive.round(value); 
  }

  var redessine = function (){
    pfive.setup();
  }

  //génère une list de points et ses paramètres 
  function populateList(){
    for (var i=0; i < NB_POINTS; i++){

        var a = {};
        a.axe   = (pfive.random(-1,1) > 0) ? 'x' : 'y';   //axe déplacement
        a.d     = (pfive.random(-1,1) > 0) ? 1   :  -1;   //direction déplacement
        a.color = BASE_COLOR;                  //couleur
        a.delay = pfive.round(pfive.random(0,DELAY));              //delay depart
        

        //on place le point aléatoirement en function de son déplacement 
        //(ie : si il se déplace vers la gauche on le place sur le bord droite du canvas)
        if      (a.axe == 'x' && a.d == 1)       //droite
        {
          a.x = 1;
          a.y = pfive.random(0, pfive.height);
        } 
        else if (a.axe == 'y' && a.d == -1) //haut
        { 
          a.x = pfive.random(0, pfive.width);
          a.y  = pfive.height-1;
        } 
        else if (a.axe == 'x' && a.d == -1) //gauche
        { 
          a.x = pfive.width-1;
          a.y = pfive.random(0, pfive.height);
        } 
        else                            //bas
        { 
          a.x = pfive.random(0, pfive.width);
          a.y = 1;
        }
        pList.push(a);
    }
  }

  // génère un nouveau point à partir du point donné
  function matrice(pR){

    if(pfive.random(0,100) > 100 - COEFF_DUPLI){
      var n = {};
      n.axe   = (pR.axe =='x')      ? 'y' : 'x';       //axe deplacement
      n.d     = (pfive.random(-1, 1) > 0) ? 1 : -1;    //direction déplacement
      n.color = pR.color;                              //couleur
      n.delay = pfive.round(pfive.random(0,DELAY));       //delay départ
      n.x     = pR.x;    
      n.y     = pR.y;    
      pList.push(n);
    }

  }

  // on verifie que le point est toujours dans le canvas
  function isInBound(tP){
    return (tP.x > 0 && tP.x < pfive.width && tP.y > 0 && tP.y < pfive.height) ? true : false;
  }

  //function de mise en pause de la boucle draw()
  pfive.keyPressed = function (){

    if(pfive.key != 'p' && pfive.key != 'P') return false;

    if (IS_PAUSED === true) {
      console.log('unpause'); 
      IS_PAUSED = false;
      pfive.loop();
    } else {
      console.log('pause');
      IS_PAUSED = true;
      pfive.noLoop();
    }
  }

});