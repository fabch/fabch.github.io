(function(p) {
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

  p.setup = function(){
    //on instancie la scène
    can = p.createCanvas(800, 800);
    can.parent('canvasWrapper')
    p.frameRate(30);

    //setUp
     IS_PAUSED        = false
    ,BACKGROUND_COLOR = p.color(BACKGROUND_COLOR)
    ,BASE_COLOR       = p.color(BASE_COLOR)
    ,v1               = p.createVector(-SIZE,0)
    ,mult             = MULT
    ,alpha            = p.TWO_PI / MOD
    ,loopCount        = 0;

    if (SIZE == 'screen') v1 = p.createVector(p.width/2,0);
    if (SIZE == 'fullScreen') v1 = p.createVector(sqrt(sq(p.width/2) + sq(p.height/2)),0);

    p.background(BACKGROUND_COLOR);
    p.colorMode(p.HSB,360,100,100);
    c = p.color(0,60,50);

  }

  p.draw = function (){

    cleanCanvas();
    p.push();
    p.translate(p.width/2,p.height/2);
    drawGrid();
    mult += STEP;
    for(a = 0; a < FILL; a++){
       
       v2 = v1.copy();
       v3 = v1.copy();
       b  = (a * mult) % MOD;
       var r1 = (alpha * b) % p.TWO_PI;
       var r2 = (alpha * a) % p.TWO_PI;
       v2.rotate(r1);
       v3.rotate(r2);
       var v4 = p5.Vector.lerp(v2,v3);
       c = p.color(p.degrees(v4.heading()),60,50);
       //c = color(0,0,0);
       p.stroke(c);
       p.line(v2.x,v2.y,v3.x,v3.y);

    }
    loopCount++;
    p.pop();
    //noLoop();
  }

  function upMOD(){
    MOD  += STEP*10;
    alpha = TWO_PI / MOD;
  }

  function cleanCanvas(){
    p.noStroke();
    p.fill(BACKGROUND_COLOR);
    p.rect(0,0,p.width,p.height);
  }


  function drawGrid(){
    p.stroke('#1a6f17');
    p.strokeWeight(1);
    p.noFill();
    p.line(0, -p.height, 0, p.height); //axe y;
    p.line(-p.width, 0, p.width, 0); //axe x
    p.noStroke();
    p.fill('#1a6f17');
    p.triangle(50,5,50,-5,55,0); // direction x
  }

  //function de mise en pause de la boucle draw()
  function keyPressed(){
    if(key === 'p' || key === 'P'){
      if(IS_PAUSED === true) {
        console.info('unpause'); 
        IS_PAUSED = false;
        p.loop();
      }else {
        console.info('pause');

        IS_PAUSED = true;
        p.noLoop();
      }
    }

    if(keyCode === 39){
      p.redraw();
    }

    if(key === 's' || key === 'S'){
      saveFrame();
    }

    if(key === 'h' || key === 'H'){
      showParameters({a:a, b:b, mul:mult, MOD:MOD});
    }
  }

  function showParameters(t){
        console.group('%cParametres', "type:info");
        _.each(t,function(value, key, list){
          console.debug( key + ' :', value);
        });
        console.groupEnd();
  }

  function saveFrame(){
    filenumber = loopCount;
    if(loopCount < 10) filenumber = '0' + filenumber;
    p.download(can.canvas, 'sketch_' + filenumber);
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