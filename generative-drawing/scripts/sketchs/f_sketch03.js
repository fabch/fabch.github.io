(function(p) {
  // Constantes
  var BACKGROUND_COLOR = '#282923', 
      BASE_COLOR       = '#ffffff', 
      NB_POINTS        = 2000; //int

  //On initialise toutes les variables
  var can, commands, vertices, loopCount, c, img, hs;

  p.preload = function() {
    img = p.loadImage("assets/vermeer-girl-with-a-pearl-earring.jpg");
    can = p.createCanvas(p.options.width, p.options.height);
    setCommands();
  }

  p.setup = function(){
    //on instancie la scène
    p.colorMode(p.HSB, 360,100,100);
    IS_PAUSED        = false;
    BACKGROUND_COLOR = p.color(70,15,16);
    BASE_COLOR       = p.color(0,0,100);
    hs               = [];
    can.parent(p.options.container);

    p.background(BACKGROUND_COLOR);
    p.image(img, 0, 0);

    vertices = generateRandomGaussianPoints(NB_POINTS);
  }

  p.draw = function(){
    drawNet();
    p.noLoop();
  }

  function setCommands(){
    commands = {
      btn : {
         redraw : p.createButton('Redessiner',1)
        ,clean  : p.createButton('Nettoyer',1)
      },
      input : {
        nbpoints : p.createDiv('')
      }
    }

    noUiSlider.create(commands.input.nbpoints.elt, {
      start: 1000, // Handle start position
      step: 10, // Slider moves in increments of '10'
      direction: 'ltr', // Put '0' at the left of the slider
      orientation: 'horizontal', // Orient the slider vertically
      behaviour: 'tap', // Move handle on tap, bar is draggable
      range: { // Slider can select '0' to '2000'
        'min': 0,
        '50%': 1000,
        'max': 2000
      },
      pips: { // Show a scale with the slider
        mode: 'range',
        density: 4
      }
    });
    commands.input.nbpoints.elt.noUiSlider.on('change', function(value){
      console.log(value);
      NB_POINTS = p.round(value);
    });

    _.each(commands.btn, function(btn){ btn.parent(p.options.commandContainer); });
    _.each(commands.input, function(input){ input.parent(p.options.commandContainer); });

    can.mouseClicked(addHs);
    commands.btn.redraw.mouseClicked(redessine);
    commands.btn.clean.mouseClicked(nettoie);
  }


  function addHs(){
    hs.push(p.createVector(p.mouseX, p.mouseY));
  }

  function redessine(){
    vertices = generateRandomGaussianPoints(NB_POINTS);
    p.redraw();
  }

  function nettoie(){
    hs =[];
    redessine();
  }

  //on génère un tableau de points aléatoirement
  function generateRandomPoints(nb){
    var tab=[];
    for(var i=0; i<nb; i++){
      tab.push([ p.round(p.random(0,p.width)) , p.round(p.random(0,p.height)) ]);
    }
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
        a = (p.random(0,1) > 0.5) ? -1 : 1;
        b = (p.random(0,1) > 0.5) ? 1 : -1;
        if(i > cLimit ) {
          cLimit += mod;
          cP++;
        }
        tab.push([ p.randomGaussian(hs[cP].x, i/(cP+1)), p.randomGaussian(hs[cP].y, i/(cP+1)) ]);
      }
      return tab;
    }else{
      return generateRandomPoints(nb);
    }
  }

  function drawNet(){
    p.stroke(BASE_COLOR);
    p.noFill();

    //vertices.push([ mouseX , mouseY ]);
    var t = Delaunay.triangulate(vertices); //cf delaunay.js

    for(var i=0; i<t.length; i+=3){
      var v1 = p.createVector(vertices[ t[i] ][0], vertices[ t[i]   ][1])
         ,v2 = p.createVector(vertices[ t[i+1] ][0], vertices[ t[i+1] ][1])
         ,v3 = p.createVector(vertices[ t[i+2] ][0], vertices[ t[i+2] ][1])

      var cc = p5.Vector.lerp(v1,v2,0.5);
      var gg = p5.Vector.lerp(v3,cc,2/3);
      var c = img.get(gg.x, gg.y);

      p.colorMode(p.RGB,255,255,255,1);
      p.noStroke();
      p.fill(c[0],c[1],c[2]);
      p.triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
      /* pour voir le centroid 
      stroke(255,0,0,1);
      point(gg.x,gg.y); */

    }

    vertices.pop();
  }
})