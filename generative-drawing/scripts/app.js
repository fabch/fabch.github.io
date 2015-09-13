//! Custom p5 function
(function(p5){
	if( !p5.prototype.hasOwnProperty('addOptions') ){
		p5.prototype.addOptions = function(datas) { 
		    p5.prototype.options = {
				 width            : datas.width || 800
				,height           : datas.height || 800
				,container        : datas.container || 'body'
				,commandContainer : datas.commandContainer || 'body'
		    }
		}
		p5.prototype.registerMethod('addOptions', p5.prototype.addOptions);
	}
})(p5);
//! Interface
(function(){

	var sketches, links, canvasW, cSketch;
	window.onload = function() {
		canvasW		= document.getElementById('canvasWrapper')
		,sketches   = document.getElementById('sketches')
		,links 		= sketches.getElementsByTagName("a");
		init();
	}

	function init(){
		setLinks(links);

	}

	function setLinks(links){
		_.each(links,function(el,i,l){
			el.addEventListener('click',function(e){
				e.preventDefault();
				if(cSketch) cSketch.remove();

				_.each(links, function(el){ classie.remove( el, 'selected' ) });

				load(el.getAttribute('href'), function(data){ 
					setP5(data.response);
					classie.add( el, 'selected' );
				});
			});
			if(i == 0)  {
				load(el.getAttribute('href'), function(data){ setP5(data.response); });
			}
		})
	}

	function setP5(sketch){
		cSketch = new p5(eval(sketch));

		cSketch.addOptions({ 
			width     : 800
			,height    : 800
			,container : 'canvasWrapper'
			,commandContainer : 'commandBlock'
		});
		cSketch.setup();
	}

	function load(url, callback) {
		var xhr;

		if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
		else {
			var versions = ["MSXML2.XmlHttp.5.0", 
			"MSXML2.XmlHttp.4.0",
			"MSXML2.XmlHttp.3.0", 
			"MSXML2.XmlHttp.2.0",
			"Microsoft.XmlHttp"]

			for(var i = 0, len = versions.length; i < len; i++) {
				try {
					xhr = new ActiveXObject(versions[i]);
					break;
				}
				catch(e){}
		    } // end for
		}

		xhr.onreadystatechange = ensureReadiness;

		function ensureReadiness() {
			if(xhr.readyState < 4) {
				return;
			}

			if(xhr.status !== 200) {
				return;
			}

		    // all is well  
		    if(xhr.readyState === 4) {
		    	callback(xhr);
		    }           
		}

		xhr.open('GET', url, true);
		xhr.send('');
	}

})();