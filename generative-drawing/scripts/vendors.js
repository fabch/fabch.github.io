/*! p5.js v0.4.5 May 27, 2015 */!function(a,b){"function"==typeof define&&define.amd?define("p5",[],function(){return a.returnExportsGlobal=b()}):"object"==typeof exports?module.exports=b():a.p5=b()}(this,function(){var amdclean={};return amdclean.shim=function(){window.requestDraw=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}()}({}),amdclean.constants=function(){var a=Math.PI;return{ARROW:"default",CROSS:"crosshair",HAND:"pointer",MOVE:"move",TEXT:"text",WAIT:"wait",HALF_PI:a/2,PI:a,QUARTER_PI:a/4,TAU:2*a,TWO_PI:2*a,DEGREES:"degrees",RADIANS:"radians",CORNER:"corner",CORNERS:"corners",RADIUS:"radius",RIGHT:"right",LEFT:"left",CENTER:"center",TOP:"top",BOTTOM:"bottom",BASELINE:"alphabetic",POINTS:"points",LINES:"lines",TRIANGLES:"triangles",TRIANGLE_FAN:"triangles_fan",TRIANGLE_STRIP:"triangles_strip",QUADS:"quads",QUAD_STRIP:"quad_strip",CLOSE:"close",OPEN:"open",CHORD:"chord",PIE:"pie",PROJECT:"square",SQUARE:"butt",ROUND:"round",BEVEL:"bevel",MITER:"miter",RGB:"rgb",HSB:"hsb",AUTO:"auto",ALT:18,BACKSPACE:8,CONTROL:17,DELETE:46,DOWN_ARROW:40,ENTER:13,ESCAPE:27,LEFT_ARROW:37,OPTION:18,RETURN:13,RIGHT_ARROW:39,SHIFT:16,TAB:9,UP_ARROW:38,BLEND:"normal",ADD:"lighter",DARKEST:"darken",LIGHTEST:"lighten",DIFFERENCE:"difference",EXCLUSION:"exclusion",MULTIPLY:"multiply",SCREEN:"screen",REPLACE:"source-over",OVERLAY:"overlay",HARD_LIGHT:"hard-light",SOFT_LIGHT:"soft-light",DODGE:"color-dodge",BURN:"color-burn",THRESHOLD:"threshold",GRAY:"gray",OPAQUE:"opaque",INVERT:"invert",POSTERIZE:"posterize",DILATE:"dilate",ERODE:"erode",BLUR:"blur",NORMAL:"normal",ITALIC:"italic",BOLD:"bold",LINEAR:"linear",QUADRATIC:"quadratic",BEZIER:"bezier",CURVE:"curve"}}({}),amdclean.core=function(a,b,c){"use strict";var c=c,d=function(a,b,e){2===arguments.length&&"boolean"==typeof b&&(e=b,b=void 0),this._setupDone=!1,this._pixelDensity=window.devicePixelRatio||1,this._startTime=(new Date).getTime(),this._userNode=b,this._curElement=null,this._elements=[],this._preloadCount=0,this._updateInterval=0,this._isGlobal=!1,this._loop=!0,this._styles=[],this._defaultCanvasSize={width:100,height:100},this._events={mousemove:null,mousedown:null,mouseup:null,click:null,mouseover:null,mouseout:null,keydown:null,keyup:null,keypress:null,touchstart:null,touchmove:null,touchend:null,resize:null,blur:null},window.DeviceOrientationEvent?this._events.deviceorientation=null:window.DeviceMotionEvent?this._events.devicemotion=null:this._events.MozOrientation=null,/Firefox/i.test(navigator.userAgent)?this._events.DOMMouseScroll=null:this._events.mousewheel=null,this._loadingScreenId="p5_loading",this._start=function(){if(this._userNode&&"string"==typeof this._userNode&&(this._userNode=document.getElementById(this._userNode)),this._loadingScreen=document.getElementById(this._loadingScreenId),!this._loadingScreen){this._loadingScreen=document.createElement("loadingDiv"),this._loadingScreen.innerHTML="loading...",this._loadingScreen.style.position="absolute";var a=this._userNode||document.body;a.appendChild(this._loadingScreen)}this.createCanvas(this._defaultCanvasSize.width,this._defaultCanvasSize.height,!0);var b=this.preload||window.preload,c=this._isGlobal?window:this;b?(this._preloadMethods.forEach(function(a){c[a]=function(){var b=Array.prototype.slice.call(arguments);return c._preload(a,b)}}),b(),0===this._preloadCount&&(this._setup(),this._runFrames(),this._draw())):(this._setup(),this._runFrames(),this._draw())}.bind(this),this._preload=function(a,b){var c=this._isGlobal?window:this;c._setProperty("_preloadCount",c._preloadCount+1);var e=function(){c._setProperty("_preloadCount",c._preloadCount-1),0===c._preloadCount&&(c._setup(),c._runFrames(),c._draw())};return b.push(e),d.prototype[a].apply(c,b)}.bind(this),this._setup=function(){var a=this._isGlobal?window:this;"function"==typeof a.preload&&this._preloadMethods.forEach(function(b){a[b]=d.prototype[b]}),"function"==typeof a.setup&&a.setup(),this.canvas.style.visibility="",this.canvas.className=this.canvas.className.replace("p5_hidden",""),this._setupDone=!0,this._loadingScreen.parentNode.removeChild(this._loadingScreen)}.bind(this),this._draw=function(){var a=(new Date).getTime();this._frameRate=1e3/(a-this._lastFrameTime),this._lastFrameTime=a,this._setProperty("frameCount",this.frameCount+1),this._loop&&(this._drawInterval&&clearInterval(this._drawInterval),this._drawInterval=setTimeout(function(){window.requestDraw(this._draw.bind(this))}.bind(this),1e3/this._targetFrameRate)),this.redraw(),this._updatePAccelerations(),this._updatePMouseCoords(),this._updatePTouchCoords()}.bind(this),this._runFrames=function(){this._updateInterval&&clearInterval(this._updateInterval)}.bind(this),this._setProperty=function(a,b){this[a]=b,this._isGlobal&&(window[a]=b)}.bind(this),this.remove=function(){if(this._curElement){this._loop=!1,this._drawInterval&&clearTimeout(this._drawInterval),this._updateInterval&&clearTimeout(this._updateInterval);for(var a in this._events)window.removeEventListener(a,this._events[a]);for(var b=0;b<this._elements.length;b++){var c=this._elements[b];c.elt.parentNode&&c.elt.parentNode.removeChild(c.elt);for(var e in c._events)c.elt.removeEventListener(e,c._events[e])}var f=this;if(this._registeredMethods.remove.forEach(function(a){"undefined"!=typeof a&&a.call(f)}),this._isGlobal){for(var g in d.prototype)try{delete window[g]}catch(h){window[g]=void 0}for(var i in this)if(this.hasOwnProperty(i))try{delete window[i]}catch(h){window[i]=void 0}}}}.bind(this);for(var f in c)d.prototype[f]=c[f];if(a)a(this);else{this._isGlobal=!0;for(var g in d.prototype)if("function"==typeof d.prototype[g]){var h=g.substring(2);this._events.hasOwnProperty(h)||(window[g]=d.prototype[g].bind(this))}else window[g]=d.prototype[g];for(var i in this)this.hasOwnProperty(i)&&(window[i]=this[i])}for(var j in this._events){var k=this["_on"+j];if(k){var l=k.bind(this);window.addEventListener(j,l),this._events[j]=l}}var m=this;window.addEventListener("focus",function(){m._setProperty("focused",!0)}),window.addEventListener("blur",function(){m._setProperty("focused",!1)}),e?this._start():"complete"===document.readyState?this._start():window.addEventListener("load",this._start.bind(this),!1)};return d.prototype._preloadMethods=["loadJSON","loadImage","loadStrings","loadXML","loadShape","loadTable"],d.prototype._registeredMethods={pre:[],post:[],remove:[]},d.prototype.registerPreloadMethod=function(a){d.prototype._preloadMethods.push(a)}.bind(this),d.prototype.registerMethod=function(a,b){d.prototype._registeredMethods.hasOwnProperty(a)||(d.prototype._registeredMethods[a]=[]),d.prototype._registeredMethods[a].push(b)}.bind(this),d}({},amdclean.shim,amdclean.constants),amdclean.utilscolor_utils=function(a,b){var c=b;return c.ColorUtils={},c.ColorUtils.hsbaToRGBA=function(a){var b=a[0],c=a[1],d=a[2];b/=255,c/=255,d/=255;var e=[];if(0===c)e=[Math.round(255*d),Math.round(255*d),Math.round(255*d),a[3]];else{var f=6*b;6===f&&(f=0);var g,h,i,j=Math.floor(f),k=d*(1-c),l=d*(1-c*(f-j)),m=d*(1-c*(1-(f-j)));0===j?(g=d,h=m,i=k):1===j?(g=l,h=d,i=k):2===j?(g=k,h=d,i=m):3===j?(g=k,h=l,i=d):4===j?(g=m,h=k,i=d):(g=d,h=k,i=l),e=[Math.round(255*g),Math.round(255*h),Math.round(255*i),a[3]]}return e},c.ColorUtils.rgbaToHSBA=function(a){var b,c,d=a[0]/255,e=a[1]/255,f=a[2]/255,g=Math.min(d,e,f),h=Math.max(d,e,f),i=h-g,j=h;if(0===i)b=0,c=0;else{c=i/h;var k=((h-d)/6+i/2)/i,l=((h-e)/6+i/2)/i,m=((h-f)/6+i/2)/i;d===h?b=m-l:e===h?b=1/3+k-m:f===h&&(b=2/3+l-k),0>b&&(b+=1),b>1&&(b-=1)}return[Math.round(255*b),Math.round(255*c),Math.round(255*j),a[3]]},c.ColorUtils}({},amdclean.core),amdclean.p5Color=function(a,b,c,d){var e=b,f=c,d=d;e.Color=function(a,b){return this.color_array=e.Color._getFormattedColor.apply(a,b),this._normalizeColorArray(a),a._colorMode===d.HSB?(this.hsba=this.color_array,this.rgba=f.hsbaToRGBA(this.hsba)):(this.rgba=this.color_array,this.hsba=f.rgbaToHSBA(this.rgba)),this},e.Color.prototype._normalizeColorArray=function(a){var b=a._colorMode===d.RGB,c=b?a._maxRGB:a._maxHSB,e=this.color_array;return e[0]*=255/c[0],e[1]*=255/c[1],e[2]*=255/c[2],e[3]*=255/c[3],e},e.Color.prototype.getHue=function(){return this.hsba[0]},e.Color.prototype.getSaturation=function(){return this.hsba[1]},e.Color.prototype.getBrightness=function(){return this.hsba[2]},e.Color.prototype.getRed=function(){return this.rgba[0]},e.Color.prototype.getGreen=function(){return this.rgba[1]},e.Color.prototype.getBlue=function(){return this.rgba[2]},e.Color.prototype.getAlpha=function(){return this.rgba[3]},e.Color.prototype.toString=function(){for(var a=this.rgba,b=0;3>b;b++)a[b]=Math.floor(a[b]);var c="undefined"!=typeof a[3]?a[3]/255:1;return"rgba("+a[0]+","+a[1]+","+a[2]+","+c+")"};var g=/\s*/,h=/(\d{1,3})/,i=/((?:\d+(?:\.\d+)?)|(?:\.\d+))/,j=new RegExp(i.source+"%"),k={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},l={HEX3:/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX6:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,RGB:new RegExp(["^rgb\\(",h.source,",",h.source,",",h.source,"\\)$"].join(g.source),"i"),RGB_PERCENT:new RegExp(["^rgb\\(",j.source,",",j.source,",",j.source,"\\)$"].join(g.source),"i"),RGBA:new RegExp(["^rgba\\(",h.source,",",h.source,",",h.source,",",i.source,"\\)$"].join(g.source),"i"),RGBA_PERCENT:new RegExp(["^rgba\\(",j.source,",",j.source,",",j.source,",",i.source,"\\)$"].join(g.source),"i")};return e.Color._getFormattedColor=function(){var a,b,c,f,g,h;if(arguments.length>=3)a=arguments[0],b=arguments[1],c=arguments[2],f="number"==typeof arguments[3]?arguments[3]:255;else{if("string"==typeof arguments[0])return g=arguments[0].trim().toLowerCase(),k[g]?e.Color._getFormattedColor.apply(this,[k[g]]):(h=l.HEX3.test(g)?l.HEX3.exec(g).slice(1).map(function(a){return parseInt(a+a,16)}):l.HEX6.test(g)?l.HEX6.exec(g).slice(1).map(function(a){return parseInt(a,16)}):l.RGB.test(g)?l.RGB.exec(g).slice(1).map(function(a){return parseInt(a,10)}):l.RGB_PERCENT.test(g)?l.RGB_PERCENT.exec(g).slice(1).map(function(a){return parseInt(parseFloat(a)/100*255,10)}):l.RGBA.test(g)?l.RGBA.exec(g).slice(1).map(function(a,b){return 3===b?parseInt(255*parseFloat(a),10):parseInt(a,10)}):l.RGBA_PERCENT.test(g)?l.RGBA_PERCENT.exec(g).slice(1).map(function(a,b){return 3===b?parseInt(255*parseFloat(a),10):parseInt(parseFloat(a)/100*255,10)}):[255],e.Color._getFormattedColor.apply(this,h));this._colorMode===d.RGB?a=b=c=arguments[0]:(a=c=arguments[0],b=0),f="number"==typeof arguments[1]?arguments[1]:255}return[a,b,c,f]},e.Color}({},amdclean.core,amdclean.utilscolor_utils,amdclean.constants),amdclean.p5Element=function(a,b){function c(a,b,c){var d=b.bind(c);c.elt.addEventListener(a,d,!1),c._events[a]=d}var d=b;return d.Element=function(a,b){this.elt=a,this._pInst=b,this._events={},this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight},d.Element.prototype.parent=function(a){return"string"==typeof a?a=document.getElementById(a):a instanceof d.Element&&(a=a.elt),a.appendChild(this.elt),this},d.Element.prototype.id=function(a){return this.elt.id=a,this},d.Element.prototype["class"]=function(a){return this.elt.className+=" "+a,this},d.Element.prototype.mousePressed=function(a){return c("mousedown",a,this),c("touchstart",a,this),this},d.Element.prototype.mouseWheel=function(a){return c("mousewheel",a,this),this},d.Element.prototype.mouseReleased=function(a){return c("mouseup",a,this),c("touchend",a,this),this},d.Element.prototype.mouseClicked=function(a){return c("click",a,this),this},d.Element.prototype.mouseMoved=function(a){return c("mousemove",a,this),c("touchmove",a,this),this},d.Element.prototype.mouseOver=function(a){return c("mouseover",a,this),this},d.Element.prototype.mouseOut=function(a){return c("mouseout",a,this),this},d.Element.prototype.touchStarted=function(a){return c("touchstart",a,this),c("mousedown",a,this),this},d.Element.prototype.touchMoved=function(a){return c("touchmove",a,this),c("mousemove",a,this),this},d.Element.prototype.touchEnded=function(a){return c("touchend",a,this),c("mouseup",a,this),this},d.Element.prototype.dragOver=function(a){return c("dragover",a,this),this},d.Element.prototype.dragLeave=function(a){return c("dragleave",a,this),this},d.Element.prototype.drop=function(a,b){function e(b){var c=new d.File(b);return function(b){c.data=b.target.result,a(c)}}return window.File&&window.FileReader&&window.FileList&&window.Blob?(c("dragover",function(a){a.stopPropagation(),a.preventDefault()},this),c("dragleave",function(a){a.stopPropagation(),a.preventDefault()},this),arguments.length>1&&c("drop",b,this),c("drop",function(a){a.stopPropagation(),a.preventDefault();for(var b=a.dataTransfer.files,c=0;c<b.length;c++){var d=b[c],f=new FileReader;f.onload=e(d),"text"===d.type?f.readAsText(d):f.readAsDataURL(d)}},this)):console.log("The File APIs are not fully supported in this browser."),this},d.Element.prototype._setProperty=function(a,b){this[a]=b},d.Element}({},amdclean.core),amdclean.p5Graphics=function(a,b,c){var d=b,c=c;return d.Graphics=function(a,b,c){d.Element.call(this,a,b),this.canvas=a,this.drawingContext=this.canvas.getContext("2d"),this._pInst=b,c?(this._isMainCanvas=!0,this._pInst._setProperty("_curElement",this),this._pInst._setProperty("canvas",this.canvas),this._pInst._setProperty("drawingContext",this.drawingContext),this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height)):(this.canvas.style.display="none",this._styles=[])},d.Graphics.prototype=Object.create(d.Element.prototype),d.Graphics.prototype._applyDefaults=function(){this.drawingContext.fillStyle="#FFFFFF",this.drawingContext.strokeStyle="#000000",this.drawingContext.lineCap=c.ROUND,this.drawingContext.font="normal 12px sans-serif"},d.Graphics.prototype.resize=function(a,b){this.width=a,this.height=b,this.elt.width=a*this._pInst._pixelDensity,this.elt.height=b*this._pInst._pixelDensity,this.elt.style.width=a+"px",this.elt.style.height=b+"px",this._isMainCanvas&&(this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height)),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity)},d.Graphics}({},amdclean.core,amdclean.constants),amdclean.filters=function(){"use strict";function a(a){var b=3.5*a|0;if(b=1>b?1:248>b?b:248,d!==b){d=b,e=1+d<<1,f=new Int32Array(e),g=new Array(e);for(var c=0;e>c;c++)g[c]=new Int32Array(256);for(var h,i,j,k,l=1,m=b-1;b>l;l++){f[b+l]=f[m]=i=m*m,j=g[b+l],k=g[m--];for(var n=0;256>n;n++)j[n]=k[n]=i*n}h=f[b]=b*b,j=g[b];for(var o=0;256>o;o++)j[o]=h*o}}function b(b,h){for(var i=c._toPixels(b),j=b.width,k=b.height,l=j*k,m=new Int32Array(l),n=0;l>n;n++)m[n]=c._getARGB(i,n);var o,p,q,r,s,t,u,v,w,x,y=new Int32Array(l),z=new Int32Array(l),A=new Int32Array(l),B=new Int32Array(l),C=0;a(h);var D,E,F,G;for(E=0;k>E;E++){for(D=0;j>D;D++){if(r=q=p=s=o=0,t=D-d,0>t)x=-t,t=0;else{if(t>=j)break;x=0}for(F=x;e>F&&!(t>=j);F++){var H=m[t+C];G=g[F],s+=G[(-16777216&H)>>>24],p+=G[(16711680&H)>>16],q+=G[(65280&H)>>8],r+=G[255&H],o+=f[F],t++}u=C+D,y[u]=s/o,z[u]=p/o,A[u]=q/o,B[u]=r/o}C+=j}for(C=0,v=-d,w=v*j,E=0;k>E;E++){for(D=0;j>D;D++){if(r=q=p=s=o=0,0>v)x=u=-v,t=D;else{if(v>=k)break;x=0,u=v,t=D+w}for(F=x;e>F&&!(u>=k);F++)G=g[F],s+=G[y[t]],p+=G[z[t]],q+=G[A[t]],r+=G[B[t]],o+=f[F],u++,t+=j;m[D+C]=s/o<<24|p/o<<16|q/o<<8|r/o}C+=j,w+=j,v++}c._setPixels(i,m)}var c={};c._toPixels=function(a){return a instanceof ImageData?a.data:a.getContext("2d").getImageData(0,0,a.width,a.height).data},c._getARGB=function(a,b){var c=4*b;return a[c+3]<<24&4278190080|a[c]<<16&16711680|a[c+1]<<8&65280|255&a[c+2]},c._setPixels=function(a,b){for(var c=0,d=0,e=a.length;e>d;d++)c=4*d,a[c+0]=(16711680&b[d])>>>16,a[c+1]=(65280&b[d])>>>8,a[c+2]=255&b[d],a[c+3]=(4278190080&b[d])>>>24},c._toImageData=function(a){return a instanceof ImageData?a:a.getContext("2d").getImageData(0,0,a.width,a.height)},c._createImageData=function(a,b){return c._tmpCanvas=document.createElement("canvas"),c._tmpCtx=c._tmpCanvas.getContext("2d"),this._tmpCtx.createImageData(a,b)},c.apply=function(a,b,c){var d=a.getContext("2d"),e=d.getImageData(0,0,a.width,a.height),f=b(e,c);f instanceof ImageData?d.putImageData(f,0,0,0,0,a.width,a.height):d.putImageData(e,0,0,0,0,a.width,a.height)},c.threshold=function(a,b){var d=c._toPixels(a);void 0===b&&(b=.5);for(var e=Math.floor(255*b),f=0;f<d.length;f+=4){var g,h=d[f],i=d[f+1],j=d[f+2],k=.2126*h+.7152*i+.0722*j;g=k>=e?255:0,d[f]=d[f+1]=d[f+2]=g}},c.gray=function(a){for(var b=c._toPixels(a),d=0;d<b.length;d+=4){var e=b[d],f=b[d+1],g=b[d+2],h=.2126*e+.7152*f+.0722*g;b[d]=b[d+1]=b[d+2]=h}},c.opaque=function(a){for(var b=c._toPixels(a),d=0;d<b.length;d+=4)b[d+3]=255;return b},c.invert=function(a){for(var b=c._toPixels(a),d=0;d<b.length;d+=4)b[d]=255-b[d],b[d+1]=255-b[d+1],b[d+2]=255-b[d+2]},c.posterize=function(a,b){var d=c._toPixels(a);if(2>b||b>255)throw new Error("Level must be greater than 2 and less than 255 for posterize");for(var e=b-1,f=0;f<d.length;f+=4){var g=d[f],h=d[f+1],i=d[f+2];d[f]=255*(g*b>>8)/e,d[f+1]=255*(h*b>>8)/e,d[f+2]=255*(i*b>>8)/e}},c.dilate=function(a){for(var b,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t=c._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;)for(b=u,d=u+a.width;d>u;)e=f=c._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=d&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=c._getARGB(t,j),m=c._getARGB(t,i),o=c._getARGB(t,k),l=c._getARGB(t,h),g=77*(e>>16&255)+151*(e>>8&255)+28*(255&e),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),q>g&&(f=m,g=q),p>g&&(f=l,g=p),r>g&&(f=n,g=r),s>g&&(f=o,g=s),w[u++]=f;c._setPixels(t,w)},c.erode=function(a){for(var b,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t=c._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;)for(b=u,d=u+a.width;d>u;)e=f=c._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=d&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=c._getARGB(t,j),m=c._getARGB(t,i),o=c._getARGB(t,k),l=c._getARGB(t,h),g=77*(e>>16&255)+151*(e>>8&255)+28*(255&e),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),g>q&&(f=m,g=q),g>p&&(f=l,g=p),g>r&&(f=n,g=r),g>s&&(f=o,g=s),w[u++]=f;c._setPixels(t,w)};var d,e,f,g;return c.blur=function(a,c){b(a,c)},c}({}),amdclean.p5Image=function(a,b,c){"use strict";var d=b,e=c;return d.Image=function(a,b){this.width=a,this.height=b,this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.drawingContext=this.canvas.getContext("2d"),this.pixels=[]},d.Image.prototype._setProperty=function(a,b){this[a]=b},d.Image.prototype.loadPixels=function(){d.prototype.loadPixels.call(this)},d.Image.prototype.updatePixels=function(a,b,c,e){d.prototype.updatePixels.call(this,a,b,c,e)},d.Image.prototype.get=function(a,b,c,e){return d.prototype.get.call(this,a,b,c,e)},d.Image.prototype.set=function(a,b,c){d.prototype.set.call(this,a,b,c)},d.Image.prototype.resize=function(a,b){a=a||this.canvas.width,b=b||this.canvas.height;var c=document.createElement("canvas");c.width=a,c.height=b,c.getContext("2d").drawImage(this.canvas,0,0,this.canvas.width,this.canvas.height,0,0,c.width,c.height),this.canvas.width=this.width=a,this.canvas.height=this.height=b,this.drawingContext.drawImage(c,0,0,a,b,0,0,a,b),this.pixels.length>0&&this.loadPixels()},d.Image.prototype.copy=function(){d.prototype.copy.apply(this,arguments)},d.Image.prototype.mask=function(a){void 0===a&&(a=this);var b=this.drawingContext.globalCompositeOperation,c=1;a instanceof d.Graphics&&(c=a._pInst._pixelDensity);var e=[a,0,0,c*a.width,c*a.height,0,0,this.width,this.height];this.drawingContext.globalCompositeOperation="destination-in",this.copy.apply(this,e),this.drawingContext.globalCompositeOperation=b},d.Image.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b)},d.Image.prototype.blend=function(){d.prototype.blend.apply(this,arguments)},d.Image.prototype.save=function(a,b){var c;if(b)switch(b.toLowerCase()){case"png":c="image/png";break;case"jpeg":c="image/jpeg";break;case"jpg":c="image/jpeg";break;default:c="image/png"}else b="png",c="image/png";var e="image/octet-stream",f=this.canvas.toDataURL(c);f=f.replace(c,e),d.prototype.downloadFile(f,a,b)},d.Image}({},amdclean.core,amdclean.filters),amdclean.p5File=function(a,b){var c=b;return c.File=function(a,b){this.file=a,this._pInst=b;var c=a.type.split("/");this.type=c[0],this.subtype=c[1],this.name=a.name,this.size=a.size,this.data=void 0},c.File}({},amdclean.core),amdclean.polargeometry=function(){return{degreesToRadians:function(a){return 2*Math.PI*a/360},radiansToDegrees:function(a){return 360*a/(2*Math.PI)}}}({}),amdclean.p5Vector=function(a,b,c,d){"use strict";var e=b,f=c,d=d;return e.Vector=function(){var a,b,c;arguments[0]instanceof e?(this.p5=arguments[0],a=arguments[1][0]||0,b=arguments[1][1]||0,c=arguments[1][2]||0):(a=arguments[0]||0,b=arguments[1]||0,c=arguments[2]||0),this.x=a,this.y=b,this.z=c},e.Vector.prototype.set=function(a,b,c){return a instanceof e.Vector?(this.x=a.x||0,this.y=a.y||0,this.z=a.z||0,this):a instanceof Array?(this.x=a[0]||0,this.y=a[1]||0,this.z=a[2]||0,this):(this.x=a||0,this.y=b||0,this.z=c||0,this)},e.Vector.prototype.copy=function(){return this.p5?new e.Vector(this.p5,[this.x,this.y,this.z]):new e.Vector(this.x,this.y,this.z)},e.Vector.prototype.add=function(a,b,c){return a instanceof e.Vector?(this.x+=a.x||0,this.y+=a.y||0,this.z+=a.z||0,this):a instanceof Array?(this.x+=a[0]||0,this.y+=a[1]||0,this.z+=a[2]||0,this):(this.x+=a||0,this.y+=b||0,this.z+=c||0,this)},e.Vector.prototype.sub=function(a,b,c){return a instanceof e.Vector?(this.x-=a.x||0,this.y-=a.y||0,this.z-=a.z||0,this):a instanceof Array?(this.x-=a[0]||0,this.y-=a[1]||0,this.z-=a[2]||0,this):(this.x-=a||0,this.y-=b||0,this.z-=c||0,this)},e.Vector.prototype.mult=function(a){return this.x*=a||0,this.y*=a||0,this.z*=a||0,this},e.Vector.prototype.div=function(a){return this.x/=a,this.y/=a,this.z/=a,this},e.Vector.prototype.mag=function(){return Math.sqrt(this.magSq())},e.Vector.prototype.magSq=function(){var a=this.x,b=this.y,c=this.z;return a*a+b*b+c*c},e.Vector.prototype.dot=function(a,b,c){return a instanceof e.Vector?this.dot(a.x,a.y,a.z):this.x*(a||0)+this.y*(b||0)+this.z*(c||0)},e.Vector.prototype.cross=function(a){var b=this.y*a.z-this.z*a.y,c=this.z*a.x-this.x*a.z,d=this.x*a.y-this.y*a.x;return this.p5?new e.Vector(this.p5,[b,c,d]):new e.Vector(b,c,d)},e.Vector.prototype.dist=function(a){var b=a.copy().sub(this);return b.mag()},e.Vector.prototype.normalize=function(){return this.div(this.mag())},e.Vector.prototype.limit=function(a){var b=this.magSq();return b>a*a&&(this.div(Math.sqrt(b)),this.mult(a)),this},e.Vector.prototype.setMag=function(a){return this.normalize().mult(a)},e.Vector.prototype.heading=function(){var a=Math.atan2(this.y,this.x);return this.p5?this.p5._angleMode===d.RADIANS?a:f.radiansToDegrees(a):a},e.Vector.prototype.rotate=function(a){this.p5&&this.p5._angleMode===d.DEGREES&&(a=f.degreesToRadians(a));var b=this.heading()+a,c=this.mag();return this.x=Math.cos(b)*c,this.y=Math.sin(b)*c,this},e.Vector.prototype.lerp=function(a,b,c,d){return a instanceof e.Vector?this.lerp(a.x,a.y,a.z,b):(this.x+=(a-this.x)*d||0,this.y+=(b-this.y)*d||0,this.z+=(c-this.z)*d||0,this)},e.Vector.prototype.array=function(){return[this.x||0,this.y||0,this.z||0]},e.Vector.prototype.equals=function(a,b,c){return a instanceof e.Vector?(a=a.x||0,b=a.y||0,c=a.z||0):a instanceof Array?(a=a[0]||0,b=a[1]||0,c=a[2]||0):(a=a||0,b=b||0,c=c||0),this.x===a&&this.y===b&&this.z===c},e.Vector.fromAngle=function(a){return this.p5&&this.p5._angleMode===d.DEGREES&&(a=f.degreesToRadians(a)),this.p5?new e.Vector(this.p5,[Math.cos(a),Math.sin(a),0]):new e.Vector(Math.cos(a),Math.sin(a),0)},e.Vector.random2D=function(){var a;return a=this.p5?this.p5.random(this.p5._angleMode===d.DEGREES?360:d.TWO_PI):Math.random()*Math.PI*2,this.fromAngle(a)},e.Vector.random3D=function(){var a,b;this.p5?(a=this.p5.random(0,d.TWO_PI),b=this.p5.random(-1,1)):(a=Math.random()*Math.PI*2,b=2*Math.random()-1);var c=Math.sqrt(1-b*b)*Math.cos(a),f=Math.sqrt(1-b*b)*Math.sin(a);return this.p5?new e.Vector(this.p5,[c,f,b]):new e.Vector(c,f,b)},e.Vector.add=function(a,b,c){return c?c.set(a):c=a.copy(),c.add(b),c},e.Vector.sub=function(a,b,c){return c?c.set(a):c=a.copy(),c.sub(b),c},e.Vector.mult=function(a,b,c){return c?c.set(a):c=a.copy(),c.mult(b),c},e.Vector.div=function(a,b,c){return c?c.set(a):c=a.copy(),c.div(b),c},e.Vector.dot=function(a,b){return a.dot(b)},e.Vector.cross=function(a,b){return a.cross(b)},e.Vector.dist=function(a,b){return a.dist(b)},e.Vector.lerp=function(a,b,c,d){return d?d.set(a):d=a.copy(),d.lerp(b,c),d},e.Vector.angleBetween=function(a,b){var c=Math.acos(a.dot(b)/(a.mag()*b.mag()));return this.p5&&this.p5._angleMode===d.DEGREES&&(c=f.radiansToDegrees(c)),c},e.Vector}({},amdclean.core,amdclean.polargeometry,amdclean.constants),amdclean.p5TableRow=function(a,b){"use strict";var c=b;return c.TableRow=function(a,b){var c=[],d={};a&&(b=b||",",c=a.split(b));for(var e=0;e<c.length;e++){var f=e,g=c[e];d[f]=g}this.arr=c,this.obj=d,this.table=null},c.TableRow.prototype.set=function(a,b){if("string"==typeof a){var c=this.table.columns.indexOf(a);if(!(c>=0))throw'This table has no column named "'+a+'"';this.obj[a]=b,this.arr[c]=b}else{if(!(a<this.table.columns.length))throw"Column #"+a+" is out of the range of this table";this.arr[a]=b;var d=this.table.columns[a];this.obj[d]=b}},c.TableRow.prototype.setNum=function(a,b){var c=parseFloat(b,10);this.set(a,c)},c.TableRow.prototype.setString=function(a,b){var c=b.toString();this.set(a,c)},c.TableRow.prototype.get=function(a){return"string"==typeof a?this.obj[a]:this.arr[a]},c.TableRow.prototype.getNum=function(a){var b;if(b="string"==typeof a?parseFloat(this.obj[a],10):parseFloat(this.arr[a],10),"NaN"===b.toString())throw"Error: "+this.obj[a]+" is NaN (Not a Number)";return b},c.TableRow.prototype.getString=function(a){return"string"==typeof a?this.obj[a].toString():this.arr[a].toString()},c.TableRow}({},amdclean.core),amdclean.p5Table=function(a,b){"use strict";var c=b;return c.Table=function(){this.columns=[],this.rows=[]},c.Table.prototype.addRow=function(a){var b=a||new c.TableRow;if("undefined"==typeof b.arr||"undefined"==typeof b.obj)throw"invalid TableRow: "+b;return b.table=this,this.rows.push(b),b},c.Table.prototype.removeRow=function(a){this.rows[a].table=null;var b=this.rows.splice(a+1,this.rows.length);this.rows.pop(),this.rows=this.rows.concat(b)},c.Table.prototype.getRow=function(a){return this.rows[a]},c.Table.prototype.getRows=function(){return this.rows},c.Table.prototype.findRow=function(a,b){if("string"==typeof b){for(var c=0;c<this.rows.length;c++)if(this.rows[c].obj[b]===a)return this.rows[c]}else for(var d=0;d<this.rows.length;d++)if(this.rows[d].arr[b]===a)return this.rows[d];return null},c.Table.prototype.findRows=function(a,b){var c=[];if("string"==typeof b)for(var d=0;d<this.rows.length;d++)this.rows[d].obj[b]===a&&c.push(this.rows[d]);else for(var e=0;e<this.rows.length;e++)this.rows[e].arr[b]===a&&c.push(this.rows[e]);return c},c.Table.prototype.matchRow=function(a,b){if("number"==typeof b){for(var c=0;c<this.rows.length;c++)if(this.rows[c].arr[b].match(a))return this.rows[c]}else for(var d=0;d<this.rows.length;d++)if(this.rows[d].obj[b].match(a))return this.rows[d];return null},c.Table.prototype.matchRows=function(a,b){var c=[];if("number"==typeof b)for(var d=0;d<this.rows.length;d++)this.rows[d].arr[b].match(a)&&c.push(this.rows[d]);else for(var e=0;e<this.rows.length;e++)this.rows[e].obj[b].match(a)&&c.push(this.rows[e]);return c},c.Table.prototype.getColumn=function(a){var b=[];if("string"==typeof a)for(var c=0;c<this.rows.length;c++)b.push(this.rows[c].obj[a]);else for(var d=0;d<this.rows.length;d++)b.push(this.rows[d].arr[a]);return b},c.Table.prototype.clearRows=function(){delete this.rows,this.rows=[]},c.Table.prototype.addColumn=function(a){var b=a||null;this.columns.push(b)},c.Table.prototype.getColumnCount=function(){return this.columns.length},c.Table.prototype.getRowCount=function(){return this.rows.length},c.Table.prototype.removeTokens=function(a,b){for(var c=function(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},d=[],e=0;e<a.length;e++)d.push(c(a.charAt(e)));var f=new RegExp(d.join("|"),"g");if("undefined"==typeof b)for(var g=0;g<this.columns.length;g++)for(var h=0;h<this.rows.length;h++){var i=this.rows[h].arr[g];i=i.replace(f,""),this.rows[h].arr[g]=i,this.rows[h].obj[this.columns[g]]=i}else if("string"==typeof b)for(var j=0;j<this.rows.length;j++){var k=this.rows[j].obj[b];k=k.replace(f,""),this.rows[j].obj[b]=k;var l=this.columns.indexOf(b);this.rows[j].arr[l]=k}else for(var m=0;m<this.rows.length;m++){var n=this.rows[m].arr[b];n=n.replace(f,""),this.rows[m].arr[b]=n,this.rows[m].obj[this.columns[b]]=n}},c.Table.prototype.trim=function(a){var b=new RegExp(" ","g");if("undefined"==typeof a)for(var c=0;c<this.columns.length;c++)for(var d=0;d<this.rows.length;d++){var e=this.rows[d].arr[c];
e=e.replace(b,""),this.rows[d].arr[c]=e,this.rows[d].obj[this.columns[c]]=e}else if("string"==typeof a)for(var f=0;f<this.rows.length;f++){var g=this.rows[f].obj[a];g=g.replace(b,""),this.rows[f].obj[a]=g;var h=this.columns.indexOf(a);this.rows[f].arr[h]=g}else for(var i=0;i<this.rows.length;i++){var j=this.rows[i].arr[a];j=j.replace(b,""),this.rows[i].arr[a]=j,this.rows[i].obj[this.columns[a]]=j}},c.Table.prototype.removeColumn=function(a){var b,c;"string"==typeof a?(b=a,c=this.columns.indexOf(a),console.log("string")):(c=a,b=this.columns[a]);var d=this.columns.splice(c+1,this.columns.length);this.columns.pop(),this.columns=this.columns.concat(d);for(var e=0;e<this.rows.length;e++){var f=this.rows[e].arr,g=f.splice(c+1,f.length);f.pop(),this.rows[e].arr=f.concat(g),delete this.rows[e].obj[b]}},c.Table.prototype.set=function(a,b,c){this.rows[a].set(b,c)},c.Table.prototype.setNum=function(a,b,c){this.rows[a].set(b,c)},c.Table.prototype.setString=function(a,b,c){this.rows[a].set(b,c)},c.Table.prototype.get=function(a,b){return this.rows[a].get(b)},c.Table.prototype.getNum=function(a,b){return this.rows[a].getNum(b)},c.Table.prototype.getString=function(a,b){return this.rows[a].getString(b)},c.Table}({},amdclean.core),amdclean.colorcreating_reading=function(a,b){"use strict";var c=b;return c.prototype.alpha=function(a){if(a instanceof c.Color||a instanceof Array)return this.color(a).getAlpha();throw new Error("Needs p5.Color or pixel array as argument.")},c.prototype.blue=function(a){if(a instanceof c.Color||a instanceof Array)return this.color(a).getBlue();throw new Error("Needs p5.Color or pixel array as argument.")},c.prototype.brightness=function(a){if(!a instanceof c.Color)throw new Error("Needs p5.Color as argument.");return a.getBrightness()},c.prototype.color=function(){if(arguments[0]instanceof c.Color)return arguments[0];if(arguments[0]instanceof Array)return new c.Color(this,arguments[0]);var a=Array.prototype.slice.call(arguments);return new c.Color(this,a)},c.prototype.green=function(a){if(a instanceof c.Color||a instanceof Array)return this.color(a).getGreen();throw new Error("Needs p5.Color or pixel array as argument.")},c.prototype.hue=function(a){if(!a instanceof c.Color)throw new Error("Needs p5.Color as argument.");return a.getHue()},c.prototype.lerpColor=function(a,b,d){if(d=Math.max(Math.min(d,1),0),a instanceof Array){for(var e=[],f=0;f<a.length;f++)e.push(Math.sqrt(c.prototype.lerp(a[f]*a[f],b[f]*b[f],d)));return e}if(a instanceof c.Color){for(var g=[],h=0;4>h;h++)g.push(Math.sqrt(c.prototype.lerp(a.rgba[h]*a.rgba[h],b.rgba[h]*b.rgba[h],d)));return new c.Color(this,g)}return Math.sqrt(c.prototype.lerp(a*a,b*b,d))},c.prototype.red=function(a){if(a instanceof c.Color||a instanceof Array)return this.color(a).getRed();throw new Error("Needs p5.Color or pixel array as argument.")},c.prototype.saturation=function(a){if(!a instanceof c.Color)throw new Error("Needs p5.Color as argument.");return a.getSaturation()},c}({},amdclean.core,amdclean.p5Color),amdclean.colorsetting=function(a,b,c){"use strict";var d=b,c=c;return d.prototype._doStroke=!0,d.prototype._doFill=!0,d.prototype._colorMode=c.RGB,d.prototype._maxRGB=[255,255,255,255],d.prototype._maxHSB=[255,255,255,255],d.prototype.background=function(){if(this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pixelDensity,this._pixelDensity),arguments[0]instanceof d.Image)this.image(arguments[0],0,0,this.width,this.height);else{var a=this.drawingContext.fillStyle,b=this.color.apply(this,arguments),c=b.toString();this.drawingContext.fillStyle=c,this.drawingContext.fillRect(0,0,this.width,this.height),this.drawingContext.fillStyle=a}this.drawingContext.restore()},d.prototype.clear=function(){this.drawingContext.clearRect(0,0,this.width,this.height)},d.prototype.colorMode=function(){if(arguments[0]===c.RGB||arguments[0]===c.HSB){this._colorMode=arguments[0];var a=this._colorMode===c.RGB,b=a?this._maxRGB:this._maxHSB;2===arguments.length?(b[0]=arguments[1],b[1]=arguments[1],b[2]=arguments[1],b[3]=arguments[1]):arguments.length>2&&(b[0]=arguments[1],b[1]=arguments[2],b[2]=arguments[3]),5===arguments.length&&(b[3]=arguments[4])}},d.prototype.fill=function(){this._setProperty("_doFill",!0);var a=this.drawingContext,b=this.color.apply(this,arguments);a.fillStyle=b.toString()},d.prototype.noFill=function(){this._setProperty("_doFill",!1)},d.prototype.noStroke=function(){this._setProperty("_doStroke",!1)},d.prototype.stroke=function(){this._setProperty("_doStroke",!0);var a=this.drawingContext,b=this.color.apply(this,arguments);a.strokeStyle=b.toString()},d}({},amdclean.core,amdclean.constants,amdclean.p5Color),amdclean.dataconversion=function(a,b){"use strict";var c=b;return c.prototype["float"]=function(a){return parseFloat(a)},c.prototype["int"]=function(a,b){return"string"==typeof a?(b=b||10,parseInt(a,b)):"number"==typeof a?0|a:"boolean"==typeof a?a?1:0:a instanceof Array?a.map(function(a){return c.prototype["int"](a,b)}):void 0},c.prototype.str=function(a){return a instanceof Array?a.map(c.prototype.str):String(a)},c.prototype["boolean"]=function(a){return"number"==typeof a?0!==a:"string"==typeof a?"true"===a.toLowerCase():"boolean"==typeof a?a:a instanceof Array?a.map(c.prototype["boolean"]):void 0},c.prototype["byte"]=function(a){var b=c.prototype["int"](a,10);return"number"==typeof b?(b+128)%256-128:b instanceof Array?b.map(c.prototype["byte"]):void 0},c.prototype["char"]=function(a){return"number"!=typeof a||isNaN(a)?a instanceof Array?a.map(c.prototype["char"]):"string"==typeof a?c.prototype["char"](parseInt(a,10)):void 0:String.fromCharCode(a)},c.prototype.unchar=function(a){return"string"==typeof a&&1===a.length?a.charCodeAt(0):a instanceof Array?a.map(c.prototype.unchar):void 0},c.prototype.hex=function(a,b){if(b=void 0===b||null===b?b=8:b,a instanceof Array)return a.map(function(a){return c.prototype.hex(a,b)});if("number"==typeof a){0>a&&(a=4294967295+a+1);for(var d=Number(a).toString(16).toUpperCase();d.length<b;)d="0"+d;return d.length>=b&&(d=d.substring(d.length-b,d.length)),d}},c.prototype.unhex=function(a){return a instanceof Array?a.map(c.prototype.unhex):parseInt("0x"+a,16)},c}({},amdclean.core),amdclean.dataarray_functions=function(a,b){"use strict";var c=b;return c.prototype.append=function(a,b){return a.push(b),a},c.prototype.arrayCopy=function(a,b,c,d,e){var f,g;"undefined"!=typeof e?(g=Math.min(e,a.length),f=d,a=a.slice(b,g+b)):("undefined"!=typeof c?(g=c,g=Math.min(g,a.length)):g=a.length,f=0,c=b,a=a.slice(0,g)),Array.prototype.splice.apply(c,[f,g].concat(a))},c.prototype.concat=function(a,b){return a.concat(b)},c.prototype.reverse=function(a){return a.reverse()},c.prototype.shorten=function(a){return a.pop(),a},c.prototype.shuffle=function(a,b){a=b||ArrayBuffer.isView(a)?a:a.slice();for(var c,d,e=a.length;e>1;)c=Math.random()*e|0,d=a[--e],a[e]=a[c],a[c]=d;return a},c.prototype.sort=function(a,b){var c=b?a.slice(0,Math.min(b,a.length)):a,d=b?a.slice(Math.min(b,a.length)):[];return c="string"==typeof c[0]?c.sort():c.sort(function(a,b){return a-b}),c.concat(d)},c.prototype.splice=function(a,b,c){return Array.prototype.splice.apply(a,[c,0].concat(b)),a},c.prototype.subset=function(a,b,c){return"undefined"!=typeof c?a.slice(b,b+c):a.slice(b,a.length)},c}({},amdclean.core),amdclean.datastring_functions=function(a,b){"use strict";function c(){var a=arguments[0],b=0>a,c=b?a.toString().substring(1):a.toString(),d=c.indexOf("."),e=-1!==d?c.substring(0,d):c,f=-1!==d?c.substring(d+1):"",g=b?"-":"";if(3===arguments.length){for(var h=0;h<arguments[1]-e.length;h++)g+="0";g+=e,g+=".",g+=f;for(var i=0;i<arguments[2]-f.length;i++)g+="0";return g}for(var j=0;j<Math.max(arguments[1]-e.length,0);j++)g+="0";return g+=c}function d(){var a=arguments[0].toString(),b=a.indexOf("."),c=-1!==b?a.substring(b):"",d=-1!==b?a.substring(0,b):a;return d=d.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),0===arguments[1]&&(c=""),arguments.length>1&&(c=c.substring(0,arguments[1]+1)),d+c}function e(){return parseFloat(arguments[0])>0?"+"+arguments[0].toString():arguments[0].toString()}function f(){return parseFloat(arguments[0])>0?" "+arguments[0].toString():arguments[0].toString()}var g=b;return g.prototype.join=function(a,b){return a.join(b)},g.prototype.match=function(a,b){return a.match(b)},g.prototype.matchAll=function(a,b){for(var c=new RegExp(b,"g"),d=c.exec(a),e=[];null!==d;)e.push(d),d=c.exec(a);return e},g.prototype.nf=function(){if(arguments[0]instanceof Array){var a=arguments[1],b=arguments[2];return arguments[0].map(function(d){return c(d,a,b)})}return c.apply(this,arguments)},g.prototype.nfc=function(){if(arguments[0]instanceof Array){var a=arguments[1];return arguments[0].map(function(b){return d(b,a)})}return d.apply(this,arguments)},g.prototype.nfp=function(){var a=this.nf(arguments);return a instanceof Array?a.map(e):e(a)},g.prototype.nfs=function(){var a=this.nf(arguments);return a instanceof Array?a.map(f):f(a)},g.prototype.split=function(a,b){return a.split(b)},g.prototype.splitTokens=function(){var a=arguments.length>0?arguments[1]:/\s/g;return arguments[0].split(a).filter(function(a){return a})},g.prototype.trim=function(a){return a instanceof Array?a.map(this.trim):a.trim()},g}({},amdclean.core),amdclean.environment=function(a,b,c){"use strict";function d(a){var b=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled;if(!b)throw new Error("Fullscreen not enabled in this browser.");a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.msRequestFullscreen&&a.msRequestFullscreen()}function e(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()}var f=b,g=c,h=[g.ARROW,g.CROSS,g.HAND,g.MOVE,g.TEXT,g.WAIT];return f.prototype._frameRate=0,f.prototype._lastFrameTime=(new Date).getTime(),f.prototype._targetFrameRate=60,f.prototype.frameCount=0,f.prototype.focused=!0,f.prototype.cursor=function(a,b,c){var d="auto",e=this._curElement.elt;if(h.indexOf(a)>-1)d=a;else if("string"==typeof a){var f="";b&&c&&"number"==typeof b&&"number"==typeof c&&(f=b+" "+c),d="http://"!==a.substring(0,6)?"url("+a+") "+f+", auto":/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(a)?"url("+a+") "+f+", auto":a}e.style.cursor=d},f.prototype.frameRate=function(a){return"undefined"==typeof a?this._frameRate:(this._setProperty("_targetFrameRate",a),this._runFrames(),this)},f.prototype.getFrameRate=function(){return this.frameRate()},f.prototype.setFrameRate=function(a){return this.frameRate(a)},f.prototype.noCursor=function(){this._curElement.elt.style.cursor="none"},f.prototype.displayWidth=screen.width,f.prototype.displayHeight=screen.height,f.prototype.windowWidth=window.innerWidth,f.prototype.windowHeight=window.innerHeight,f.prototype._onresize=function(a){this._setProperty("windowWidth",window.innerWidth),this._setProperty("windowHeight",window.innerHeight);var b,c=this._isGlobal?window:this;"function"==typeof c.windowResized&&(b=c.windowResized(a),void 0===b||b||a.preventDefault())},f.prototype.width=0,f.prototype.height=0,f.prototype.fullscreen=function(a){return"undefined"==typeof a?document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement:void(a?d(document.documentElement):e())},f.prototype.devicePixelScaling=function(a){this._pixelDensity=a?"number"==typeof a?a:window.devicePixelRatio||1:1,this.resizeCanvas(this.width,this.height,!0)},f.prototype.getURL=function(){return location.href},f.prototype.getURLPath=function(){return location.pathname.split("/").filter(function(a){return""!==a})},f.prototype.getURLParams=function(){for(var a,b=/[?&]([^&=]+)(?:[&=])([^&=]+)/gim,c={};null!=(a=b.exec(location.search));)a.index===b.lastIndex&&b.lastIndex++,c[a[1]]=a[2];return c},f}({},amdclean.core,amdclean.constants),amdclean.imageimage=function(a,b,c){"use strict";var d=b,c=c;return d.prototype._imageMode=c.CORNER,d.prototype._tint=null,d.prototype.createImage=function(a,b){return new d.Image(a,b)},d}({},amdclean.core,amdclean.constants),amdclean.canvas=function(a,b){var b=b;return{modeAdjust:function(a,c,d,e,f){return f===b.CORNER?{x:a,y:c,w:d,h:e}:f===b.CORNERS?{x:a,y:c,w:d-a,h:e-c}:f===b.RADIUS?{x:a-d,y:c-e,w:2*d,h:2*e}:f===b.CENTER?{x:a-.5*d,y:c-.5*e,w:d,h:e}:void 0},arcModeAdjust:function(a,c,d,e,f){return f===b.CORNER?{x:a+.5*d,y:c+.5*e,w:d,h:e}:f===b.CORNERS?{x:a,y:c,w:d+a,h:e+c}:f===b.RADIUS?{x:a,y:c,w:2*d,h:2*e}:f===b.CENTER?{x:a,y:c,w:d,h:e}:void 0}}}({},amdclean.constants),amdclean.imageloading_displaying=function(a,b,c,d,e){"use strict";var f=b,g=c,d=d,e=e;return f.prototype.loadImage=function(a,b,c){var d=new Image,e=new f.Image(1,1,this);return d.onload=function(){e.width=e.canvas.width=d.width,e.height=e.canvas.height=d.height,e.canvas.getContext("2d").drawImage(d,0,0),"function"==typeof b&&b(e)},d.onerror=function(a){"function"==typeof c&&c(a)},0!==a.indexOf("data:image/")&&(d.crossOrigin="Anonymous"),d.src=a,e},f.prototype.image=function(a,b,c,e,f){var g=a.canvas||a.elt;b=b||0,c=c||0,e=e||a.width,f=f||a.height;var h=d.modeAdjust(b,c,e,f,this._imageMode);try{this._tint&&a.canvas?this.drawingContext.drawImage(this._getTintedImageCanvas(a),h.x,h.y,h.w,h.h):this.drawingContext.drawImage(g,h.x,h.y,h.w,h.h)}catch(i){if("NS_ERROR_NOT_AVAILABLE"!==i.name)throw i}},f.prototype.tint=function(){var a=this.color.apply(this,arguments);this._tint=a.rgba},f.prototype.noTint=function(){this._tint=null},f.prototype._getTintedImageCanvas=function(a){if(!a.canvas)return a;var b=g._toPixels(a.canvas),c=document.createElement("canvas");c.width=a.canvas.width,c.height=a.canvas.height;for(var d=c.getContext("2d"),e=d.createImageData(a.canvas.width,a.canvas.height),f=e.data,h=0;h<b.length;h+=4){var i=b[h],j=b[h+1],k=b[h+2],l=b[h+3];f[h]=i*this._tint[0]/255,f[h+1]=j*this._tint[1]/255,f[h+2]=k*this._tint[2]/255,f[h+3]=l*this._tint[3]/255}return d.putImageData(e,0,0),c},f.prototype.imageMode=function(a){(a===e.CORNER||a===e.CORNERS||a===e.CENTER)&&(this._imageMode=a)},f}({},amdclean.core,amdclean.filters,amdclean.canvas,amdclean.constants),amdclean.imagepixels=function(a,b,c){"use strict";var d=b,e=c;return d.prototype.pixels=[],d.prototype.blend=function(){var a=this.drawingContext.globalCompositeOperation,b=arguments[arguments.length-1],c=Array.prototype.slice.call(arguments,0,arguments.length-1);this.drawingContext.globalCompositeOperation=b,this.copy.apply(this,c),this.drawingContext.globalCompositeOperation=a},d.prototype.copy=function(){var a,b,c,d,e,f,g,h,i;if(9===arguments.length)a=arguments[0],b=arguments[1],c=arguments[2],d=arguments[3],e=arguments[4],f=arguments[5],g=arguments[6],h=arguments[7],i=arguments[8];else{if(8!==arguments.length)throw new Error("Signature not supported");b=arguments[0],c=arguments[1],d=arguments[2],e=arguments[3],f=arguments[4],g=arguments[5],h=arguments[6],i=arguments[7],a=this}var j=a.canvas.width/a.width;this.drawingContext.drawImage(a.canvas,j*b,j*c,j*d,j*e,f,g,h,i)},d.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b)},d.prototype.get=function(a,b,c,e){if(void 0===a&&void 0===b&&void 0===c&&void 0===e?(a=0,b=0,c=this.width,e=this.height):void 0===c&&void 0===e&&(c=1,e=1),a>this.width||b>this.height||0>a||0>b)return[0,0,0,255];var f=this.drawingContext.getImageData(a,b,c,e),g=f.data;if(1===c&&1===e){for(var h=[],i=0;i<g.length;i+=4)h.push(g[i],g[i+1],g[i+2],g[i+3]);return h}c=Math.min(c,this.width),e=Math.min(e,this.height);var j=new d.Image(c,e);return j.canvas.getContext("2d").putImageData(f,0,0,0,0,c,e),j},d.prototype.loadPixels=function(){var a=this.width,b=this.height,c=this.drawingContext.getImageData(0,0,a,b);this._setProperty("imageData",c),this._setProperty("pixels",c.data)},d.prototype.set=function(a,b,c){if(c instanceof d.Image)this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pixelDensity,this._pixelDensity),this.drawingContext.drawImage(c.canvas,a,b),this.loadPixels.call(this),this.drawingContext.restore();else{var e=4*(b*this.width+a);if(this.imageData||this.loadPixels.call(this),"number"==typeof c)e<this.pixels.length&&(this.pixels[e]=c,this.pixels[e+1]=c,this.pixels[e+2]=c,this.pixels[e+3]=255);else if(c instanceof Array){if(c.length<4)throw new Error("pixel array must be of the form [R, G, B, A]");e<this.pixels.length&&(this.pixels[e]=c[0],this.pixels[e+1]=c[1],this.pixels[e+2]=c[2],this.pixels[e+3]=c[3])}else c instanceof d.Color&&e<this.pixels.length&&(this.pixels[e]=c.rgba[0],this.pixels[e+1]=c.rgba[1],this.pixels[e+2]=c.rgba[2],this.pixels[e+3]=c.rgba[3])}},d.prototype.updatePixels=function(a,b,c,d){void 0===a&&void 0===b&&void 0===c&&void 0===d&&(a=0,b=0,c=this.width,d=this.height),this.drawingContext.putImageData(this.imageData,a,b,0,0,c,d)},d}({},amdclean.core,amdclean.filters,amdclean.p5Color),!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():"function"==typeof define&&define.amd?define("reqwest",c):b[a]=c()}("reqwest",amdclean,function(){function succeed(a){var b=protocolRe.exec(a.url);return b=b&&b[1]||window.location.protocol,httpsRe.test(b)?twoHundo.test(a.request.status):!!a.request.response}function handleReadyState(a,b,c){return function(){return a._aborted?c(a.request):a._timedOut?c(a.request,"Request is aborted: timeout"):void(a.request&&4==a.request[readyState]&&(a.request.onreadystatechange=noop,succeed(a)?b(a.request):c(a.request)))}}function setHeaders(a,b){var c,d=b.headers||{};d.Accept=d.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"];var e="function"==typeof FormData&&b.data instanceof FormData;b.crossOrigin||d[requestedWith]||(d[requestedWith]=defaultHeaders.requestedWith),d[contentType]||e||(d[contentType]=b.contentType||defaultHeaders.contentType);for(c in d)d.hasOwnProperty(c)&&"setRequestHeader"in a&&a.setRequestHeader(c,d[c])}function setCredentials(a,b){"undefined"!=typeof b.withCredentials&&"undefined"!=typeof a.withCredentials&&(a.withCredentials=!!b.withCredentials)}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||reqwest.getcallbackPrefix(e),h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0,l=-1!==navigator.userAgent.indexOf("MSIE 10.0");return i?"?"===i[3]?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,"undefined"==typeof j.onreadystatechange||l||(j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){return j[readyState]&&"complete"!==j[readyState]&&"loaded"!==j[readyState]||k?!1:(j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),b(lastValue),lastValue=void 0,head.removeChild(j),void(k=1))},head.appendChild(j),{abort:function(){j.onload=j.onreadystatechange=null,c({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(j),k=1}}}function getRequest(a,b){var c,d=this.o,e=(d.method||"GET").toUpperCase(),f="string"==typeof d?d:d.url,g=d.processData!==!1&&d.data&&"string"!=typeof d.data?reqwest.toQueryString(d.data):d.data||null,h=!1;return"jsonp"!=d.type&&"GET"!=e||!g||(f=urlappend(f,g),g=null),"jsonp"==d.type?handleJsonp(d,a,b,f):(c=d.xhr&&d.xhr(d)||xhr(d),c.open(e,f,d.async===!1?!1:!0),setHeaders(c,d),setCredentials(c,d),win[xDomainRequest]&&c instanceof win[xDomainRequest]?(c.onload=a,c.onerror=b,c.onprogress=function(){},h=!0):c.onreadystatechange=handleReadyState(this,a,b),d.before&&d.before(c),h?setTimeout(function(){c.send(g)},200):c.send(g),c)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){return a.match("json")?"json":a.match("javascript")?"js":a.match("text")?"html":a.match("xml")?"xml":void 0}function init(o,fn){function complete(a){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(a)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(a,b,c){for(a=self.request,self._responseArgs.resp=a,self._responseArgs.msg=b,self._responseArgs.t=c,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(a,b,c);complete(a)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c,d,e,f,g=a.name,h=a.tagName.toLowerCase(),i=function(a){a&&!a.disabled&&b(g,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(!a.disabled&&g)switch(h){case"input":/reset|button|image|file/i.test(a.type)||(c=/checkbox/i.test(a.type),d=/radio/i.test(a.type),e=a.value,(!(c||d)||a.checked)&&b(g,normalize(c&&""===e?"on":e)));break;case"textarea":b(g,normalize(a.value));break;case"select":if("select-one"===a.type.toLowerCase())i(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(f=0;a.length&&f<a.length;f++)a.options[f].selected&&i(a.options[f])}}function eachFormElement(){var a,b,c=this,d=function(a,b){var d,e,f;for(d=0;d<b.length;d++)for(f=a[byTag](b[d]),e=0;e<f.length;e++)serial(f[e],c)};for(b=0;b<arguments.length;b++)a=arguments[b],/input|select|textarea/i.test(a.tagName)&&serial(a,c),d(a,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}function buildParams(a,b,c,d){var e,f,g,h=/\[\]$/;if(isArray(b))for(f=0;b&&f<b.length;f++)g=b[f],c||h.test(a)?d(a,g):buildParams(a+"["+("object"==typeof g?f:"")+"]",g,c,d);else if(b&&"[object Object]"===b.toString())for(e in b)buildParams(a+"["+e+"]",b[e],c,d);else d(a,b)}var win=window,doc=document,httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(a){if(a.crossOrigin===!0){var b=win[xmlHttpRequest]?new XMLHttpRequest:null;if(b&&"withCredentials"in b)return b;if(win[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return win[xmlHttpRequest]?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(a){return a}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(a,b){return a=a||function(){},b=b||function(){},this._fulfilled?this._responseArgs.resp=a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b)),this},always:function(a){return this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a),this},fail:function(a){return this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a),this},"catch":function(a){return this.fail(a)}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(0===arguments.length)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),b="map"==a?serializeHash:"array"==a?reqwest.serializeArray:serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a,b){var c,d,e=b||!1,f=[],g=encodeURIComponent,h=function(a,b){b="function"==typeof b?b():null==b?"":b,f[f.length]=g(a)+"="+g(b)};if(isArray(a))for(d=0;a&&d<a.length;d++)h(a[d].name,a[d].value);else for(c in a)a.hasOwnProperty(c)&&buildParams(c,a[c],e,h);return f.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest.ajaxSetup=function(a){a=a||{};for(var b in a)globalSetupOptions[b]=a[b]},reqwest}),amdclean.inputfiles=function(a,b,c){"use strict";function d(a,b){var c={};if(b=b||[],"undefined"==typeof b)for(var d=0;d<a.length;d++)b[d.toString()]=d;for(var e=0;e<b.length;e++){var f=b[e],g=a[e];c[f]=g}return c}var e=b,c=c;return e.prototype.createInput=function(){throw"not yet implemented"},e.prototype.createReader=function(){throw"not yet implemented"},e.prototype.loadBytes=function(){throw"not yet implemented"},e.prototype.loadJSON=function(){var a=arguments[0],b=arguments[1],d=[],e="json";return"string"==typeof arguments[2]&&("jsonp"===arguments[2]||"json"===arguments[2])&&(e=arguments[2]),c({url:a,type:e,crossOrigin:!0}).then(function(a){for(var c in a)d[c]=a[c];"undefined"!=typeof b&&b(a)}),d},e.prototype.loadStrings=function(a,b){var c=[],d=new XMLHttpRequest;return d.open("GET",a,!0),d.onreadystatechange=function(){if(4===d.readyState&&(200===d.status||0===d.status)){var a=d.responseText.match(/[^\r\n]+/g);for(var e in a)c[e]=a[e];"undefined"!=typeof b&&b(c)}},d.send(null),c},e.prototype.loadTable=function(a){for(var b=null,f=[],g=!1,h=",",i=!1,j=1;j<arguments.length;j++)if("function"==typeof arguments[j])b=arguments[j];else if("string"==typeof arguments[j])if(f.push(arguments[j]),"header"===arguments[j]&&(g=!0),"csv"===arguments[j]){if(i)throw new Error("Cannot set multiple separator types.");h=",",i=!0}else if("tsv"===arguments[j]){if(i)throw new Error("Cannot set multiple separator types.");h="	",i=!0}var k=new e.Table;return c({url:a,crossOrigin:!0,type:"csv"}).then(function(a){a=a.responseText;for(var c,f={},i=0,l=1,m=2,n=4,o='"',p="\r",q="\n",r=[],s=0,t=null,u=function(){f.escaped=!1,t=[],w()},v=function(){f.currentState=n,r.push(t),t=null},w=function(){f.currentState=i,f.token=""},x=function(){t.push(f.token),w()};;){if(c=a[s++],null==c){if(f.escaped)throw new Error("Unclosed quote in file.");if(t){x(),v();break}}if(null===t&&u(),f.currentState===i){if(c===o){f.escaped=!0,f.currentState=l;continue}f.currentState=l}f.currentState===l&&f.escaped?c===o?a[s]===o?(f.token+=o,s++):(f.escaped=!1,f.currentState=m):f.token+=c:c===p?(a[s]===q&&s++,x(),v()):c===q?(x(),v()):c===h?x():f.currentState===l&&(f.token+=c)}if(g)k.columns=r.shift();else for(j=0;j<r.length;j++)k.columns[j]=j.toString();var y;for(j=0;j<r.length;j++)y=new e.TableRow,y.arr=r[j],y.obj=d(r[j],k.columns),k.addRow(y);null!==b&&b(k)}).fail(function(){"undefined"!=typeof b&&b(!1)}),k},e.prototype.loadXML=function(a,b){var d=[];return c({url:a,type:"xml",crossOrigin:!0}).then(function(a){b(a)}),d},e.prototype.parseXML=function(){throw"not yet implemented"},e.prototype.selectFolder=function(){throw"not yet implemented"},e.prototype.selectInput=function(){throw"not yet implemented"},e.prototype.httpGet=function(){var a=Array.prototype.slice.call(arguments);a.push("GET"),e.prototype.httpDo.apply(this,a)},e.prototype.httpPost=function(){var a=Array.prototype.slice.call(arguments);a.push("POST"),e.prototype.httpDo.apply(this,a)},e.prototype.httpDo=function(){for(var a,b="GET",d=arguments[0],e={},f="",g=1;g<arguments.length;g++){var h=arguments[g];"string"==typeof h?"GET"===h||"POST"===h||"PUT"===h?b=h:f=h:"object"==typeof h?e=h:"function"==typeof h&&(a=h)}""===f&&(f=-1!==d.indexOf("json")?"json":-1!==d.indexOf("xml")?"xml":"text"),c({url:d,method:b,data:e,type:f,crossOrigin:!0,success:function(b){"undefined"!=typeof a&&a("text"===f?b.response:b)}})},e}({},amdclean.core,amdclean.reqwest),amdclean.inputkeyboard=function(a,b){"use strict";var c=b,d={};return c.prototype.isKeyPressed=!1,c.prototype.keyIsPressed=!1,c.prototype.key="",c.prototype.keyCode=0,c.prototype._onkeydown=function(a){this._setProperty("isKeyPressed",!0),this._setProperty("keyIsPressed",!0),this._setProperty("keyCode",a.which),d[a.which]=!0;var b=String.fromCharCode(a.which);b||(b=a.which),this._setProperty("key",b);var c=this.keyPressed||window.keyPressed;if("function"==typeof c&&!a.charCode){var e=c(a);e===!1&&a.preventDefault()}},c.prototype._onkeyup=function(a){var b=this.keyReleased||window.keyReleased;this._setProperty("isKeyPressed",!1),this._setProperty("keyIsPressed",!1),d[a.which]=!1;var c=String.fromCharCode(a.which);if(c||(c=a.which),this._setProperty("key",c),this._setProperty("keyCode",a.which),"function"==typeof b){var e=b(a);e===!1&&a.preventDefault()}},c.prototype._onkeypress=function(a){this._setProperty("keyCode",a.which),this._setProperty("key",String.fromCharCode(a.which));var b=this.keyTyped||window.keyTyped;if("function"==typeof b){var c=b(a);c===!1&&a.preventDefault()}},c.prototype._onblur=function(){d={}},c.prototype.keyIsDown=function(a){return d[a]},c}({},amdclean.core),amdclean.inputacceleration=function(a,b){"use strict";var c=b;c.prototype.deviceOrientation=void 0,c.prototype.accelerationX=0,c.prototype.accelerationY=0,c.prototype.accelerationZ=0,c.prototype.pAccelerationX=0,c.prototype.pAccelerationY=0,c.prototype.pAccelerationZ=0,c.prototype._updatePAccelerations=function(){this._setProperty("pAccelerationX",this.accelerationX),this._setProperty("pAccelerationY",this.accelerationY),this._setProperty("pAccelerationZ",this.accelerationZ)};var d=.5;c.prototype.setMoveThreshold=function(a){"number"==typeof a&&(d=a)};var e="",f="";return c.prototype._ondeviceorientation=function(a){this._setProperty("accelerationX",a.beta),this._setProperty("accelerationY",a.gamma),this._setProperty("accelerationZ",a.alpha),this._handleMotion()},c.prototype._ondevicemotion=function(a){this._setProperty("accelerationX",2*a.acceleration.x),this._setProperty("accelerationY",2*a.acceleration.y),this._setProperty("accelerationZ",2*a.acceleration.z),this._handleMotion()
},c.prototype._onMozOrientation=function(a){this._setProperty("accelerationX",a.x),this._setProperty("accelerationY",a.y),this._setProperty("accelerationZ",a.z),this._handleMotion()},c.prototype._handleMotion=function(){90===window.orientation||-90===window.orientation?this._setProperty("deviceOrientation","landscape"):0===window.orientation?this._setProperty("deviceOrientation","portrait"):void 0===window.orientation&&this._setProperty("deviceOrientation","undefined");var a=this.onDeviceMove||window.onDeviceMove;"function"==typeof a&&(Math.abs(this.accelerationX-this.pAccelerationX)>d||Math.abs(this.accelerationY-this.pAccelerationY)>d||Math.abs(this.accelerationZ-this.pAccelerationZ)>d)&&a();var b=this.onDeviceTurn||window.onDeviceTurn;if("function"==typeof b){var c=0;Math.abs(this.accelerationX)>c&&(c=this.accelerationX,f="x"),Math.abs(this.accelerationY)>c&&(c=this.accelerationY,f="y"),Math.abs(this.accelerationZ)>c&&(f="z"),""!==e&&e!==f&&b(f),e=f}},c}({},amdclean.core),amdclean.inputmouse=function(a,b,c){"use strict";function d(a,b){var c=a.getBoundingClientRect();return{x:b.clientX-c.left,y:b.clientY-c.top}}var e=b,c=c;return e.prototype.mouseX=0,e.prototype.mouseY=0,e.prototype.pmouseX=0,e.prototype.pmouseY=0,e.prototype.winMouseX=0,e.prototype.winMouseY=0,e.prototype.pwinMouseX=0,e.prototype.pwinMouseY=0,e.prototype.mouseButton=0,e.prototype.mouseIsPressed=!1,e.prototype.isMousePressed=!1,e.prototype._updateMouseCoords=function(a){if("touchstart"===a.type||"touchmove"===a.type||"touchend"===a.type)this._setProperty("mouseX",this.touchX),this._setProperty("mouseY",this.touchY);else if(null!==this._curElement){var b=d(this._curElement.elt,a);this._setProperty("mouseX",b.x),this._setProperty("mouseY",b.y)}this._setProperty("winMouseX",a.pageX),this._setProperty("winMouseY",a.pageY)},e.prototype._updatePMouseCoords=function(){this._setProperty("pmouseX",this.mouseX),this._setProperty("pmouseY",this.mouseY),this._setProperty("pwinMouseX",this.winMouseX),this._setProperty("pwinMouseY",this.winMouseY)},e.prototype._setMouseButton=function(a){1===a.button?this._setProperty("mouseButton",c.CENTER):2===a.button?this._setProperty("mouseButton",c.RIGHT):(this._setProperty("mouseButton",c.LEFT),("touchstart"===a.type||"touchmove"===a.type)&&(this._setProperty("mouseX",this.touchX),this._setProperty("mouseY",this.touchY)))},e.prototype._onmousemove=function(a){var b,c=this._isGlobal?window:this;this._updateMouseCoords(a),this.isMousePressed?"function"==typeof c.mouseDragged?(b=c.mouseDragged(a),b===!1&&a.preventDefault()):"function"==typeof c.touchMoved&&(b=c.touchMoved(a),b===!1&&a.preventDefault(),this._updateTouchCoords(a)):"function"==typeof c.mouseMoved&&(b=c.mouseMoved(a),b===!1&&a.preventDefault())},e.prototype._onmousedown=function(a){var b,c=this._isGlobal?window:this;this._setProperty("isMousePressed",!0),this._setProperty("mouseIsPressed",!0),this._setMouseButton(a),this._updateMouseCoords(a),"function"==typeof c.mousePressed?(b=c.mousePressed(a),b===!1&&a.preventDefault()):"function"==typeof c.touchStarted&&(b=c.touchStarted(a),b===!1&&a.preventDefault(),this._updateTouchCoords(a))},e.prototype._onmouseup=function(a){var b,c=this._isGlobal?window:this;this._setProperty("isMousePressed",!1),this._setProperty("mouseIsPressed",!1),"function"==typeof c.mouseReleased?(b=c.mouseReleased(a),b===!1&&a.preventDefault()):"function"==typeof c.touchEnded&&(b=c.touchEnded(a),b===!1&&a.preventDefault(),this._updateTouchCoords(a))},e.prototype._onclick=function(a){var b=this._isGlobal?window:this;if("function"==typeof b.mouseClicked){var c=b.mouseClicked(a);c===!1&&a.preventDefault()}},e.prototype._onmousewheel=e.prototype._onDOMMouseScroll=function(a){var b=this._isGlobal?window:this;if("function"==typeof b.mouseWheel){var c=b.mouseWheel(a);c===!1&&a.preventDefault()}},e}({},amdclean.core,amdclean.constants),amdclean.inputtime_date=function(a,b){"use strict";var c=b;return c.prototype.day=function(){return(new Date).getDate()},c.prototype.hour=function(){return(new Date).getHours()},c.prototype.minute=function(){return(new Date).getMinutes()},c.prototype.millis=function(){return(new Date).getTime()-this._startTime},c.prototype.month=function(){return(new Date).getMonth()+1},c.prototype.second=function(){return(new Date).getSeconds()},c.prototype.year=function(){return(new Date).getFullYear()},c}({},amdclean.core),amdclean.inputtouch=function(a,b){"use strict";function c(a,b,c){c=c||0;var d=a.getBoundingClientRect(),e=b.touches[c]||b.changedTouches[c];return{x:e.clientX-d.left,y:e.clientY-d.top}}var d=b;return d.prototype.touchX=0,d.prototype.touchY=0,d.prototype.ptouchX=0,d.prototype.ptouchY=0,d.prototype.touches=[],d.prototype.touchIsDown=!1,d.prototype._updateTouchCoords=function(a){if("mousedown"===a.type||"mousemove"===a.type||"mouseup"===a.type)this._setProperty("touchX",this.mouseX),this._setProperty("touchY",this.mouseY);else{var b=c(this._curElement.elt,a,0);this._setProperty("touchX",b.x),this._setProperty("touchY",b.y);for(var d=[],e=0;e<a.touches.length;e++){var f=c(this._curElement.elt,a,e);d[e]={x:f.x,y:f.y}}this._setProperty("touches",d)}},d.prototype._updatePTouchCoords=function(){this._setProperty("ptouchX",this.touchX),this._setProperty("ptouchY",this.touchY)},d.prototype._ontouchstart=function(a){var b,c=this._isGlobal?window:this;this._updateTouchCoords(a),this._setProperty("touchIsDown",!0),"function"==typeof c.touchStarted?(b=c.touchStarted(a),b===!1&&a.preventDefault()):"function"==typeof c.mousePressed&&(b=c.mousePressed(a),b===!1&&a.preventDefault())},d.prototype._ontouchmove=function(a){var b,c=this._isGlobal?window:this;this._updateTouchCoords(a),"function"==typeof c.touchMoved?(b=c.touchMoved(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseDragged&&(b=c.mouseDragged(a),b===!1&&a.preventDefault(),this._updateMouseCoords(a))},d.prototype._ontouchend=function(a){this._updateTouchCoords(a),0===this.touches.length&&this._setProperty("touchIsDown",!1);var b,c=this._isGlobal?window:this;"function"==typeof c.touchEnded?(b=c.touchEnded(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseReleased&&(b=c.mouseReleased(a),b===!1&&a.preventDefault(),this._updateMouseCoords(a))},d}({},amdclean.core),amdclean.mathmath=function(a,b){"use strict";var c=b;return c.prototype.createVector=function(a,b,d){return this instanceof c?new c.Vector(this,arguments):new c.Vector(a,b,d)},c}({},amdclean.core),amdclean.mathcalculation=function(a,b){"use strict";var c=b;return c.prototype.abs=Math.abs,c.prototype.ceil=Math.ceil,c.prototype.constrain=function(a,b,c){return Math.max(Math.min(a,c),b)},c.prototype.dist=function(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))},c.prototype.exp=Math.exp,c.prototype.floor=Math.floor,c.prototype.lerp=function(a,b,c){return c*(b-a)+a},c.prototype.log=Math.log,c.prototype.mag=function(a,b){return Math.sqrt(a*a+b*b)},c.prototype.map=function(a,b,c,d,e){return(a-b)/(c-b)*(e-d)+d},c.prototype.max=function(){return arguments[0]instanceof Array?Math.max.apply(null,arguments[0]):Math.max.apply(null,arguments)},c.prototype.min=function(){return arguments[0]instanceof Array?Math.min.apply(null,arguments[0]):Math.min.apply(null,arguments)},c.prototype.norm=function(a,b,c){return this.map(a,b,c,0,1)},c.prototype.pow=Math.pow,c.prototype.round=Math.round,c.prototype.sq=function(a){return a*a},c.prototype.sqrt=Math.sqrt,c}({},amdclean.core),amdclean.mathrandom=function(a,b){"use strict";var c=b,d=!1,e=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function(d){b=a=(null==d?Math.random()*c:d)>>>0},getSeed:function(){return a},rand:function(){return b=(d*b+e)%c,b/c}}}();c.prototype.randomSeed=function(a){e.setSeed(a),d=!0},c.prototype.random=function(a,b){var c;if(c=d?e.rand():Math.random(),0===arguments.length)return c;if(1===arguments.length)return c*a;if(a>b){var f=a;a=b,b=f}return c*(b-a)+a};var f,g=!1;return c.prototype.randomGaussian=function(a,b){var c,d,e,h;if(g)c=f,g=!1;else{do d=this.random(2)-1,e=this.random(2)-1,h=d*d+e*e;while(h>=1);h=Math.sqrt(-2*Math.log(h)/h),c=d*h,f=e*h,g=!0}var i=a||0,j=b||1;return c*j+i},c}({},amdclean.core),amdclean.mathnoise=function(a,b){"use strict";for(var c=b,d=4,e=1<<d,f=8,g=1<<f,h=4095,i=4,j=.5,k=.5,l=Math.floor(360/k),m=new Array(l),n=new Array(l),o=Math.PI/180,p=0;l>p;p++)m[p]=Math.sin(p*o*k),n[p]=Math.cos(p*o*k);var q=l;q>>=1;var r;return c.prototype.noise=function(a,b,c){if(b=b||0,c=c||0,null==r){r=new Array(h+1);for(var k=0;h+1>k;k++)r[k]=Math.random()}0>a&&(a=-a),0>b&&(b=-b),0>c&&(c=-c);for(var m,o,p,s,t,u=Math.floor(a),v=Math.floor(b),w=Math.floor(c),x=a-u,y=b-v,z=c-w,A=0,B=.5,C=function(a){return.5*(1-n[Math.floor(a*q)%l])},D=0;i>D;D++){var E=u+(v<<d)+(w<<f);m=C(x),o=C(y),p=r[E&h],p+=m*(r[E+1&h]-p),s=r[E+e&h],s+=m*(r[E+e+1&h]-s),p+=o*(s-p),E+=g,s=r[E&h],s+=m*(r[E+1&h]-s),t=r[E+e&h],t+=m*(r[E+e+1&h]-t),s+=o*(t-s),p+=C(z)*(s-p),A+=p*B,B*=j,u<<=1,x*=2,v<<=1,y*=2,w<<=1,z*=2,x>=1&&(u++,x--),y>=1&&(v++,y--),z>=1&&(w++,z--)}return A},c.prototype.noiseDetail=function(a,b){a>0&&(i=a),b>0&&(j=b)},c.prototype.noiseSeed=function(a){var b=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function(d){b=a=(null==d?Math.random()*c:d)>>>0},getSeed:function(){return a},rand:function(){return b=(d*b+e)%c,b/c}}}();b.setSeed(a),r=new Array(h+1);for(var c=0;h+1>c;c++)r[c]=b.rand()},c}({},amdclean.core),amdclean.mathtrigonometry=function(a,b,c,d){"use strict";var e=b,f=c,d=d;return e.prototype._angleMode=d.RADIANS,e.prototype.acos=function(a){return this._angleMode===d.RADIANS?Math.acos(a):f.radiansToDegrees(Math.acos(a))},e.prototype.asin=function(a){return this._angleMode===d.RADIANS?Math.asin(a):f.radiansToDegrees(Math.asin(a))},e.prototype.atan=function(a){return this._angleMode===d.RADIANS?Math.atan(a):f.radiansToDegrees(Math.atan(a))},e.prototype.atan2=function(a,b){return this._angleMode===d.RADIANS?Math.atan2(a,b):f.radiansToDegrees(Math.atan2(a,b))},e.prototype.cos=function(a){return Math.cos(this._angleMode===d.RADIANS?a:this.radians(a))},e.prototype.sin=function(a){return Math.sin(this._angleMode===d.RADIANS?a:this.radians(a))},e.prototype.tan=function(a){return Math.tan(this._angleMode===d.RADIANS?a:this.radians(a))},e.prototype.degrees=function(a){return f.radiansToDegrees(a)},e.prototype.radians=function(a){return f.degreesToRadians(a)},e.prototype.angleMode=function(a){(a===d.DEGREES||a===d.RADIANS)&&(this._angleMode=a)},e}({},amdclean.core,amdclean.polargeometry,amdclean.constants),amdclean.outputfiles=function(a,b){"use strict";function c(a,b){b&&b!==!0&&"true"!==b||(b=""),a||(a="untitled");var c="";return a&&a.indexOf(".")>-1&&(c=a.split(".").pop()),b&&c!==b&&(c=b,a=a+"."+c),[a,c]}function d(a){document.body.removeChild(a.target)}var e=b;window.URL=window.URL||window.webkitURL,e.prototype._pWriters=[],e.prototype.beginRaw=function(){throw"not yet implemented"},e.prototype.beginRecord=function(){throw"not yet implemented"},e.prototype.createOutput=function(){throw"not yet implemented"},e.prototype.createWriter=function(a,b){var c;for(var d in e.prototype._pWriters)if(e.prototype._pWriters[d].name===a)return c=new e.PrintWriter(a+window.millis(),b),e.prototype._pWriters.push(c),c;return c=new e.PrintWriter(a,b),e.prototype._pWriters.push(c),c},e.prototype.endRaw=function(){throw"not yet implemented"},e.prototype.endRecord=function(){throw"not yet implemented"},e.PrintWriter=function(a,b){var c=this;this.name=a,this.content="",this.print=function(a){this.content+=a},this.println=function(a){this.content+=a+"\n"},this.flush=function(){this.content=""},this.close=function(){var d=[];d.push(this.content),e.prototype.writeFile(d,a,b);for(var f in e.prototype._pWriters)e.prototype._pWriters[f].name===this.name&&e.prototype._pWriters.splice(f,1);c.flush(),c={}}},e.prototype.saveBytes=function(){throw"not yet implemented"},e.prototype.save=function(){var a=arguments,b=this._curElement.elt;if(0===a.length)return void e.prototype.saveCanvas(b);if(a[0]instanceof e.Graphics)return void e.prototype.saveCanvas(a[0].elt,a[1],a[2]);if(1===a.length&&"string"==typeof a[0])e.prototype.saveCanvas(b,a[0]);else{var d=c(a[1],a[2])[1];switch(d){case"json":return void e.prototype.saveJSON(a[0],a[1],a[2]);case"txt":return void e.prototype.saveStrings(a[0],a[1],a[2]);default:a[0]instanceof Array?e.prototype.saveStrings(a[0],a[1],a[2]):a[0]instanceof e.Table?e.prototype.saveTable(a[0],a[1],a[2],a[3]):a[0]instanceof e.Image?e.prototype.saveCanvas(a[0].canvas,a[1]):a[0]instanceof e.SoundFile&&e.prototype.saveSound(a[0],a[1],a[2],a[3])}}},e.prototype.saveJSON=function(a,b,c){var d;d=c?JSON.stringify(a):JSON.stringify(a,void 0,2),console.log(d),this.saveStrings(d.split("\n"),b,"json")},e.prototype.saveJSONObject=e.prototype.saveJSON,e.prototype.saveJSONArray=e.prototype.saveJSON,e.prototype.saveStream=function(){throw"not yet implemented"},e.prototype.saveStrings=function(a,b,c){var d=c||"txt",e=this.createWriter(b,d);for(var f in a)f<a.length-1?e.println(a[f]):e.print(a[f]);e.close(),e.flush()},e.prototype.saveXML=function(){throw"not yet implemented"},e.prototype.selectOutput=function(){throw"not yet implemented"},e.prototype.saveTable=function(a,b,c){var d=this.createWriter(b,c),e=a.columns,g=",";if("tsv"===c&&(g="	"),"html"!==c){if("0"!==e[0])for(var h=0;h<e.length;h++)h<e.length-1?d.print(e[h]+g):d.println(e[h]);for(var i=0;i<a.rows.length;i++){var j;for(j=0;j<a.rows[i].arr.length;j++)j<a.rows[i].arr.length-1?d.print(a.rows[i].arr[j]+g):i<a.rows.length-1?d.println(a.rows[i].arr[j]):d.print(a.rows[i].arr[j])}}else{d.println("<html>"),d.println("<head>");var k='  <meta http-equiv="content-type" content';if(k+='="text/html;charset=utf-8" />',d.println(k),d.println("</head>"),d.println("<body>"),d.println("  <table>"),"0"!==e[0]){d.println("    <tr>");for(var l=0;l<e.length;l++){var m=f(e[l]);d.println("      <td>"+m),d.println("      </td>")}d.println("    </tr>")}for(var n=0;n<a.rows.length;n++){d.println("    <tr>");for(var o=0;o<a.columns.length;o++){var p=a.rows[n].getString(o),q=f(p);d.println("      <td>"+q),d.println("      </td>")}d.println("    </tr>")}d.println("  </table>"),d.println("</body>"),d.print("</html>")}d.close(),d.flush()};var f=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")};return e.prototype.writeFile=function(a,b,c){var d="application/octet-stream";e.prototype._isSafari()&&(d="text/plain");var f=new Blob(a,{type:d}),g=window.URL.createObjectURL(f);e.prototype.downloadFile(g,b,c)},e.prototype.downloadFile=function(a,b,f){var g=c(b,f),h=g[0],i=g[1],j=document.createElement("a");if(j.href=a,j.download=h,j.onclick=d,j.style.display="none",document.body.appendChild(j),e.prototype._isSafari()){var k="Hello, Safari user! To download this file...\n";k+="1. Go to File --> Save As.\n",k+='2. Choose "Page Source" as the Format.\n',k+='3. Name it with this extension: ."'+i+'"',alert(k)}j.click(),a=null},e.prototype._checkFileExtension=c,e.prototype._isSafari=function(){var a=Object.prototype.toString.call(window.HTMLElement);return a.indexOf("Constructor")>0},e}({},amdclean.core),amdclean.outputimage=function(a,b){"use strict";var c=b,d=[];return c.prototype.saveCanvas=function(a,b,d){d||(d=c.prototype._checkFileExtension(b,d)[1],""===d&&(d="png"));var e;if(a?e=a:this._curElement&&this._curElement.elt&&(e=this._curElement.elt),c.prototype._isSafari()){var f="Hello, Safari user!\n";f+="Now capturing a screenshot...\n",f+="To save this image,\n",f+="go to File --> Save As.\n",alert(f),window.location.href=e.toDataURL()}else{var g;if("undefined"==typeof d)d="png",g="image/png";else switch(d){case"png":g="image/png";break;case"jpeg":g="image/jpeg";break;case"jpg":g="image/jpeg";break;default:g="image/png"}var h="image/octet-stream",i=e.toDataURL(g);i=i.replace(g,h),c.prototype.downloadFile(i,b,d)}},c.prototype.saveFrames=function(a,b,e,f,g){var h=e||3;h=c.prototype.constrain(h,0,15),h=1e3*h;var i=f||15;i=c.prototype.constrain(i,0,22);var j=0,k=c.prototype._makeFrame,l=this._curElement.elt,m=setInterval(function(){k(a+j,b,l),j++},1e3/i);setTimeout(function(){if(clearInterval(m),g)g(d);else for(var a=0;a<d.length;a++){var b=d[a];c.prototype.downloadFile(b.imageData,b.filename,b.ext)}d=[]},h+.01)},c.prototype._makeFrame=function(a,b,c){var e;e=this?this._curElement.elt:c;var f;if(b)switch(b.toLowerCase()){case"png":f="image/png";break;case"jpeg":f="image/jpeg";break;case"jpg":f="image/jpeg";break;default:f="image/png"}else b="png",f="image/png";var g="image/octet-stream",h=e.toDataURL(f);h=h.replace(f,g);var i={};i.imageData=h,i.filename=a,i.ext=b,d.push(i)},c}({},amdclean.core),amdclean.outputtext_area=function(a,b){"use strict";var c=b;return c.prototype.print=window.console&&console.log?console.log.bind(console):function(){},c.prototype.println=c.prototype.print,c}({},amdclean.core),amdclean.renderingrendering=function(a,b,c){var d=b,c=c;return d.prototype.createCanvas=function(a,b,c){var e;return c?(e=document.createElement("canvas"),e.id="defaultCanvas"):e=this.canvas,this._setupDone||(e.className+=" p5_hidden",e.style.visibility="hidden"),this._userNode?this._userNode.appendChild(e):document.body.appendChild(e),this._defaultGraphics||(this._defaultGraphics=new d.Graphics(e,this,!0),this._elements.push(this._defaultGraphics)),this._defaultGraphics.resize(a,b),this._defaultGraphics._applyDefaults(),this._defaultGraphics},d.prototype.resizeCanvas=function(a,b,c){this._defaultGraphics&&(this._defaultGraphics.resize(a,b),this._defaultGraphics._applyDefaults(),c||this.redraw())},d.prototype.noCanvas=function(){this.canvas&&this.canvas.parentNode.removeChild(this.canvas)},d.prototype.createGraphics=function(a,b){var c=document.createElement("canvas"),e=this._userNode||document.body;e.appendChild(c);var f=new d.Graphics(c,this,!1);this._elements.push(f);for(var g in d.prototype)f.hasOwnProperty(g)||(f[g]="function"==typeof d.prototype[g]?d.prototype[g].bind(f):d.prototype[g]);return f.resize(a,b),f._applyDefaults(),f},d.prototype.blendMode=function(a){if(a!==c.BLEND&&a!==c.DARKEST&&a!==c.LIGHTEST&&a!==c.DIFFERENCE&&a!==c.MULTIPLY&&a!==c.EXCLUSION&&a!==c.SCREEN&&a!==c.REPLACE&&a!==c.OVERLAY&&a!==c.HARD_LIGHT&&a!==c.SOFT_LIGHT&&a!==c.DODGE&&a!==c.BURN&&a!==c.ADD&&a!==c.NORMAL)throw new Error("Mode "+a+" not recognized.");this.drawingContext.globalCompositeOperation=a},d}({},amdclean.core,amdclean.constants),amdclean.shape2d_primitives=function(a,b,c,d){"use strict";function e(a,b,c){for(var d=2*Math.PI,e=[],g=Math.PI/2,i=c>b?1:-1,j=b,k=Math.min(d,Math.abs(c-b));k>h;){var l=j+i*Math.min(k,g);e.push(f(a,j,l)),k-=Math.abs(l-j),j=l}return e}function f(a,b,c){var d=(c-b)/2,e=a*Math.cos(d),f=a*Math.sin(d),g=e,h=-f,i=.5522847498,j=i*Math.tan(d),k=g+j*f,l=h+j*e,m=k,n=-l,o=d+b,p=Math.cos(o),q=Math.sin(o);return{x1:a*Math.cos(b),y1:a*Math.sin(b),x2:k*p-l*q,y2:k*q+l*p,x3:m*p-n*q,y3:m*q+n*p,x4:a*Math.cos(c),y4:a*Math.sin(c)}}var g=b,c=c,d=d,h=1e-5;return g.prototype.arc=function(a,b,f,g,h,i,j){if(this._doStroke||this._doFill){this._angleMode===d.DEGREES&&(h=this.radians(h),i=this.radians(i));var k=this.drawingContext,l=c.arcModeAdjust(a,b,f,g,this._ellipseMode),m=e(1,h,i),n=l.w/2,o=l.h/2;return k.beginPath(),m.forEach(function(a,b){0===b&&k.moveTo(l.x+a.x1*n,l.y+a.y1*o),k.bezierCurveTo(l.x+a.x2*n,l.y+a.y2*o,l.x+a.x3*n,l.y+a.y3*o,l.x+a.x4*n,l.y+a.y4*o)}),this._doFill&&((j===d.PIE||null==j)&&k.lineTo(l.x,l.y),k.closePath(),k.fill(),this._doStroke&&(j===d.CHORD||j===d.PIE))?(k.stroke(),this):(this._doStroke&&(j===d.OPEN||null==j)&&(k.beginPath(),m.forEach(function(a,b){0===b&&k.moveTo(l.x+a.x1*n,l.y+a.y1*o),k.bezierCurveTo(l.x+a.x2*n,l.y+a.y2*o,l.x+a.x3*n,l.y+a.y3*o,l.x+a.x4*n,l.y+a.y4*o)}),k.stroke()),this)}},g.prototype.ellipse=function(a,b,d,e){if(this._doStroke||this._doFill){d=Math.abs(d),e=Math.abs(e);var f=this.drawingContext,g=c.modeAdjust(a,b,d,e,this._ellipseMode);if(f.beginPath(),d===e)f.arc(g.x+g.w/2,g.y+g.w/2,g.w/2,0,2*Math.PI,!1);else{var h=.5522848,i=g.w/2*h,j=g.h/2*h,k=g.x+g.w,l=g.y+g.h,m=g.x+g.w/2,n=g.y+g.h/2;f.moveTo(g.x,n),f.bezierCurveTo(g.x,n-j,m-i,g.y,m,g.y),f.bezierCurveTo(m+i,g.y,k,n-j,k,n),f.bezierCurveTo(k,n+j,m+i,l,m,l),f.bezierCurveTo(m-i,l,g.x,n+j,g.x,n),f.closePath()}return this._doFill&&f.fill(),this._doStroke&&f.stroke(),this}},g.prototype.line=function(a,b,c,d){if(this._doStroke){var e=this.drawingContext;if("rgba(0,0,0,0)"!==e.strokeStyle)return e.beginPath(),e.moveTo(a,b),e.lineTo(c,d),e.stroke(),this}},g.prototype.point=function(a,b){if(this._doStroke){var c=this.drawingContext,e=c.strokeStyle,f=c.fillStyle;if("rgba(0,0,0,0)"!==e)return a=Math.round(a),b=Math.round(b),c.fillStyle=e,c.lineWidth>1?(c.beginPath(),c.arc(a,b,c.lineWidth/2,0,d.TWO_PI,!1),c.fill()):c.fillRect(a,b,1,1),c.fillStyle=f,this}},g.prototype.quad=function(a,b,c,d,e,f,g,h){if(this._doStroke||this._doFill){var i=this.drawingContext;return i.beginPath(),i.moveTo(a,b),i.lineTo(c,d),i.lineTo(e,f),i.lineTo(g,h),i.closePath(),this._doFill&&i.fill(),this._doStroke&&i.stroke(),this}},g.prototype.rect=function(a,b,d,e,f,g,h,i){if(this._doStroke||this._doFill){var j=c.modeAdjust(a,b,d,e,this._rectMode),k=this.drawingContext;if(this._doStroke&&k.lineWidth%2===1&&k.translate(.5,.5),k.beginPath(),"undefined"==typeof f)k.rect(j.x,j.y,j.w,j.h);else{"undefined"==typeof g&&(g=f),"undefined"==typeof h&&(h=g),"undefined"==typeof i&&(i=h);var l=j.x,m=j.y,n=j.w,o=j.h,p=n/2,q=o/2;2*f>n&&(f=p),2*f>o&&(f=q),2*g>n&&(g=p),2*g>o&&(g=q),2*h>n&&(h=p),2*h>o&&(h=q),2*i>n&&(i=p),2*i>o&&(i=q),k.beginPath(),k.moveTo(l+f,m),k.arcTo(l+n,m,l+n,m+o,g),k.arcTo(l+n,m+o,l,m+o,h),k.arcTo(l,m+o,l,m,i),k.arcTo(l,m,l+n,m,f),k.closePath()}return this._doFill&&k.fill(),this._doStroke&&k.stroke(),this._doStroke&&k.lineWidth%2===1&&k.translate(-.5,-.5),this}},g.prototype.triangle=function(a,b,c,d,e,f){if(this._doStroke||this._doFill){var g=this.drawingContext;return g.beginPath(),g.moveTo(a,b),g.lineTo(c,d),g.lineTo(e,f),g.closePath(),this._doFill&&g.fill(),this._doStroke&&g.stroke(),this}},g}({},amdclean.core,amdclean.canvas,amdclean.constants),amdclean.shapeattributes=function(a,b,c){"use strict";var d=b,c=c;return d.prototype._rectMode=c.CORNER,d.prototype._ellipseMode=c.CENTER,d.prototype.ellipseMode=function(a){return(a===c.CORNER||a===c.CORNERS||a===c.RADIUS||a===c.CENTER)&&(this._ellipseMode=a),this},d.prototype.noSmooth=function(){return this.drawingContext.mozImageSmoothingEnabled=!1,this.drawingContext.webkitImageSmoothingEnabled=!1,this},d.prototype.rectMode=function(a){return(a===c.CORNER||a===c.CORNERS||a===c.RADIUS||a===c.CENTER)&&(this._rectMode=a),this},d.prototype.smooth=function(){return this.drawingContext.mozImageSmoothingEnabled=!0,this.drawingContext.webkitImageSmoothingEnabled=!0,this},d.prototype.strokeCap=function(a){return(a===c.ROUND||a===c.SQUARE||a===c.PROJECT)&&(this.drawingContext.lineCap=a),this},d.prototype.strokeJoin=function(a){return(a===c.ROUND||a===c.BEVEL||a===c.MITER)&&(this.drawingContext.lineJoin=a),this},d.prototype.strokeWeight=function(a){return this.drawingContext.lineWidth="undefined"==typeof a||0===a?1e-4:a,this},d}({},amdclean.core,amdclean.constants),amdclean.shapecurves=function(a,b){"use strict";var c=b,d=20,e=20;return c.prototype._curveTightness=0,c.prototype.bezier=function(a,b,c,d,e,f,g,h){return this._doStroke?(this.beginShape(),this.vertex(a,b),this.bezierVertex(c,d,e,f,g,h),this.endShape(),this.stroke(),this):void 0},c.prototype.bezierDetail=function(a){return d=a,this},c.prototype.bezierPoint=function(a,b,c,d,e){var f=1-e;return Math.pow(f,3)*a+3*Math.pow(f,2)*e*b+3*f*Math.pow(e,2)*c+Math.pow(e,3)*d},c.prototype.bezierTangent=function(a,b,c,d,e){var f=1-e;return 3*d*Math.pow(e,2)-3*c*Math.pow(e,2)+6*c*f*e-6*b*f*e+3*b*Math.pow(f,2)-3*a*Math.pow(f,2)},c.prototype.curve=function(a,b,c,d,e,f,g,h){return this._doStroke?(this.beginShape(),this.curveVertex(a,b),this.curveVertex(c,d),this.curveVertex(e,f),this.curveVertex(g,h),this.endShape(),this.stroke(),this):void 0},c.prototype.curveDetail=function(a){return e=a,this},c.prototype.curveTightness=function(a){this._setProperty("_curveTightness",a)},c.prototype.curvePoint=function(a,b,c,d,e){var f=e*e*e,g=e*e,h=-.5*f+g-.5*e,i=1.5*f-2.5*g+1,j=-1.5*f+2*g+.5*e,k=.5*f-.5*g;return a*h+b*i+c*j+d*k},c.prototype.curveTangent=function(a,b,c,d,e){var f=e*e,g=-3*f/2+2*e-.5,h=9*f/2-5*e,i=-9*f/2+4*e+.5,j=3*f/2-e;return a*g+b*h+c*i+d*j},c}({},amdclean.core),amdclean.shapevertex=function(a,b,c){"use strict";var d=b,c=c,e=null,f=[],g=[],h=!1,i=!1,j=!1,k=!1;return d.prototype._doFillStrokeClose=function(){this._doFill&&this.drawingContext.fill(),this._doStroke&&this.drawingContext.stroke(),this.drawingContext.closePath()},d.prototype.beginContour=function(){return g=[],k=!0,this},d.prototype.beginShape=function(a){return e=a===c.POINTS||a===c.LINES||a===c.TRIANGLES||a===c.TRIANGLE_FAN||a===c.TRIANGLE_STRIP||a===c.QUADS||a===c.QUAD_STRIP?a:null,f=[],g=[],this},d.prototype.bezierVertex=function(){if(0===f.length)throw"vertex() must be used once before calling bezierVertex()";h=!0;for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];return a.isVert=!1,k?g.push(a):f.push(a),this},d.prototype.curveVertex=function(a,b){return i=!0,this.vertex(a,b),this},d.prototype.endContour=function(){var a=g[0].slice();a.isVert=g[0].isVert,a.moveTo=!1,g.push(a),f.push(f[0]);for(var b=0;b<g.length;b++)f.push(g[b]);return this},d.prototype.endShape=function(a){if(0===f.length)return this;if(!this._doStroke&&!this._doFill)return this;var b,d=a===c.CLOSE;d&&!k&&f.push(f[0]);var g,l,m=f.length;if(!i||e!==c.POLYGON&&null!==e)if(!h||e!==c.POLYGON&&null!==e)if(!j||e!==c.POLYGON&&null!==e)if(e===c.POINTS)for(g=0;m>g;g++)b=f[g],this._doStroke&&this.stroke(b[6]),this.point(b[0],b[1]);else if(e===c.LINES)for(g=0;m>g+1;g+=2)b=f[g],this._doStroke&&this.stroke(f[g+1][6]),this.line(b[0],b[1],f[g+1][0],f[g+1][1]);else if(e===c.TRIANGLES)for(g=0;m>g+2;g+=3)b=f[g],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0],b[1]),this.drawingContext.lineTo(f[g+1][0],f[g+1][1]),this.drawingContext.lineTo(f[g+2][0],f[g+2][1]),this.drawingContext.lineTo(b[0],b[1]),this._doFill&&(this.fill(f[g+2][5]),this.drawingContext.fill()),this._doStroke&&(this.stroke(f[g+2][6]),this.drawingContext.stroke()),this.drawingContext.closePath();else if(e===c.TRIANGLE_STRIP)for(g=0;m>g+1;g++)b=f[g],this.drawingContext.beginPath(),this.drawingContext.moveTo(f[g+1][0],f[g+1][1]),this.drawingContext.lineTo(b[0],b[1]),this._doStroke&&this.stroke(f[g+1][6]),this._doFill&&this.fill(f[g+1][5]),m>g+2&&(this.drawingContext.lineTo(f[g+2][0],f[g+2][1]),this._doStroke&&this.stroke(f[g+2][6]),this._doFill&&this.fill(f[g+2][5])),this._doFillStrokeClose();else if(e===c.TRIANGLE_FAN){if(m>2)for(this.drawingContext.beginPath(),this.drawingContext.moveTo(f[0][0],f[0][1]),this.drawingContext.lineTo(f[1][0],f[1][1]),this.drawingContext.lineTo(f[2][0],f[2][1]),this._doFill&&this.fill(f[2][5]),this._doStroke&&this.stroke(f[2][6]),this._doFillStrokeClose(),g=3;m>g;g++)b=f[g],this.drawingContext.beginPath(),this.drawingContext.moveTo(f[0][0],f[0][1]),this.drawingContext.lineTo(f[g-1][0],f[g-1][1]),this.drawingContext.lineTo(b[0],b[1]),this._doFill&&this.fill(b[5]),this._doStroke&&this.stroke(b[6]),this._doFillStrokeClose()}else if(e===c.QUADS)for(g=0;m>g+3;g+=4){for(b=f[g],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0],b[1]),l=1;4>l;l++)this.drawingContext.lineTo(f[g+l][0],f[g+l][1]);this.drawingContext.lineTo(b[0],b[1]),this._doFill&&this.fill(f[g+3][5]),this._doStroke&&this.stroke(f[g+3][6]),this._doFillStrokeClose()}else if(e===c.QUAD_STRIP){if(m>3)for(g=0;m>g+1;g+=2)b=f[g],this.drawingContext.beginPath(),m>g+3?(this.drawingContext.moveTo(f[g+2][0],f[g+2][1]),this.drawingContext.lineTo(b[0],b[1]),this.drawingContext.lineTo(f[g+1][0],f[g+1][1]),this.drawingContext.lineTo(f[g+3][0],f[g+3][1]),this._doFill&&this.fill(f[g+3][5]),this._doStroke&&this.stroke(f[g+3][6])):(this.drawingContext.moveTo(b[0],b[1]),this.drawingContext.lineTo(f[g+1][0],f[g+1][1])),this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),this.drawingContext.moveTo(f[0][0],f[0][1]),g=1;m>g;g++)b=f[g],b.isVert&&(b.moveTo?this.drawingContext.moveTo(b[0],b[1]):this.drawingContext.lineTo(b[0],b[1]));this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),g=0;m>g;g++)f[g].isVert?f[g].moveTo?this.drawingContext.moveTo([0],f[g][1]):this.drawingContext.lineTo(f[g][0],f[g][1]):this.drawingContext.quadraticCurveTo(f[g][0],f[g][1],f[g][2],f[g][3]);this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),g=0;m>g;g++)f[g].isVert?f[g].moveTo?this.drawingContext.moveTo(f[g][0],f[g][1]):this.drawingContext.lineTo(f[g][0],f[g][1]):this.drawingContext.bezierCurveTo(f[g][0],f[g][1],f[g][2],f[g][3],f[g][4],f[g][5]);this._doFillStrokeClose()}else if(m>3){var n=[],o=1-this._curveTightness;for(this.drawingContext.beginPath(),this.drawingContext.moveTo(f[1][0],f[1][1]),g=1;m>g+2;g++)b=f[g],n[0]=[b[0],b[1]],n[1]=[b[0]+(o*f[g+1][0]-o*f[g-1][0])/6,b[1]+(o*f[g+1][1]-o*f[g-1][1])/6],n[2]=[f[g+1][0]+(o*f[g][0]-o*f[g+2][0])/6,f[g+1][1]+(o*f[g][1]-o*f[g+2][1])/6],n[3]=[f[g+1][0],f[g+1][1]],this.drawingContext.bezierCurveTo(n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]);d&&this.drawingContext.lineTo(f[g+1][0],f[g+1][1]),this._doFillStrokeClose()}return i=!1,h=!1,j=!1,k=!1,d&&f.pop(),this},d.prototype.quadraticVertex=function(a,b,d,e){if(this._contourInited){var h={};return h.x=a,h.y=b,h.x3=d,h.y3=e,h.type=c.QUADRATIC,this._contourVertices.push(h),this}if(!(f.length>0))throw"vertex() must be used once before calling quadraticVertex()";j=!0;for(var i=[],l=0;l<arguments.length;l++)i[l]=arguments[l];return i.isVert=!1,k?g.push(i):f.push(i),this},d.prototype.vertex=function(a,b,c){var d=[];return d.isVert=!0,d[0]=a,d[1]=b,d[2]=0,d[3]=0,d[4]=0,d[5]=this.drawingContext.fillStyle,d[6]=this.drawingContext.strokeStyle,c&&(d.moveTo=c),k?(0===g.length&&(d.moveTo=!0),g.push(d)):f.push(d),this},d}({},amdclean.core,amdclean.constants),amdclean.structure=function(a,b){"use strict";var c=b;return c.prototype.exit=function(){throw"exit() not implemented, see remove()"},c.prototype.noLoop=function(){this._loop=!1,this._drawInterval&&clearInterval(this._drawInterval)},c.prototype.loop=function(){this._loop=!0,this._draw()},c.prototype.push=function(){this.drawingContext.save(),this._styles.push({doStroke:this._doStroke,doFill:this._doFill,tint:this._tint,imageMode:this._imageMode,rectMode:this._rectMode,ellipseMode:this._ellipseMode,colorMode:this._colorMode,textFont:this.textFont,textLeading:this.textLeading,textSize:this.textSize,textStyle:this.textStyle})},c.prototype.pop=function(){this.drawingContext.restore();var a=this._styles.pop();this._doStroke=a.doStroke,this._doFill=a.doFill,this._tint=a.tint,this._imageMode=a.imageMode,this._rectMode=a.rectMode,this._ellipseMode=a.ellipseMode,this._colorMode=a.colorMode,this.textFont=a.textFont,this.textLeading=a.textLeading,this.textSize=a.textSize,this.textStyle=a.textStyle},c.prototype.pushStyle=function(){throw new Error("pushStyle() not used, see push()")},c.prototype.popStyle=function(){throw new Error("popStyle() not used, see pop()")},c.prototype.redraw=function(){var a=this.setup||window.setup,b=this.draw||window.draw;"function"==typeof b&&(this.push(),"undefined"==typeof a&&this.scale(this._pixelDensity,this._pixelDensity),this._registeredMethods.pre.forEach(function(a){a.call(this)}),b(),this._registeredMethods.post.forEach(function(a){a.call(this)}),this.pop())},c.prototype.size=function(){throw"size() not implemented, see createCanvas()"},c}({},amdclean.core),amdclean.transform=function(a,b,c){"use strict";var d=b,c=c;return d.prototype.applyMatrix=function(a,b,c,d,e,f){return this.drawingContext.transform(a,b,c,d,e,f),this},d.prototype.popMatrix=function(){throw new Error("popMatrix() not used, see pop()")},d.prototype.printMatrix=function(){throw new Error("printMatrix() not implemented")},d.prototype.pushMatrix=function(){throw new Error("pushMatrix() not used, see push()")
},d.prototype.resetMatrix=function(){return this.drawingContext.setTransform(1,0,0,1,0,0),this},d.prototype.rotate=function(a){return this._angleMode===c.DEGREES&&(a=this.radians(a)),this.drawingContext.rotate(a),this},d.prototype.rotateX=function(){throw"not yet implemented"},d.prototype.rotateY=function(){throw"not yet implemented"},d.prototype.scale=function(){var a=1,b=1;return 1===arguments.length?a=b=arguments[0]:(a=arguments[0],b=arguments[1]),this.drawingContext.scale(a,b),this},d.prototype.shearX=function(a){return this._angleMode===c.DEGREES&&(a=this.radians(a)),this.drawingContext.transform(1,0,this.tan(a),1,0,0),this},d.prototype.shearY=function(a){return this._angleMode===c.DEGREES&&(a=this.radians(a)),this.drawingContext.transform(1,this.tan(a),0,1,0,0),this},d.prototype.translate=function(a,b){return this.drawingContext.translate(a,b),this},d}({},amdclean.core,amdclean.constants,amdclean.outputtext_area),amdclean.typographyattributes=function(a,b,c){"use strict";var d=b,c=c;return d.prototype._textLeading=15,d.prototype._textFont="sans-serif",d.prototype._textSize=12,d.prototype._textStyle=c.NORMAL,d.prototype._textAscent=null,d.prototype._textDescent=null,d.prototype.textAlign=function(a,b){(a===c.LEFT||a===c.RIGHT||a===c.CENTER)&&(this.drawingContext.textAlign=a),(b===c.TOP||b===c.BOTTOM||b===c.CENTER||b===c.BASELINE)&&(this.drawingContext.textBaseline=b)},d.prototype.textLeading=function(a){this._setProperty("_textLeading",a)},d.prototype.textSize=function(a){this._setProperty("_textSize",a),this._setProperty("_textLeading",1.25*a),this._applyTextProperties()},d.prototype.textStyle=function(a){(a===c.NORMAL||a===c.ITALIC||a===c.BOLD)&&(this._setProperty("_textStyle",a),this._applyTextProperties())},d.prototype.textWidth=function(a){return this.drawingContext.measureText(a).width},d.prototype.textAscent=function(){return null==this._textAscent&&this._updateTextMetrics(),this._textAscent},d.prototype.textDescent=function(){return null==this._textDescent&&this._updateTextMetrics(),this._textDescent},d.prototype._applyTextProperties=function(){this._setProperty("_textAscent",null),this._setProperty("_textDescent",null);var a=this._textStyle+" "+this._textSize+"px "+this._textFont;this.drawingContext.font=a},d.prototype._updateTextMetrics=function(){var a=document.createElement("span");a.style.fontFamily=this._textFont,a.style.fontSize=this._textSize+"px",a.innerHTML="ABCjgq|";var b=document.createElement("div");b.style.display="inline-block",b.style.width="1px",b.style.height="0px";var c=document.createElement("div");c.appendChild(a),c.appendChild(b),c.style.height="0px",c.style.overflow="hidden",document.body.appendChild(c),b.style.verticalAlign="baseline";var d=this._calculateOffset(b),e=this._calculateOffset(a),f=d[1]-e[1];b.style.verticalAlign="bottom",d=this._calculateOffset(b),e=this._calculateOffset(a);var g=d[1]-e[1],h=g-f;document.body.removeChild(c),this._setProperty("_textAscent",f),this._setProperty("_textDescent",h)},d.prototype._calculateOffset=function(a){var b=0,c=0;if(a.offsetParent){do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent)}else b+=a.offsetLeft,c+=a.offsetTop;return[b,c]},d}({},amdclean.core,amdclean.constants),amdclean.typographyloading_displaying=function(a,b){"use strict";var c=b;return c.prototype.text=function(a,b,c,d,e){"string"!=typeof a&&(a=a.toString()),"undefined"!=typeof d&&(c+=this._textLeading,e+=c),a=a.replace(/(\t)/g,"  ");for(var f=a.split("\n"),g=0;g<f.length;g++){for(var h="",i=f[g].split(" "),j=0;j<i.length;j++)if(c+this._textLeading<=e||"undefined"==typeof e){var k=h+i[j]+" ",l=this.drawingContext.measureText(k),m=l.width;"undefined"!=typeof d&&m>d?(this._doFill&&this.drawingContext.fillText(h,b,c),this._doStroke&&this.drawingContext.strokeText(h,b,c),h=i[j]+" ",c+=this._textLeading):h=k}this._doFill&&this.drawingContext.fillText(h,b,c),this._doStroke&&this.drawingContext.strokeText(h,b,c),c+=this._textLeading}},c.prototype.textFont=function(a){this._setProperty("_textFont",a),this._applyTextProperties()},c}({},amdclean.core),amdclean.src_app=function(a,b){"use strict";var c=b,d=function(){window.PHANTOMJS||window.mocha||(window.setup&&"function"==typeof window.setup||window.draw&&"function"==typeof window.draw)&&new c};return"complete"===document.readyState?d():window.addEventListener("load",d,!1),c}({},amdclean.core,amdclean.p5Color,amdclean.p5Element,amdclean.p5Graphics,amdclean.p5Image,amdclean.p5File,amdclean.p5Vector,amdclean.p5TableRow,amdclean.p5Table,amdclean.colorcreating_reading,amdclean.colorsetting,amdclean.constants,amdclean.dataconversion,amdclean.dataarray_functions,amdclean.datastring_functions,amdclean.environment,amdclean.imageimage,amdclean.imageloading_displaying,amdclean.imagepixels,amdclean.inputfiles,amdclean.inputkeyboard,amdclean.inputacceleration,amdclean.inputmouse,amdclean.inputtime_date,amdclean.inputtouch,amdclean.mathmath,amdclean.mathcalculation,amdclean.mathrandom,amdclean.mathnoise,amdclean.mathtrigonometry,amdclean.outputfiles,amdclean.outputimage,amdclean.outputtext_area,amdclean.renderingrendering,amdclean.shape2d_primitives,amdclean.shapeattributes,amdclean.shapecurves,amdclean.shapevertex,amdclean.structure,amdclean.transform,amdclean.typographyattributes,amdclean.typographyloading_displaying),amdclean.src_app});
/*! p5.dom.js v0.2.2 May 30, 2015 */
/**
 * <p>The web is much more than just canvas and p5.dom makes it easy to interact
 * with other HTML5 objects, including text, hyperlink, image, input, video,
 * audio, and webcam.</p>
 * <p>There is a set of creation methods, DOM manipulation methods, and
 * an extended p5.Element that supports a range of HTML elements. See the
 * <a href="https://github.com/processing/p5.js/wiki/Beyond-the-canvas">
 * beyond the canvas tutorial</a> for a full overview of how this addon works.
 *
 * <p>Methods and properties shown in black are part of the p5.js core, items in
 * blue are part of the p5.dom library. You will need to include an extra file
 * in order to access the blue functions. See the
 * <a href="http://p5js.org/libraries/#using-a-library">using a library</a>
 * section for information on how to include this library. p5.dom comes with
 * <a href="http://p5js.org/download">p5 complete</a> or you can download the single file
 * <a href="https://raw.githubusercontent.com/lmccart/p5.js/master/lib/addons/p5.dom.js">
 * here</a>.</p>
 * <p>See <a href="https://github.com/processing/p5.js/wiki/Beyond-the-canvas">tutorial: beyond the canvas]</a>
 * for more info on how to use this libary.</a>
 *
 * @module p5.dom
 * @submodule p5.dom
 * @for p5.dom
 * @main
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define('p5.dom', ['p5'], function (p5) { (factory(p5));});
  else if (typeof exports === 'object')
    factory(require('../p5'));
  else
    factory(root['p5']);
}(this, function (p5) {
// =============================================================================
//                         p5 additions
// =============================================================================

  /**
   * Searches the page for an element with given ID and returns it as
   * a p5.Element. The DOM node itself can be accessed with .elt.
   * Returns null if none found.
   *
   * @method getElement
   * @param  {String} id id of element to search for
   * @return {Object/p5.Element|Null} p5.Element containing node found
   */
  p5.prototype.getElement = function (e) {
    var res = document.getElementById(e);
    if (res) {
      return wrapElement(res);
    } else {
      return null;
    }
  };

  /**
   * Searches the page for elements with given class and returns an
   * array of p5.Elements. The DOM nodes themselves can be accessed
   * with .elt. Returns an empty array if none found.
   *
   * @method getElements
   * @param  {String} class class name of elements to search for
   * @return {Array} array of p5.Element wrapped nodes found
   */
  p5.prototype.getElements = function (e) {
    var arr = [];
    var res = document.getElementsByClassName(e);
    if (res) {
      for (var j = 0; j < res.length; j++) {
        var obj = wrapElement(res[j]);
        arr.push(obj);
      }
    }
    return arr;
  };

  /**
   * Helper function for getElement and getElements.
   */
  function wrapElement(elt) {
    if (elt.tagName === "VIDEO" || elt.tagName === "AUDIO") {
      return new p5.MediaElement(elt);
    } else {
      return new p5.Element(elt);
    }
  }

  /**
   * Removes all elements created by p5, except any canvas / graphics
   * elements created by createCanvas or createGraphics.
   * Event handlers are removed, and element is removed from the DOM.
   * @method removeElements
   * @example
   * <div class='norender'><code>
   * function setup() {
   *   createCanvas(100, 100);
   *   createDiv('this is some text');
   *   createP('this is a paragraph');
   * }
   * function mousePressed() {
   *   removeElements(); // this will remove the div and p, not canvas
   * }
   * </code></div>
   *
   */
  p5.prototype.removeElements = function (e) {
    for (var i=0; i<this._elements.length; i++) {
      if (!(this._elements[i].elt instanceof HTMLCanvasElement)) {
        this._elements[i].remove();
      }
    }
  };

  /**
   * Helpers for create methods.
   */
  function addElement(elt, pInst, media) {
    var node = pInst._userNode ? pInst._userNode : document.body;
    node.appendChild(elt);
    var c = media ? new p5.MediaElement(elt) : new p5.Element(elt);
    pInst._elements.push(c);
    return c;
  }

  /**
   * Creates a &lt;div&gt;&lt;/div&gt; element in the DOM with given inner HTML.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createDiv
   * @param  {String} html inner HTML for element created
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */

  /**
   * Creates a &lt;p&gt;&lt;/p&gt; element in the DOM with given inner HTML. Used
   * for paragraph length text.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createP
   * @param  {String} html inner HTML for element created
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */

  /**
   * Creates a &lt;span&gt;&lt;/span&gt; element in the DOM with given inner HTML.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createSpan
   * @param  {String} html inner HTML for element created
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  var tags = ['div', 'p', 'span'];
  tags.forEach(function(tag) {
    var method = 'create' + tag.charAt(0).toUpperCase() + tag.slice(1);
    p5.prototype[method] = function(html) {
      var elt = document.createElement(tag);
      elt.innerHTML = typeof html === undefined ? "" : html;
      return addElement(elt, this);
    }
  });

  /**
   * Creates an &lt;img /&gt; element in the DOM with given src and
   * alternate text.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createImg
   * @param  {String} src src path or url for image
   * @param  {String} alt alternate text to be used if image does not
   *                  load
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createImg = function(src, alt) {
    var elt = document.createElement('img');
    elt.src = src;
    if (typeof alt !== 'undefined') {
      elt.alt = alt;
    }
    return addElement(elt, this);
  };


  /**
   * Creates an &lt;a&gt;&lt;/a&gt; element in the DOM for including a hyperlink.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createA
   * @param  {String} href       url of page to link to
   * @param  {String} html       inner html of link element to display
   * @param  {String} [target]   target where new link should open,
   *                             could be _blank, _self, _parent, _top.
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createA = function(href, html, target) {
    var elt = document.createElement('a');
    elt.href = href;
    elt.innerHTML = html;
    if (target) elt.target = target;
    return addElement(elt, this);
  };

  /** INPUT **/


  /**
   * Creates a slider &lt;input&gt;&lt;/input&gt; element in the DOM.
   * Use .size() to set the display length of the slider.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createSlider
   * @param  {Number} min minimum value of the slider
   * @param  {Number} max maximum value of the slider
   * @param  {Number} [value] default value of the slider
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createSlider = function(min, max, value, step) {
    var elt = document.createElement('input');
    elt.type = 'range';
    elt.min = min;
    elt.max = max;
    if (step) elt.step = step;
    if (value) elt.value = value;
    return addElement(elt, this);
  };

  /**
   * Creates a &lt;button&gt;&lt;/button&gt; element in the DOM.
   * Use .size() to set the display size of the button.
   * Use .mousePressed() to specify behavior on press.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createButton
   * @param  {String} label label displayed on the button
   * @param  {String} [value] value of the button
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createButton = function(label, value) {
    var elt = document.createElement('button');
    elt.innerHTML = label;
    elt.value = value;
    if (value) elt.value = value;
    return addElement(elt, this);
  };

  /**
   * Creates an &lt;input&gt;&lt;/input&gt; element in the DOM for text input.
   * Use .size() to set the display length of the box.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createInput
   * @param  {Number} [value] default value of the input box
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createInput = function(value) {
    var elt = document.createElement('input');
    elt.type = 'text';
    if (value) elt.value = value;
    return addElement(elt, this);
  };

  /**
   * Creates an &lt;input&gt;&lt;/input&gt; element in the DOM of type 'file'.  
   * This allows users to select local files for use in a sketch.
   * 
   * @method createFileInput
   * @param  {Function} [callback] callback function for when a file loaded
   * @param  {String} [multiple] optional to allow multiple files selected
   * @return {Object/p5.Element} pointer to p5.Element holding created DOM element
   *                           
   */
  p5.prototype.createFileInput = function(callback, multiple) {

    // Is the file stuff supported?
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Yup, we're ok and make an input file selector
      var elt = document.createElement('input');
      elt.type = 'file';

      // If we get a second argument that evaluates to true
      // then we are looking for multiple files
      if (multiple) {
        // Anything gets the job done
        elt.multiple = 'multiple';
      }
     
      // Now let's handle when a file was selected
      elt.addEventListener('change', handleFileSelect, false);

      // Function to handle when a file is selected
      // We're simplifying life and assuming that we always
      // want to load every selected file
      function handleFileSelect(evt) {
        // These are the files
        var files = evt.target.files;
        // Load each one and trigger a callback
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var reader = new FileReader();
          reader.onload = makeLoader(f);
          function makeLoader(theFile) {
            // Making a p5.File object
            var p5file = new p5.File(theFile);
            return function(e) {
              p5file.data = e.target.result;
              callback(p5file);
            };
          };
          
          // Text of data?
          // This should likely be improved
          if (f.type === 'text') {
            reader.readAsText(f);
          } else {
            reader.readAsDataURL(f);
          }
        }
      }
      return addElement(elt, this);
    } else {
      console.log('The File APIs are not fully supported in this browser. Cannot create element.');
    }
  };


  /** VIDEO STUFF **/

  function createMedia(pInst, type, src, callback) {
    var elt = document.createElement(type);
    if (typeof src === 'string') {
      src = [src];
    }
    for (var i=0; i<src.length; i++) {
      var source = document.createElement('source');
      source.src = src[i];
      elt.appendChild(source);
    }
    if (typeof callback !== 'undefined') {
      elt.addEventListener('canplaythrough', function() {
        callback();
      });
    }

    var c = addElement(elt, pInst, true);
    c.loadedmetadata = false;
    // set width and height onload metadata
    elt.addEventListener('loadedmetadata', function() {
      c.width = elt.videoWidth;
      c.height = elt.videoHeight;
      c.loadedmetadata = true;
    });

    return c;
  }
  /**
   * Creates an HTML5 &lt;video&gt; element in the DOM for simple playback
   * of audio/video. Shown by default, can be hidden with .hide()
   * and drawn into canvas using video(). Appends to the container
   * node if one is specified, otherwise appends to body. The first parameter
   * can be either a single string path to a video file, or an array of string
   * paths to different formats of the same video. This is useful for ensuring
   * that your video can play across different browsers, as each supports
   * different formats. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats">this
   * page for further information about supported formats.
   *
   * @method createVideo
   * @param  {String|Array} src  path to a video file, or array of paths for
   *                             supporting different browsers
   * @param  {Object} [callback] callback function to be called upon
   *                             'canplaythrough' event fire, that is, when the
   *                             browser can play the media, and estimates that
   *                             enough data has been loaded to play the media
   *                             up to its end without having to stop for
   *                             further buffering of content
   * @return {Object/p5.Element} pointer to video p5.Element
   */
  p5.prototype.createVideo = function(src, callback) {
    return createMedia(this, 'video', src, callback);
  };

  /** AUDIO STUFF **/

  /**
   * Creates a hidden HTML5 &lt;audio&gt; element in the DOM for simple audio
   * playback. Appends to the container node if one is specified,
   * otherwise appends to body. The first parameter
   * can be either a single string path to a audio file, or an array of string
   * paths to different formats of the same audio. This is useful for ensuring
   * that your audio can play across different browsers, as each supports
   * different formats. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats">this
   * page for further information about supported formats.
   *
   * @method createAudio
   * @param  {String|Array} src  path to an audio file, or array of paths for
   *                             supporting different browsers
   * @param  {Object} [callback] callback function to be called upon
   *                             'canplaythrough' event fire, that is, when the
   *                             browser can play the media, and estimates that
   *                             enough data has been loaded to play the media
   *                             up to its end without having to stop for
   *                             further buffering of content
   * @return {Object/p5.Element} pointer to audio p5.Element
   */
  p5.prototype.createAudio = function(src, callback) {
    return createMedia(this, 'audio', src, callback);
  };


  /** CAMERA STUFF **/

  p5.prototype.VIDEO = 'video';
  p5.prototype.AUDIO = 'audio';

  navigator.getUserMedia  = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

  /**
   * Creates a new &lt;video&gt; element that contains the audio/video feed
   * from a webcam. This can be drawn onto the canvas using video(). More
   * specific properties of the stream can be passing in a Constraints object.
   * See the 
   * <a href="http://w3c.github.io/mediacapture-main/getusermedia.html">W3C 
   * spec</a> for possible properties. Note that not all of these are supported
   * by all browsers.
   *
   * @method createCapture
   * @param  {String/Constant|Object}   type type of capture, either VIDEO or
   *                                    AUDIO if none specified, default both,
   *                                    or a Constraints boject
   * @param  {Function}                 callback function to be called once
   *                                    stream has loaded
   * @return {Object/p5.Element} capture video p5.Element
   * @example
   * <div><class='norender'><code>
   * var capture;
   *
   * function setup() {
   *   createCanvas(480, 120);
   *   capture = createCapture(VIDEO);
   * }
   *
   * function draw() {
   *   image(capture, 0, 0, width, width*capture.height/capture.width);
   *   filter(INVERT);
   * }
   * </code></div>
   * <div><class='norender'><code>
   * function setup() {
   *   createCanvas(480, 120);
   *   var constraints = {
   *     video: {
   *       mandatory: {
   *         minWidth: 1280,
   *         minHeight: 720
   *       },
   *       optional: [
   *         { maxFrameRate: 10 }
   *       ]
   *     },
   *     audio: true
   *   };
   *   createCapture(constraints, function(stream) {
   *     console.log(stream);
   *   });
   * }
   * </code></div>
   */
  p5.prototype.createCapture = function() {
    var useVideo = true;
    var useAudio = true;
    var constraints;
    var cb;
    for (var i=0; i<arguments.length; i++) {
      if (arguments[i] === p5.prototype.VIDEO) {
        useAudio = false;
      } else if (arguments[i] === p5.prototype.AUDIO) {
        useVideo = false;
      } else if (typeof arguments[i] === 'object') {
        constraints = arguments[i];
      } else if (typeof arguments[i] === 'function') {
        cb = arguments[i];
      }
    }

    if (navigator.getUserMedia) {
      var elt = document.createElement('video');

      if (!constraints) {
        constraints = {video: useVideo, audio: useAudio};
      }

      navigator.getUserMedia(constraints, function(stream) {
        elt.src = window.URL.createObjectURL(stream);
        elt.play();
        if (cb) {
          cb(stream);
        }
      }, function(e) { console.log(e); });
    } else {
      throw 'getUserMedia not supported in this browser';
    }
    var c = addElement(elt, this, true);
    c.loadedmetadata = false;
    // set width and height onload metadata
    elt.addEventListener('loadedmetadata', function() {
      c.width = elt.videoWidth;
      c.height = elt.videoHeight;
      c.loadedmetadata = true;
    });
    return c;
  };

  /**
   * Creates element with given tag in the DOM with given content.
   * Appends to the container node if one is specified, otherwise
   * appends to body.
   *
   * @method createElement
   * @param  {String} tag tag for the new element
   * @param  {String} [content] html content to be inserted into the element
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createElement = function(tag, content) {
    var elt = document.createElement(tag);
    if (typeof content !== 'undefined') {
      elt.innerHTML = content;
    }
    return addElement(elt, this);
  };


// =============================================================================
//                         p5.Element additions
// =============================================================================
  /**
   *
   * Adds specified class to the element.
   *
   * @for p5.Element
   * @method addClass
   * @param  {String} class name of class to add
   * @return {p5.Element}
   */
  p5.Element.prototype.addClass = function(c) {
    if (this.elt.className) {
      // PEND don't add class more than once
      //var regex = new RegExp('[^a-zA-Z\d:]?'+c+'[^a-zA-Z\d:]?');
      //if (this.elt.className.search(/[^a-zA-Z\d:]?hi[^a-zA-Z\d:]?/) === -1) {
      this.elt.className = this.elt.className+' '+c;
      //}
    } else {
      this.elt.className = c;
    }
    return this;
  }

  /**
   *
   * Removes specified class from the element.
   *
   * @method removeClass
   * @param  {String} class name of class to remove
   * @return {p5.Element}
   */
  p5.Element.prototype.removeClass = function(c) {
    var regex = new RegExp('(?:^|\\s)'+c+'(?!\\S)');
    this.elt.className = this.elt.className.replace(regex, '');
    this.elt.className = this.elt.className.replace(/^\s+|\s+$/g, ""); //prettify (optional)
    return this;
  }

  /**
   *
   * Attaches the element  as a child to the parent specified.
   * Accepts either a string ID, DOM node, or p5.Element
   *
   * @method child
   * @param  {String|Object} child the ID, DOM node, or p5.Element
   *                         to add to the current element
   * @return {p5.Element}
   * @example
   * <div class='norender'><code>
   * var div0 = createDiv('this is the parent');
   * var div1 = createDiv('this is the child');
   * div0.child(div1); // use p5.Element
   * </code></div>
   * <div class='norender'><code>
   * var div0 = createDiv('this is the parent');
   * var div1 = createDiv('this is the child');
   * div1.id('apples');
   * div0.child('apples'); // use id
   * </code></div>
   * <div class='norender'><code>
   * var div0 = createDiv('this is the parent');
   * var elt = document.getElementById('myChildDiv');
   * div0.child(elt); // use element from page
   * </code></div>
   */
  p5.Element.prototype.child = function(c) {
    if (typeof c === 'string') {
      c = document.getElementById(c);
    } else if (c instanceof p5.Element) {
      c = c.elt;
    }
    this.elt.appendChild(c);
    return this;
  };


  /**
   *
   * If an argument is given, sets the inner HTML of the element,
   * replacing any existing html. If no arguments are given, returns
   * the inner HTML of the element.
   *
   * @for p5.Element
   * @method html
   * @param  {String} [html] the HTML to be placed inside the element
   * @return {p5.Element|String}
   */
  p5.Element.prototype.html = function(html) {
    if (typeof html !== 'undefined') {
      this.elt.innerHTML = html;
      return this;
    } else {
      return this.elt.innerHTML;
    }
  };

  /**
   *
   * Sets the position of the element relative to (0, 0) of the
   * window. Essentially, sets position:absolute and left and top
   * properties of style.
   *
   * @method position
   * @param  {Number} x x-position relative to upper left of window
   * @param  {Number} y y-position relative to upper left of window
   * @return {p5.Element}
   * @example
   * <div><code class='norender'>
   * function setup() {
   *   var cnv = createCanvas(100, 100);
   *   background(0);
   *   // positions canvas 50px to right and 100px
   *   // below upper left corner of the window
   *   cnv.position(50, 100);
   * }
   * </code></div>
   */
  p5.Element.prototype.position = function(x, y) {
    this.elt.style.position = 'absolute';
    var offset = this.elt.getBoundingClientRect();
    //this.elt.style.left = (x-offset.left)+'px';
    //this.elt.style.top = (y-offset.top)+'px';
    this.elt.style.left = x+'px';
    this.elt.style.top = y+'px';
    
    return this;
  };

  /**
   *
   * Sets the given style (css) property of the element with the given value.
   * If no value is specified, returns the value of the given property,
   * or undefined if the property is not.
   *
   * @method style
   * @param  {String} property   property to be set
   * @param  {String} [value]    value to assign to property
   * @return {String|p5.Element} value of property, if no value is specified
   *                             or p5.Element
   * @example
   * <div><code class="norender">
   * var myDiv = createDiv("I like pandas.");
   * myDiv.style("color", "#ff0000");
   * myDiv.style("font-size", "18px");
   * </code></div>
   */
  p5.Element.prototype.style = function(prop, val) {
    if (typeof val === 'undefined') {
      var attrs = prop.split(';');
      for (var i=0; i<attrs.length; i++) {
        var parts = attrs[i].split(':');
        if (parts[0] && parts[1]) {
          this.elt.style[parts[0].trim()] = parts[1].trim();
        }
      }
      // console.log(this.elt.style)
    } else {
      this.elt.style[prop] = val;
    }
    return this;
  };


  /**
   *
   * Adds a new attribute or changes the value of an existing attribute
   * on the specified element. If no value is specified, returns the
   * value of the given attribute, or null if attribute is not set.
   *
   * @method attribute
   * @param  {String} attr       attribute to set
   * @param  {String} [value]    value to assign to attribute
   * @return {String|p5.Element} value of attribute, if no value is
   *                             specified or p5.Element
   * @example
   * <div class="norender"><code>
   * var myDiv = createDiv("I like pandas.");
   *myDiv.attribute("align", "center");
   * </code></div>
   */
  p5.Element.prototype.attribute = function(attr, value) {
    if (typeof value === 'undefined') {
      return this.elt.getAttribute(attr);
    } else {
      this.elt.setAttribute(attr, value);
      return this;
    }
  };


  /**
   * Either returns the value of the element if no arguments
   * given, or sets the value of the element.
   *
   * @method value
   * @param  {String|Number}     [value]
   * @return {String|p5.Element} value of element, if no value is
   *                             specified or p5.Element
   */
  p5.Element.prototype.value = function() {
    if (arguments.length > 0) {
      this.elt.value = arguments[0];
      return this;
    } else {
      if (this.elt.type === 'range') {
        return parseFloat(this.elt.value);
      }
      else return this.elt.value;
    }
  };

  /**
   *
   * Shows the current element. Essentially, setting display:block for the style.
   *
   * @method show
   * @return {p5.Element}
   */
  p5.Element.prototype.show = function() {
    this.elt.style.display = 'block';
    return this;
  };

  /**
   * Hides the current element. Essentially, setting display:none for the style.
   *
   * @method hide
   * @return {p5.Element}
   */
  p5.Element.prototype.hide = function() {
    this.elt.style.display = 'none';
    return this;
  };

  /**
   *
   * Sets the width and height of the element. AUTO can be used to
   * only adjust one dimension.
   *
   * @method size
   * @param  {Number} w width of the element
   * @param  {Number} h height of the element
   * @return {p5.Element}
   */
  p5.Element.prototype.size = function(w, h) {
    var aW = w;
    var aH = h;
    var AUTO = p5.prototype.AUTO;
    if (aW !== AUTO || aH !== AUTO) {
      if (aW === AUTO) {
        aW = h * this.width / this.height;
      } else if (aH === AUTO) {
        aH = w * this.height / this.width;
      }
      // set diff for cnv vs normal div
      if (this.elt instanceof HTMLCanvasElement) {
        var j = {};
        var k  = this.elt.getContext('2d');
        for (var prop in k) {
          j[prop] = k[prop];
        }
        this.elt.setAttribute('width', aW * this._pInst.pixelDensity);
        this.elt.setAttribute('height', aH * this._pInst.pixelDensity);
        this.elt.setAttribute('style', 'width:' + aW + 'px !important; height:' + aH + 'px !important;');
        this._pInst.scale(this._pInst.pixelDensity, this._pInst.pixelDensity);
        for (var prop in j) {
          this.elt.getContext('2d')[prop] = j[prop];
        }
      } else {
        this.elt.style.width = aW+'px !important';
        this.elt.style.height = aH+'px !important';
        this.elt.width = aW;
        this.elt.height = aH;
      }
      this.elt.style.overflow = 'hidden';
      this.width = this.elt.offsetWidth;
      this.height = this.elt.offsetHeight;

      if (this._pInst) { // main canvas associated with p5 instance
        if (this._pInst._curElement.elt === this.elt) {
          this._pInst._setProperty('width', this.elt.offsetWidth);
          this._pInst._setProperty('height', this.elt.offsetHeight);
        }
      }
    }
    return this;
  };

  /**
   * Removes the element and deregisters all listeners.
   * @method remove
   * @example
   * <div class='norender'><code>
   * var myDiv = createDiv('this is some text');
   * myDiv.remove();
   * </code></div>
   */
  p5.Element.prototype.remove = function() {
    // deregister events
    for (var ev in this._events) {
      this.elt.removeEventListener(ev, this._events[ev]);
    }
    if (this.elt.parentNode) {
      this.elt.parentNode.removeChild(this.elt);
    }
    delete(this);
  };



// =============================================================================
//                         p5.MediaElement additions
// =============================================================================


  /**
   * Extends p5.Element to handle audio and video. In addition to the methods
   * of p5.Element, it also contains methods for controlling media. It is not
   * called directly, but p5.MediaElements are created by calling createVideo,
   * createAudio, and createCapture.
   *
   * @class p5.MediaElement
   * @constructor
   * @param {String} elt DOM node that is wrapped
   * @param {Object} [pInst] pointer to p5 instance
   */
  p5.MediaElement = function(elt, pInst) {
    p5.Element.call(this, elt, pInst);


    this._prevTime = 0;
    this._cueIDCounter = 0;
    this._cues = [];

  };
  p5.MediaElement.prototype = Object.create(p5.Element.prototype);




  /**
   * Play an HTML5 media element.
   *
   * @method play
   * @return {p5.Element}
   */
  p5.MediaElement.prototype.play = function() {
    if (this.elt.currentTime === this.elt.duration) {
      this.elt.currentTime = 0;
    }

    if (this.elt.readyState > 1) {
      this.elt.play();
    } else {
      // in Chrome, playback cannot resume after being stopped and must reload
      this.elt.load();
      this.elt.play();
    }
    return this;
  };

  /**
   * Stops an HTML5 media element (sets current time to zero).
   *
   * @method stop
   * @return {p5.Element}
   */
  p5.MediaElement.prototype.stop = function() {
    this.elt.pause();
    this.elt.currentTime = 0;
    return this;
  };

  /**
   * Pauses an HTML5 media element.
   *
   * @method pause
   * @return {p5.Element}
   */
  p5.MediaElement.prototype.pause = function() {
    this.elt.pause();
    return this;
  };

  /**
   * Set 'loop' to true for an HTML5 media element, and starts playing.
   *
   * @method loop
   * @return {p5.Element}
   */
  p5.MediaElement.prototype.loop = function() {
    this.elt.setAttribute('loop', true);
    this.play();
    return this;
  };
  /**
   * Set 'loop' to false for an HTML5 media element. Element will stop
   * when it reaches the end.
   *
   * @method noLoop
   * @return {p5.Element}
   */
  p5.MediaElement.prototype.noLoop = function() {
    this.elt.setAttribute('loop', false);
    return this;
  };


  /**
   * Set HTML5 media element to autoplay or not.
   *
   * @method autoplay
   * @param {Boolean} autoplay whether the element should autoplay
   * @return {p5.Element}
   */
  p5.MediaElement.prototype.autoplay = function(val) {
    this.elt.setAttribute('autoplay', val);
    return this;
  };

  /**
   * Sets volume for this HTML5 media element. If no argument is given,
   * returns the current volume.
   *
   * @param {Number}            [val] volume between 0.0 and 1.0
   * @return {Number|p5.MediaElement} current volume or p5.MediaElement
   * @method volume
   */
  p5.MediaElement.prototype.volume = function(val) {
    if (typeof val === 'undefined') {
      return this.elt.volume;
    } else {
      this.elt.volume = val;
    }
  };

  /**
   * If no arguments are given, returns the current time of the elmeent.
   * If an argument is given the current time of the element is set to it.
   *
   * @method time
   * @param {Number} [time] time to jump to (in seconds)
   * @return {Number|p5.MediaElement} current time (in seconds)
   *                                  or p5.MediaElement
   */
  p5.MediaElement.prototype.time = function(val) {
    if (typeof val === 'undefined') {
      return this.elt.currentTime;
    } else {
      this.elt.currentTime = val;
    }
  };

  /**
   * Returns the duration of the HTML5 media element.
   *
   * @method duration
   * @return {Number} duration
   */
  p5.MediaElement.prototype.duration = function() {
    return this.elt.duration;
  };
  p5.MediaElement.prototype.pixels = [];
  p5.MediaElement.prototype.loadPixels = function() {
    if (this.loadedmetadata) { // wait for metadata for w/h
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.drawingContext = this.canvas.getContext('2d');
      }
      this.drawingContext.drawImage(this.elt, 0, 0, this.width, this.height);
      p5.prototype.loadPixels.call(this);
    }
    return this;
  }
  p5.MediaElement.prototype.updatePixels =  function(x, y, w, h){
    if (this.loadedmetadata) { // wait for metadata
      p5.prototype.updatePixels.call(this, x, y, w, h);
    }
    return this;
  }
  p5.MediaElement.prototype.get = function(x, y, w, h){
    if (this.loadedmetadata) { // wait for metadata
      return p5.prototype.get.call(this, x, y, w, h);
    } else return [0, 0, 0, 255];
  };
  p5.MediaElement.prototype.set = function(x, y, imgOrCol){
    if (this.loadedmetadata) { // wait for metadata
      p5.prototype.set.call(this, x, y, imgOrCol);
    }
  };

  /*** CONNECT TO WEB AUDIO API / p5.sound.js ***/

  /**
   *  Send the audio output of this element to a specified audioNode or
   *  p5.sound object. If no element is provided, connects to p5's master
   *  output. That connection is established when this method is first called.
   *  All connections are removed by the .disconnect() method.
   *  
   *  This method is meant to be used with the p5.sound.js addon library.
   *
   *  @method  connect
   *  @param  {AudioNode|p5.sound object} audioNode AudioNode from the Web
   *                                      Audio API, or an object from the
   *                                      p5.sound library
   */
  p5.MediaElement.prototype.connect = function(obj) {
    var audioContext, masterOutput;

    // if p5.sound exists, same audio context
    if (typeof p5.prototype.getAudioContext === 'function') {
      audioContext = p5.prototype.getAudioContext(); 
      masterOutput = p5.soundOut.input;
    } else {
      try {
        audioContext = obj.context;
        masterOutput = audioContext.destination
      } catch(e) {
        throw 'connect() is meant to be used with Web Audio API or p5.sound.js'
      }
    }

    // create a Web Audio MediaElementAudioSourceNode if none already exists
    if (!this.audioSourceNode) {
      this.audioSourceNode = audioContext.createMediaElementSource(this.elt);

      // connect to master output when this method is first called
      this.audioSourceNode.connect(masterOutput);
    }

    // connect to object if provided
    if (obj) {
      if (obj.input) {
        this.audioSourceNode.connect(obj.input);
      } else {
        this.audioSourceNode.connect(obj);
      }
    }

    // otherwise connect to master output of p5.sound / AudioContext
    else {
      this.audioSourceNode.connect(masterOutput);
    }

  };

  /**
   *  Disconnect all Web Audio routing, including to master output.
   *  This is useful if you want to re-route the output through
   *  audio effects, for example.
   *  
   *  @method  disconnect
   */
  p5.MediaElement.prototype.disconnect = function() {
    if (this.audioSourceNode) {
      this.audioSourceNode.disconnect();
    } else {
      throw 'nothing to disconnect';
    }
  };


  /*** SHOW / HIDE CONTROLS ***/

  /**
   *  Show the default MediaElement controls, as determined by the web browser.
   *
   *  @method  showControls
   */
  p5.MediaElement.prototype.showControls = function() {
    // must set style for the element to show on the page
    this.elt.style['text-align'] = 'inherit';
    this.elt.controls = true;
  };

  /**
   *  Hide the default mediaElement controls.
   *  
   *  @method hideControls
   */
  p5.MediaElement.prototype.hideControls = function() {
    this.elt.controls = false;
  };


  /*** SCHEDULE EVENTS ***/

  /**
   *  Schedule events to trigger every time a MediaElement
   *  (audio/video) reaches a playback cue point.
   *
   *  Accepts a callback function, a time (in seconds) at which to trigger
   *  the callback, and an optional parameter for the callback.
   *
   *  Time will be passed as the first parameter to the callback function,
   *  and param will be the second parameter.
   *
   *
   *  @method  addCue
   *  @param {Number}   time     Time in seconds, relative to this media
   *                             element's playback. For example, to trigger
   *                             an event every time playback reaches two
   *                             seconds, pass in the number 2. This will be
   *                             passed as the first parameter to
   *                             the callback function.
   *  @param {Function} callback Name of a function that will be
   *                             called at the given time. The callback will
   *                             receive time and (optionally) param as its
   *                             two parameters.
   *  @param {Object} [value]    An object to be passed as the
   *                             second parameter to the
   *                             callback function.
   *  @return {Number} id ID of this cue,
   *                      useful for removeCue(id)
   *  @example
   *  <div><code>
   *  function setup() {
   *    background(255,255,255);
   *    
   *    audioEl = createAudio('assets/beat.mp3');
   *    audioEl.showControls();
   *
   *    // schedule three calls to changeBackground
   *    audioEl.addCue(0.5, changeBackground, color(255,0,0) );
   *    audioEl.addCue(1.0, changeBackground, color(0,255,0) );
   *    audioEl.addCue(2.5, changeBackground, color(0,0,255) );
   *    audioEl.addCue(3.0, changeBackground, color(0,255,255) );
   *    audioEl.addCue(4.2, changeBackground, color(255,255,0) );
   *    audioEl.addCue(5.0, changeBackground, color(255,255,0) );
   *  }
   *
   *  function changeBackground(val) {
   *    background(val);
   *  }
   *  </code></div>
   */
  p5.MediaElement.prototype.addCue = function(time, callback, val) {
    var id = this._cueIDCounter++;

    var cue = new Cue(callback, time, id, val);
    this._cues.push(cue);

    if (!this.elt.ontimeupdate) {
      this.elt.ontimeupdate = this._onTimeUpdate.bind(this);
    }

    return id;
  };

  /**
   *  Remove a callback based on its ID. The ID is returned by the
   *  addCue method.
   *
   *  @method removeCue
   *  @param  {Number} id ID of the cue, as returned by addCue
   */
  p5.MediaElement.prototype.removeCue = function(id) {
    for (var i = 0; i < this._cues.length; i++) {
      var cue = this._cues[i];
      if (cue.id === id) {
        this.cues.splice(i, 1);
      }
    }

    if (this._cues.length === 0) {
      this.elt.ontimeupdate = null
    }
  };

  /**
   *  Remove all of the callbacks that had originally been scheduled
   *  via the addCue method.
   *
   *  @method  clearCues
   */
  p5.MediaElement.prototype.clearCues = function() {
    this._cues = [];
    this.elt.ontimeupdate = null;
  };

  // private method that checks for cues to be fired if events
  // have been scheduled using addCue(callback, time).
  p5.MediaElement.prototype._onTimeUpdate = function() {
    var playbackTime = this.time();

    for (var i = 0 ; i < this._cues.length; i++) {
      var callbackTime = this._cues[i].time;
      var val = this._cues[i].val;


      if (this._prevTime < callbackTime && callbackTime <= playbackTime) {

        // pass the scheduled callbackTime as parameter to the callback
        this._cues[i].callback(val);
      }

    }

    this._prevTime = playbackTime;
  };


  // Cue inspired by JavaScript setTimeout, and the
  // Tone.js Transport Timeline Event, MIT License Yotam Mann 2015 tonejs.org
  var Cue = function(callback, time, id, val) {
    this.callback = callback;
    this.time = time;
    this.id = id;
    this.val = val;
  };

// =============================================================================
//                         p5.File
// =============================================================================


  /**
   * Base class for a file
   * Using this for createFileInput
   *
   * @class p5.File
   * @constructor
   * @param {File} file File that is wrapped
   * @param {Object} [pInst] pointer to p5 instance
   */
  p5.File = function(file, pInst) {
    /**
     * Underlying File object. All normal File methods can be called on this.
     *
     * @property file
     */
    this.file = file;

    this._pInst = pInst;

    // Splitting out the file type into two components
    // This makes determining if image or text etc simpler
    var typeList = file.type.split('/');
    /**
     * File type (image, text, etc.)
     *
     * @property type
     */
    this.type = typeList[0];
    /**
     * File subtype (usually the file extension jpg, png, xml, etc.)
     *
     * @property subtype
     */
    this.subtype = typeList[1];
    /**
     * File name
     *
     * @property name
     */
    this.name = file.name;
    /**
     * File size
     *
     * @property size
     */
    this.size = file.size;
    
    // Data not loaded yet
    this.data = undefined;
  };

}));
var Delaunay;

(function() {
  "use strict";

  var EPSILON = 1.0 / 1048576.0;

  function supertriangle(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i, dx, dy, dmax, xmid, ymid;

    for(i = vertices.length; i--; ) {
      if(vertices[i][0] < xmin) xmin = vertices[i][0];
      if(vertices[i][0] > xmax) xmax = vertices[i][0];
      if(vertices[i][1] < ymin) ymin = vertices[i][1];
      if(vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
      [xmid - 20 * dmax, ymid -      dmax],
      [xmid            , ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid -      dmax]
    ];
  }

  function circumcircle(vertices, i, j, k) {
    var x1 = vertices[i][0],
        y1 = vertices[i][1],
        x2 = vertices[j][0],
        y2 = vertices[j][1],
        x3 = vertices[k][0],
        y3 = vertices[k][1],
        fabsy1y2 = Math.abs(y1 - y2),
        fabsy2y3 = Math.abs(y2 - y3),
        xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
      throw new Error("Eek! Coincident points!");

    if(fabsy1y2 < EPSILON) {
      m2  = -((x3 - x2) / (y3 - y2));
      mx2 = (x2 + x3) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (x2 + x1) / 2.0;
      yc  = m2 * (xc - mx2) + my2;
    }

    else if(fabsy2y3 < EPSILON) {
      m1  = -((x2 - x1) / (y2 - y1));
      mx1 = (x1 + x2) / 2.0;
      my1 = (y1 + y2) / 2.0;
      xc  = (x3 + x2) / 2.0;
      yc  = m1 * (xc - mx1) + my1;
    }

    else {
      m1  = -((x2 - x1) / (y2 - y1));
      m2  = -((x3 - x2) / (y3 - y2));
      mx1 = (x1 + x2) / 2.0;
      mx2 = (x2 + x3) / 2.0;
      my1 = (y1 + y2) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
      yc  = (fabsy1y2 > fabsy2y3) ?
        m1 * (xc - mx1) + my1 :
        m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
  }

  function dedup(edges) {
    var i, j, a, b, m, n;

    for(j = edges.length; j; ) {
      b = edges[--j];
      a = edges[--j];

      for(i = j; i; ) {
        n = edges[--i];
        m = edges[--i];

        if((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2);
          edges.splice(i, 2);
          break;
        }
      }
    }
  }

  Delaunay = {
    triangulate: function(vertices, key) {
      var n = vertices.length,
          i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

      /* Bail if there aren't enough vertices to form any triangles. */
      if(n < 3)
        return [];

      /* Slice out the actual vertices from the passed objects. (Duplicate the
       * array even if we don't, though, since we need to make a supertriangle
       * later on!) */
      vertices = vertices.slice(0);

      if(key)
        for(i = n; i--; )
          vertices[i] = vertices[i][key];

      /* Make an array of indices into the vertex array, sorted by the
       * vertices' x-position. */
      indices = new Array(n);

      for(i = n; i--; )
        indices[i] = i;

      indices.sort(function(i, j) {
        return vertices[j][0] - vertices[i][0];
      });

      /* Next, find the vertices of the supertriangle (which contains all other
       * triangles), and append them onto the end of a (copy of) the vertex
       * array. */
      st = supertriangle(vertices);
      vertices.push(st[0], st[1], st[2]);
      
      /* Initialize the open list (containing the supertriangle and nothing
       * else) and the closed list (which is empty since we havn't processed
       * any triangles yet). */
      open   = [circumcircle(vertices, n + 0, n + 1, n + 2)];
      closed = [];
      edges  = [];

      /* Incrementally add each vertex to the mesh. */
      for(i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        /* For each open triangle, check to see if the current point is
         * inside it's circumcircle. If it is, remove the triangle and add
         * it's edges to an edge list. */
        for(j = open.length; j--; ) {
          /* If this point is to the right of this triangle's circumcircle,
           * then this triangle should never get checked again. Remove it
           * from the open list, add it to the closed list, and skip. */
          dx = vertices[c][0] - open[j].x;
          if(dx > 0.0 && dx * dx > open[j].r) {
            closed.push(open[j]);
            open.splice(j, 1);
            continue;
          }

          /* If we're outside the circumcircle, skip this triangle. */
          dy = vertices[c][1] - open[j].y;
          if(dx * dx + dy * dy - open[j].r > EPSILON)
            continue;

          /* Remove the triangle and add it's edges to the edge list. */
          edges.push(
            open[j].i, open[j].j,
            open[j].j, open[j].k,
            open[j].k, open[j].i
          );
          open.splice(j, 1);
        }

        /* Remove any doubled edges. */
        dedup(edges);

        /* Add a new triangle for each edge. */
        for(j = edges.length; j; ) {
          b = edges[--j];
          a = edges[--j];
          open.push(circumcircle(vertices, a, b, c));
        }
      }

      /* Copy any remaining open triangles to the closed list, and then
       * remove any triangles that share a vertex with the supertriangle,
       * building a list of triplets that represent triangles. */
      for(i = open.length; i--; )
        closed.push(open[i]);
      open.length = 0;

      for(i = closed.length; i--; )
        if(closed[i].i < n && closed[i].j < n && closed[i].k < n)
          open.push(closed[i].i, closed[i].j, closed[i].k);

      /* Yay, we're done! */
      return open;
    },
    contains: function(tri, p) {
      /* Bounding box test first, for quick rejections. */
      if((p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
         (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
         (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
         (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1]))
        return null;

      var a = tri[1][0] - tri[0][0],
          b = tri[2][0] - tri[0][0],
          c = tri[1][1] - tri[0][1],
          d = tri[2][1] - tri[0][1],
          i = a * d - b * c;

      /* Degenerate tri. */
      if(i === 0.0)
        return null;

      var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
          v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

      /* If we're outside the tri, fail. */
      if(u < 0.0 || v < 0.0 || (u + v) > 1.0)
        return null;

      return [u, v];
    }
  };

  if(typeof module !== "undefined")
    module.exports = Delaunay;
})();

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );

/*! nouislider - 8.0.2 - 2015-07-06 13:22:09 */

!function(a){if("function"==typeof define&&define.amd)define([],a);else if("object"==typeof exports){var b=require("fs");module.exports=a(),module.exports.css=function(){return b.readFileSync(__dirname+"/nouislider.min.css","utf8")}}else window.noUiSlider=a()}(function(){"use strict";function a(a){return a.filter(function(a){return this[a]?!1:this[a]=!0},{})}function b(a,b){return Math.round(a/b)*b}function c(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.defaultView||c.parentWindow,e=c.documentElement,f=d.pageXOffset;return/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(f=0),{top:b.top+d.pageYOffset-e.clientTop,left:b.left+f-e.clientLeft}}function d(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function e(a){var b=Math.pow(10,7);return Number((Math.round(a*b)/b).toFixed(7))}function f(a,b,c){j(a,b),setTimeout(function(){k(a,b)},c)}function g(a){return Math.max(Math.min(a,100),0)}function h(a){return Array.isArray(a)?a:[a]}function i(a){var b=a.split(".");return b.length>1?b[1].length:0}function j(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function k(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function l(a,b){a.classList?a.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(a.className)}function m(a,b){return 100/(b-a)}function n(a,b){return 100*b/(a[1]-a[0])}function o(a,b){return n(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function p(a,b){return b*(a[1]-a[0])/100+a[0]}function q(a,b){for(var c=1;a>=b[c];)c+=1;return c}function r(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=q(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+o([d,e],c)/m(f,g)}function s(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=q(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],p([d,e],(c-f)*m(f,g))}function t(a,c,d,e){if(100===e)return e;var f,g,h=q(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):c[h-1]?a[h-1]+b(e-a[h-1],c[h-1]):e}function u(a,b,c){var e;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(e="min"===a?0:"max"===a?100:parseFloat(a),!d(e)||!d(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");c.xPct.push(e),c.xVal.push(b[0]),e?c.xSteps.push(isNaN(b[1])?!1:b[1]):isNaN(b[1])||(c.xSteps[0]=b[1])}function v(a,b,c){return b?void(c.xSteps[a]=n([c.xVal[a],c.xVal[a+1]],b)/m(c.xPct[a],c.xPct[a+1])):!0}function w(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)u(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)v(e,this.xNumSteps[e],this)}function x(a,b){if(!d(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function y(a,b){if("object"!=typeof b||Array.isArray(b))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");a.spectrum=new w(b,a.snap,a.dir,a.singleStep)}function z(a,b){if(b=h(b),!Array.isArray(b)||!b.length||b.length>2)throw new Error("noUiSlider: 'start' option is incorrect.");a.handles=b.length,a.start=b}function A(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function B(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function C(a,b){if("lower"===b&&1===a.handles)a.connect=1;else if("upper"===b&&1===a.handles)a.connect=2;else if(b===!0&&2===a.handles)a.connect=3;else{if(b!==!1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");a.connect=0}}function D(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function E(a,b){if(!d(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(a.margin=a.spectrum.getMargin(b),!a.margin)throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function F(a,b){if(!d(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")}function G(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1,a.connect=[0,2,1,3][a.connect];break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function H(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0;a.events={tap:c||f,drag:d,fixed:e,snap:f}}function I(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function J(a){var b,c={margin:0,limit:0,animate:!0,format:U};b={step:{r:!1,t:x},start:{r:!0,t:z},connect:{r:!0,t:C},direction:{r:!0,t:G},snap:{r:!1,t:A},animate:{r:!1,t:B},range:{r:!0,t:y},orientation:{r:!1,t:D},margin:{r:!1,t:E},limit:{r:!1,t:F},behaviour:{r:!0,t:H},format:{r:!1,t:I}};var d={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"};return Object.keys(d).forEach(function(b){void 0===a[b]&&(a[b]=d[b])}),Object.keys(b).forEach(function(d){var e=b[d];if(void 0===a[d]){if(e.r)throw new Error("noUiSlider: '"+d+"' is required.");return!0}e.t(c,a[d])}),c.pips=a.pips,c.style=c.ort?"top":"left",c}function K(a,b,c){var d=a+b[0],e=a+b[1];return c?(0>d&&(e+=Math.abs(d)),e>100&&(d-=e-100),[g(d),g(e)]):[d,e]}function L(a){a.preventDefault();var b,c,d=0===a.type.indexOf("touch"),e=0===a.type.indexOf("mouse"),f=0===a.type.indexOf("pointer"),g=a;return 0===a.type.indexOf("MSPointer")&&(f=!0),d&&(b=a.changedTouches[0].pageX,c=a.changedTouches[0].pageY),(e||f)&&(b=a.clientX+window.pageXOffset,c=a.clientY+window.pageYOffset),g.points=[b,c],g.cursor=e||f,g}function M(a,b){var c=document.createElement("div"),d=document.createElement("div"),e=["-lower","-upper"];return a&&e.reverse(),j(d,T[3]),j(d,T[3]+e[b]),j(c,T[2]),c.appendChild(d),c}function N(a,b,c){switch(a){case 1:j(b,T[7]),j(c[0],T[6]);break;case 3:j(c[1],T[6]);case 2:j(c[0],T[7]);case 0:j(b,T[6])}}function O(a,b,c){var d,e=[];for(d=0;a>d;d+=1)e.push(c.appendChild(M(b,d)));return e}function P(a,b,c){j(c,T[0]),j(c,T[8+a]),j(c,T[4+b]);var d=document.createElement("div");return j(d,T[1]),c.appendChild(d),d}function Q(b,d){function e(a,b,c){if("range"===a||"steps"===a)return M.xVal;if("count"===a){var d,e=100/(b-1),f=0;for(b=[];(d=f++*e)<=100;)b.push(d);a="positions"}return"positions"===a?b.map(function(a){return M.fromStepping(c?M.getStep(a):a)}):"values"===a?c?b.map(function(a){return M.fromStepping(M.getStep(M.toStepping(a)))}):b:void 0}function m(b,c,d){var e=M.direction,f={},g=M.xVal[0],h=M.xVal[M.xVal.length-1],i=!1,j=!1,k=0;return M.direction=0,d=a(d.slice().sort(function(a,b){return a-b})),d[0]!==g&&(d.unshift(g),i=!0),d[d.length-1]!==h&&(d.push(h),j=!0),d.forEach(function(a,e){var g,h,l,m,n,o,p,q,r,s,t=a,u=d[e+1];if("steps"===c&&(g=M.xNumSteps[e]),g||(g=u-t),t!==!1&&void 0!==u)for(h=t;u>=h;h+=g){for(m=M.toStepping(h),n=m-k,q=n/b,r=Math.round(q),s=n/r,l=1;r>=l;l+=1)o=k+l*s,f[o.toFixed(5)]=["x",0];p=d.indexOf(h)>-1?1:"steps"===c?2:0,!e&&i&&(p=0),h===u&&j||(f[m.toFixed(5)]=[h,p]),k=m}}),M.direction=e,f}function n(a,b,c){function e(a){return["-normal","-large","-sub"][a]}function f(a,b,c){return'class="'+b+" "+b+"-"+h+" "+b+e(c[1])+'" style="'+d.style+": "+a+'%"'}function g(a,d){M.direction&&(a=100-a),d[1]=d[1]&&b?b(d[0],d[1]):d[1],i.innerHTML+="<div "+f(a,"noUi-marker",d)+"></div>",d[1]&&(i.innerHTML+="<div "+f(a,"noUi-value",d)+">"+c.to(d[0])+"</div>")}var h=["horizontal","vertical"][d.ort],i=document.createElement("div");return j(i,"noUi-pips"),j(i,"noUi-pips-"+h),Object.keys(a).forEach(function(b){g(b,a[b])}),i}function o(a){var b=a.mode,c=a.density||1,d=a.filter||!1,f=a.values||!1,g=a.stepped||!1,h=e(b,f,g),i=m(c,b,h),j=a.format||{to:Math.round};return I.appendChild(n(i,d,j))}function p(){return G["offset"+["Width","Height"][d.ort]]}function q(a,b){void 0!==b&&(b=Math.abs(b-d.dir)),Object.keys(R).forEach(function(c){var d=c.split(".")[0];a===d&&R[c].forEach(function(a){a(h(B()),b,r(Array.prototype.slice.call(Q)))})})}function r(a){return 1===a.length?a[0]:d.dir?a.reverse():a}function s(a,b,c,e){var f=function(b){return I.hasAttribute("disabled")?!1:l(I,T[14])?!1:(b=L(b),a===S.start&&void 0!==b.buttons&&b.buttons>1?!1:(b.calcPoint=b.points[d.ort],void c(b,e)))},g=[];return a.split(" ").forEach(function(a){b.addEventListener(a,f,!1),g.push([a,f])}),g}function t(a,b){var c,d,e=b.handles||H,f=!1,g=100*(a.calcPoint-b.start)/p(),h=e[0]===H[0]?0:1;if(c=K(g,b.positions,e.length>1),f=y(e[0],c[h],1===e.length),e.length>1){if(f=y(e[1],c[h?0:1],!1)||f)for(d=0;d<b.handles.length;d++)q("slide",d)}else f&&q("slide",h)}function u(a,b){var c=G.getElementsByClassName(T[15]),d=b.handles[0]===H[0]?0:1;c.length&&k(c[0],T[15]),a.cursor&&(document.body.style.cursor="",document.body.removeEventListener("selectstart",document.body.noUiListener));var e=document.documentElement;e.noUiListeners.forEach(function(a){e.removeEventListener(a[0],a[1])}),k(I,T[12]),q("set",d),q("change",d)}function v(a,b){var c=document.documentElement;if(1===b.handles.length&&(j(b.handles[0].children[0],T[15]),b.handles[0].hasAttribute("disabled")))return!1;a.stopPropagation();var d=s(S.move,c,t,{start:a.calcPoint,handles:b.handles,positions:[J[0],J[H.length-1]]}),e=s(S.end,c,u,{handles:b.handles});if(c.noUiListeners=d.concat(e),a.cursor){document.body.style.cursor=getComputedStyle(a.target).cursor,H.length>1&&j(I,T[12]);var f=function(){return!1};document.body.noUiListener=f,document.body.addEventListener("selectstart",f,!1)}}function w(a){var b,e,g=a.calcPoint,h=0;return a.stopPropagation(),H.forEach(function(a){h+=c(a)[d.style]}),b=h/2>g||1===H.length?0:1,g-=c(G)[d.style],e=100*g/p(),d.events.snap||f(I,T[14],300),H[b].hasAttribute("disabled")?!1:(y(H[b],e),q("slide",b),q("set",b),q("change",b),void(d.events.snap&&v(a,{handles:[H[h]]})))}function x(a){var b,c;if(!a.fixed)for(b=0;b<H.length;b+=1)s(S.start,H[b].children[0],v,{handles:[H[b]]});a.tap&&s(S.start,G,w,{handles:H}),a.drag&&(c=[G.getElementsByClassName(T[7])[0]],j(c[0],T[10]),a.fixed&&c.push(H[c[0]===H[0]?1:0].children[0]),c.forEach(function(a){s(S.start,a,v,{handles:H})}))}function y(a,b,c){var e=a!==H[0]?1:0,f=J[0]+d.margin,h=J[1]-d.margin,i=J[0]+d.limit,l=J[1]-d.limit;return H.length>1&&(b=e?Math.max(b,f):Math.min(b,h)),c!==!1&&d.limit&&H.length>1&&(b=e?Math.min(b,i):Math.max(b,l)),b=M.getStep(b),b=g(parseFloat(b.toFixed(7))),b===J[e]?!1:(a.style[d.style]=b+"%",a.previousSibling||(k(a,T[17]),b>50&&j(a,T[17])),J[e]=b,Q[e]=M.fromStepping(b),q("update",e),!0)}function z(a,b){var c,e,f;for(d.limit&&(a+=1),c=0;a>c;c+=1)e=c%2,f=b[e],null!==f&&f!==!1&&("number"==typeof f&&(f=String(f)),f=d.format.from(f),(f===!1||isNaN(f)||y(H[e],M.toStepping(f),c===3-d.dir)===!1)&&q("update",e))}function A(a){var b,c,e=h(a);for(d.dir&&d.handles>1&&e.reverse(),d.animate&&-1!==J[0]&&f(I,T[14],300),b=H.length>1?3:1,1===e.length&&(b=1),z(b,e),c=0;c<H.length;c++)q("set",c)}function B(){var a,b=[];for(a=0;a<d.handles;a+=1)b[a]=d.format.to(Q[a]);return r(b)}function C(){T.forEach(function(a){a&&k(I,a)}),I.innerHTML="",delete I.noUiSlider}function D(){var a=J.map(function(a,b){var c=M.getApplicableStep(a),d=i(String(c[2])),e=Q[b],f=100===a?null:c[2],g=Number((e-c[2]).toFixed(d)),h=0===a?null:g>=c[1]?c[2]:c[0]||!1;return[h,f]});return r(a)}function E(a,b){R[a]=R[a]||[],R[a].push(b),"update"===a.split(".")[0]&&H.forEach(function(a,b){q("update",b)})}function F(a){var b=a.split(".")[0],c=a.substring(b.length);Object.keys(R).forEach(function(a){var d=a.split(".")[0],e=a.substring(d.length);b&&b!==d||c&&c!==e||delete R[a]})}var G,H,I=b,J=[-1,-1],M=d.spectrum,Q=[],R={};if(I.noUiSlider)throw new Error("Slider was already initialized.");return G=P(d.dir,d.ort,I),H=O(d.handles,d.dir,G),N(d.connect,I,H),x(d.events),d.pips&&o(d.pips),{destroy:C,steps:D,on:E,off:F,get:B,set:A}}function R(a,b){if(!a.nodeName)throw new Error("noUiSlider.create requires a single element.");var c=J(b,a),d=Q(a,c);d.set(c.start),a.noUiSlider=d}var S=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},T=["noUi-target","noUi-base","noUi-origin","noUi-handle","noUi-horizontal","noUi-vertical","noUi-background","noUi-connect","noUi-ltr","noUi-rtl","noUi-dragable","","noUi-state-drag","","noUi-state-tap","noUi-active","","noUi-stacking"];w.prototype.getMargin=function(a){return 2===this.xPct.length?n(this.xVal,a):!1},w.prototype.toStepping=function(a){return a=r(this.xVal,this.xPct,a),this.direction&&(a=100-a),a},w.prototype.fromStepping=function(a){return this.direction&&(a=100-a),e(s(this.xVal,this.xPct,a))},w.prototype.getStep=function(a){return this.direction&&(a=100-a),a=t(this.xPct,this.xSteps,this.snap,a),this.direction&&(a=100-a),a},w.prototype.getApplicableStep=function(a){var b=q(a,this.xPct),c=100===a?2:1;return[this.xNumSteps[b-2],this.xVal[b-c],this.xNumSteps[b-c]]},w.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var U={to:function(a){return a.toFixed(2)},from:Number};return{create:R}});