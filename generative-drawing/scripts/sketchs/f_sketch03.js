(function(pfive) {
  // Constantes
  var BACKGROUND_COLOR  = '#282923'
      ,BASE_COLOR       = '#ffffff'
      ,NB_POINTS        = 2000 //int
      ,TWEAK            = 10
      ,INTENSITY        = 1;

  //On initialise toutes les variables
  var can, img, xoff;

  /* CORE
   ----------------------------------------------------------------------------*/
  pfive.preload = function() {
    //on instancie la scène
    pfive.colorMode(pfive.HSB, 360,100,100);
    IS_PAUSED        = false;
    BACKGROUND_COLOR = pfive.color(70,15,16);
    BASE_COLOR       = pfive.color(0,0,100);
    img = pfive.loadImage("assets/vermeer-girl-with-a-pearl-earring.jpg");
    can = pfive.createCanvas(800, 800);
  }

  pfive.setup = function(){
    xoff = 0;
  }

  pfive.draw = function(){
    for(var i = 0; i < img.height; i++){
      xoff = xoff + INTENSITY;
      var n = pfive.round(pfive.noise(xoff) * img.width / (2*TWEAK) - (img.width / (4 * TWEAK) ) );
      var c = img.get(0,i,img.width,1);
      pfive.image(c,n,i);
    }
    pfive.noLoop();
  }

  /* COMMANDS
   ----------------------------------------------------------------------------*/
  pfive.getCommands = function(){
    return {
      inputs : {
        decalage : {
            label    : 'Décalage'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 5
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 1, '50%' : 7, 'max' : 15 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setDecalage
        }
        ,intensite : {
            label    : 'Intensité'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 20
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 1, '50%' : 50, 'max' : 100 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setIntensity
        }
      }
      ,buttons : {
        redraw : {
          content : 'Redessiner'
            ,attr :{
              class : 'btn'
            }
            ,action : redessine
        }
      }
    };
  }

  /* METHODS
   ----------------------------------------------------------------------------*/
  var setDecalage = function (value){
    TWEAK = (1 / value) * 15; 
  }

  var setIntensity = function (value){
    INTENSITY = Math.round(value) / 100;

  }

  var redessine = function (){
    pfive.redraw();
  }
});