(function(pfive) {
  // Constantes
  var BACKGROUND_COLOR = '#282923'     //hex
     ,BASE_COLOR       = '#fa2573'     //hex
     ,FILL             = 2000          //int
     ,MOD              = 855           //int //855
     ,MULT             = 2             //int //370
     ,STEP             = 0.01          //float
     ,SIZE             = 'screen';     //px or 'fullScreen' or 'screen';

  //On initialise toutes les variables
  var can, a, b, v1, v2, v3, mult, alpha, can, IS_PAUSED, c, loopCount;

  pfive.setup = function(){
    //on instancie la scène
    can = pfive.createCanvas(800, 800);
    can.parent('canvasWrapper')
    pfive.frameRate(30);

    //setUp
     IS_PAUSED        = false
    ,BACKGROUND_COLOR = pfive.color(BACKGROUND_COLOR)
    ,BASE_COLOR       = pfive.color(BASE_COLOR)
    ,v1               = pfive.createVector(-SIZE,0)
    ,mult             = MULT
    ,alpha            = pfive.TWO_PI / MOD
    ,loopCount        = 0;

    if (SIZE == 'screen') v1 = pfive.createVector(pfive.width/2,0);
    if (SIZE == 'fullScreen') v1 = pfive.createVector(sqrt(sq(pfive.width/2) + sq(pfive.height/2)),0);

    pfive.background(BACKGROUND_COLOR);
    pfive.colorMode(pfive.HSB,360,100,100);
    c = pfive.color(0,60,50);

  }

  pfive.draw = function (){

    cleanCanvas();
    pfive.push();
    pfive.translate(pfive.width/2,pfive.height/2);
    drawGrid();
    mult += STEP;
    for(a = 0; a < FILL; a++){
       
       v2 = v1.copy();
       v3 = v1.copy();
       b  = (a * mult) % MOD;
       var r1 = (alpha * b) % pfive.TWO_PI;
       var r2 = (alpha * a) % pfive.TWO_PI;
       v2.rotate(r1);
       v3.rotate(r2);
       var v4 = p5.Vector.lerp(v2,v3);
       //c = pfive.color(pfive.degrees(v4.heading()),60,50);
       //c = color(0,0,0);
       pfive.stroke(c);
       pfive.line(v2.x,v2.y,v3.x,v3.y);

    }
    loopCount++;
    pfive.pop();
    //noLoop();
  }

   /* COMMANDS
   ----------------------------------------------------------------------------*/
  pfive.getCommands = function(){
    return {
      inputs : {
        param_fill : {
            label    : 'Fill'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 2000
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 1, '50%' : 1000, 'max' : 2000 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setFill
        }
        ,param_mod : {
            label    : 'Mod'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 855
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 1, '50%' : 500, 'max' : 1000 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setMod
        }
        ,param_mult : {
            label    : 'Mult'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 370
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 1, '50%' : 400, 'max' : 800 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setMult
        }        
        ,param_step : {
            label    : 'Step'
            ,type    : 'noUiSlider'
            ,options : { 
              start        : 50
              ,step        : 1
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 1, '50%' : 50, 'max' : 100 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setStep
        }
      }
    };
  }

  var setFill = function(value){
    FILL = value;
  }

  var setMod = function(value){
    MOD = value;
  }  

  var setMult = function(value){
    MULT = value;
  }  

  var setStep = function(value){
    STEP = value /100;
  }

  function upMOD(){
    MOD  += STEP*10;
    alpha = TWO_PI / MOD;
  }

  function cleanCanvas(){
    pfive.noStroke();
    pfive.fill(BACKGROUND_COLOR);
    pfive.rect(0,0,pfive.width,pfive.height);
  }


  function drawGrid(){
    pfive.stroke('#1a6f17');
    pfive.strokeWeight(1);
    pfive.noFill();
    pfive.line(0, -pfive.height, 0, pfive.height); //axe y;
    pfive.line(-pfive.width, 0, pfive.width, 0); //axe x
    pfive.noStroke();
    pfive.fill('#1a6f17');
    pfive.triangle(50,5,50,-5,55,0); // direction x
  }

  //function de mise en pause de la boucle draw()
  function keyPressed(){
    if(key === 'p' || key === 'P'){
      if(IS_PAUSED === true) {
        console.info('unpause'); 
        IS_PAUSED = false;
        pfive.loop();
      }else {
        console.info('pause');

        IS_PAUSED = true;
        pfive.noLoop();
      }
    }

    if(keyCode === 39){
      pfive.redraw();
    }

    if(key === 's' || key === 'S'){
      saveFrame();
    }

    if(key === 'h' || key === 'H'){
      showParameters({a:a, b:b, mul:mult, MOD:MOD});
    }
  }

  function showParameters(t){
        _.each(t,function(value, key, list){
        });
  }

  function saveFrame(){
    filenumber = loopCount;
    if(loopCount < 10) filenumber = '0' + filenumber;
    pfive.download(can.canvas, 'sketch_' + filenumber);
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
})