//! Commands
var commands = (function(_){

	var _commands       = []
	,_container         = document
	,_commandsContainer = document
	,_zoneClickable     = null
	,_registeredCmd		= {};

	/* PRIVATE
	-----------------------------------------------------------------*/

	function addZoneClickable (){
		var el = document.createElement('div');
		_container.appendChild(el);
		var can = _container.getElementsByTagName('canvas');
		cmd.setAttributes(el, { 'class':'hidden', id:'zoneClickable', style : 'width :' + (can[0].width || 0) +'px; height :' + (can[0].height || 0) + 'px'});
		return el;
	}

	function clickZone(e,action){
	    var handle = document.createElement('i');
	    cmd.setAttributes(handle,{
	    	class : 'fa fa-circle-thin'
	    	,style : 'position : absolute; z-index : 3; line-height : 16px; height : 16px; text-align : center; width :16px; left : ' + (e.offsetX-8) + 'px; top : ' + (e.offsetY-8) + 'px;'
	    })
	    _zoneClickable.appendChild(handle);
	    action(e.offsetX,e.offsetY);
	}

	function toggleZoneClickable(e){
		cmd.setAttributes(e.target.children[0], { class : (e.target.value == 1) ? 'fa fa-eye-slash' : 'fa fa-eye' });
		cmd.setAttributes(_zoneClickable, { class : (e.target.value == 1) ? 'hidden' : '' });
		cmd.setAttributes(e.target, { value : (e.target.value == 1) ? 0 : 1 });
	}

	function cleanClickZone(callback,args){
	    _zoneClickable.innerHTML = '';
	    callback(args);
	}

	function setColor(e,children,callback){

		// Get the slider values,
		// stick them together.
		var r = Math.round(children[0].noUiSlider.get());
		var g = Math.round(children[1].noUiSlider.get());
		var b = Math.round(children[2].noUiSlider.get());
		var color = 'rgb(' + r + ',' + g + ',' + b + ')';

		children[3].style.background = color;
		callback([r,g,b]);
	}

	_registeredCmd = { 'cleanClickZone' : cleanClickZone }

	/* PUBLIC
	-----------------------------------------------------------------*/
	var cmd = {
		setContainer : function(el){
			_container = el;
		}
		,setCommandContainer : function(el){
			_commandsContainer = el;
		}
		,addLabel : function(label){
			var el = document.createElement('label');
			el.innerHTML = label;
			_commandsContainer.appendChild(el);
			_commands.push(el);
			return el;
		}
		,addElement : function(tag,content){
			var el = document.createElement(tag);
			if(content != undefined) el.innerHTML = content;
			_commandsContainer.appendChild(el);
			_commands.push(el);
			return el;
		}
		,setAttributes : function(el,attrs){
			_.each(attrs, function(value,name){ 
				el.setAttribute(name,value);
			});
			return el;
		}
		,cleanCommands : function(){
			_.each(_commands, function(el){
				_commandsContainer.removeChild(el);
			});
			_commands = [];
			if(_zoneClickable instanceof HTMLElement){
				_container.removeChild(_zoneClickable);
				_zoneClickable = null;
			}
		}
		,setCommands : function(objCom){
			_.each(objCom.inputs, function(input){ 
				if(input.label !== undefined) this.addLabel(input.label);
	    		if(input.type !== undefined || input.options !== undefined){
                    if(input.type == 'noUiSlider'){
                    	var el = this.addElement('div');
                        noUiSlider.create(el, input.options);
                        el.noUiSlider.on('change', input.action);
                    } 
                    else if(input.type == 'color'){
						var wrapper = this.addElement('div');
						wrapper.setAttribute('class','colorPicker');
						
						var colors =['red','green','blue'];
						for ( var i = 0; i < 3; i++ ) {
							var s = document.createElement('div');
							s.setAttribute('class',colors[i]);
							wrapper.appendChild(s);
						}

						var preview = document.createElement('div');
						preview.setAttribute('class','colorPreview');
						wrapper.appendChild(preview);

						for ( var i = 0; i < 3; i++ ) {
							noUiSlider.create(wrapper.children[i], {
								start        : input.default[i] || 124
								,connect     : "lower"
								,step        : 1
								,orientation : "horizontal"
								,range       : {
									'min'  : 0
									,'max' : 255
								}
							});
							wrapper.children[i].noUiSlider.on('slide', function(e){ 
								setColor(e, wrapper.children, input.action);
							});
						}
						setColor(null, wrapper.children, input.action);
                	}
                }
	    	}.bind(this));

	    	_.each(objCom.buttons, function(btn,name){ 
                var el = this.addElement('button', btn.content || undefined);
                this.setAttributes(el,btn.attr);
                if(btn.cmd != undefined){
                	el.addEventListener('click', function(e){
                		_registeredCmd[btn.cmd](btn.action);
                	});
                }else{
                	el.addEventListener('click', btn.action);
                }
            }.bind(this));

            _.each(objCom.specials, function(spec,name){ 
                if(spec.type == 'clickZone'){
            		_zoneClickable = addZoneClickable();
            		_zoneClickable.addEventListener('click', function(e){ 
            			clickZone(e, spec.action);
            		});

            		var el = this.addElement('button','<i class="fa fa-eye-slash"></i> Hotspots');
            		this.setAttributes(el,{value : 0 });
            		el.addEventListener('click',function(e){
            			toggleZoneClickable(e);
            		});
                }
            }.bind(this));
		}
	}

	return cmd;
}(_));
//! Interface

var Interface = (function (commands) {

	function InterfaceSingleton(options){
		var options     = options || {}
		,_links         = options.links || []
		,_canvasWrapper = options.canvasWrapper || null
		,_sketch         = null

		,init = function (){
			_.each(_links, function(el){ setLink(el) });
			commands.setContainer(options.canvasWrapper);
			commands.setCommandContainer(options.commandContainer);
			load(_links[0].getAttribute('href'), function(data){ setSketch(data.response); });
		}

		,setLink = function (link){
			link.addEventListener('click',function(e){
				e.preventDefault();
				if(_sketch !== null) _sketch.remove();

				_.each(_links, function(el){ classie.remove( el, 'selected' ) });
				load(link.getAttribute('href'), function(data){ 
					commands.cleanCommands();
					setSketch(data.response);
					classie.add( link, 'selected' );
				});

			});
		}

		,addLink = function (link){
			if(link instanceof HTMLElement) _links.push(link);
		}

		,setSketch = function (response){
			_sketch = new p5(eval(response),options.canvasWrapper);
			commands.setCommands(_sketch.getCommands());
		}

		,load = function (url, callback) {
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
				if(xhr.readyState < 4) return;
				if(xhr.status !== 200) return;
				if(xhr.readyState === 4) callback(xhr);          
			}

			xhr.open('GET', url, true);
			xhr.send('');
		};

		init();

		return {
			name           : 'Interface'
			,links         : _links
			,canvasWrapper : _canvasWrapper
			,addLink	: addLink
		}

	}

	var instance;

	var _static = {

		name: 'Interface',
	    getInstance: function( options ) {
	    	if( instance === undefined ) {
	    		instance = new InterfaceSingleton( options );

	    	}
	    	return instance;
	    }
	};

	return _static;

})(commands);

var interface;

window.onload = function(){
	interface = Interface.getInstance({
		links: Array.prototype.slice.call( document.getElementsByTagName('a') )
		,commandContainer: document.getElementById('commandBlock')
		,canvasWrapper: document.getElementById('canvasWrapper')
		,commandContainer : document.getElementById('commandBlock')
	});
}