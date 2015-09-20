(function(pfive) {
  // Constantes
  var BACKGROUND_COLOR = '#282923', 
      BASE_COLOR       = '#ffffff', 
      NB_POINTS        = 2000; //int

  //On initialise toutes les variables
  var can, commands, vertices, loopCount, c, img, hs;

  /* CORE
   ----------------------------------------------------------------------------*/
  pfive.preload = function() {
    //on instancie la scène
    pfive.colorMode(pfive.HSB, 360,100,100);
    IS_PAUSED        = false;
    BACKGROUND_COLOR = pfive.color(70,15,16);
    BASE_COLOR       = pfive.color(0,0,100);
    hs               = [];
    img = pfive.loadImage("assets/vermeer-girl-with-a-pearl-earring.jpg");
    can = pfive.createCanvas(800, 800);

    can.mouseClicked(addHs);
    //addActions();
  }

  pfive.setup = function(){
    pfive.devicePixelScaling(false);

    pfive.background(BACKGROUND_COLOR);
    pfive.image(img, 0, 0);

    vertices = generateRandomGaussianPoints(NB_POINTS);
  }

  pfive.draw = function(){
    drawNet();
    pfive.noLoop();
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
              start        : 2000
              ,step        : 10
              ,direction   : 'ltr'
              ,orientation : 'horizontal'
              ,behaviour   : 'tap'
              ,connect     : 'lower'
              ,range       : { 'min' : 50, '50%' : 2000, 'max' : 4000 }
              ,pips        : { mode : 'range', density: 4 }
            }
            ,action : setNbPoints
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
        ,clean  : {
      content : 'Nettoyer'
      ,attr   :{
        class : 'btn'
      }
      ,action : nettoie
      ,cmd : 'cleanClickZone'
        }
      }
      ,specials : {
        hotspot : {
      type    : 'clickZone'
      ,class  : 'hotspot'
      ,action : addHs
        }
      }
    };
  }

  /* METHODS
   ----------------------------------------------------------------------------*/
  //on génère un tableau de points aléatoirement
  function generateRandomPoints(nb){
    var tab=[];
    for(var i=0; i<nb; i++){
      tab.push([ pfive.round(pfive.random(0,pfive.width)) , pfive.round(pfive.random(0,pfive.height)) ]);
    }
    tab.push([0,0],[0,pfive.height],[pfive.width,0],[pfive.width,pfive.height]);
    return tab;
  }

  //on génère un tableau de points aléatoirement
  function generateRandomGaussianPoints(nb){
    if(hs.length){
      var tab=[]
          cLimit = mod = nb/hs.length,
          cP = 0;

      for(var i=0; i<nb; i++){
        var a,b;
        a = (pfive.random(0,1) > 0.5) ? -1 : 1;
        b = (pfive.random(0,1) > 0.5) ? 1 : -1;
        if(i > cLimit ) {
          cLimit += mod;
          cP++;
        }
        tab.push([ pfive.randomGaussian(hs[cP].x, i/(cP+1)), pfive.randomGaussian(hs[cP].y, i/(cP+1)) ]);
      }
      tab.push([0,0],[0,pfive.height],[pfive.width,0],[pfive.width,pfive.height]);
      return tab;
    }else{
      return generateRandomPoints(nb);
    }
  }

  function drawNet(){
    pfive.stroke(BASE_COLOR);
    pfive.noFill();

    //vertices.push([ mouseX , mouseY ]);
    var t = Delaunay.triangulate(vertices); //cf delaunay.js

    for(var i=0; i<t.length; i+=3){
      var v1 = pfive.createVector(vertices[ t[i] ][0], vertices[ t[i]   ][1])
         ,v2 = pfive.createVector(vertices[ t[i+1] ][0], vertices[ t[i+1] ][1])
         ,v3 = pfive.createVector(vertices[ t[i+2] ][0], vertices[ t[i+2] ][1])

      var cc = p5.Vector.lerp(v1,v2,0.5);
      var gg = p5.Vector.lerp(v3,cc,2/3);
      var c = img.get(gg.x, gg.y);

      pfive.colorMode(pfive.RGB,255,255,255,1);
      pfive.noStroke();
      pfive.fill(c[0],c[1],c[2]);
      pfive.triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
      /* pour voir le centroid 
      stroke(255,0,0,1);
      point(gg.x,gg.y); */

    }

    vertices.pop();
  }

  var setNbPoints = function (value){
    NB_POINTS = pfive.round(value); 
  }

  var addHs = function (x,y){
    hs.push(pfive.createVector(x, y));
  }

  var redessine = function (){
    pfive.image(img, 0, 0);
    vertices = generateRandomGaussianPoints(NB_POINTS);
    pfive.redraw();
  }

  var nettoie = function (){
    hs = [];
    redessine();
  }
});