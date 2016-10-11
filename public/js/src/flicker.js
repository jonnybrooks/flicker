let Flicker = function(config = {}){ // attach Flicker to global object 

	/*
		INITIALISE THE FLICKER INSTANCE
	*/

	let container = (() => {
		if(config.container) return config.container;
		throw new err('UnspecifiedFlickerContextError', 'You must specify a container for the Flicker context');
	})();
	let srcs = (() => {
		let arr = Array.prototype.slice.call(container.querySelectorAll('.sprite')); // get the array of source sprites;
		if(arr.length > 0) return arr;
		throw new err('EmptySpriteFlickerError', 'Each Flicker context must contain at least one sprite');
	})();

	let canvas = container.querySelector('canvas'); // get the canvas element
	let frameDimensions = { w: canvas.getAttribute('width'), h: canvas.getAttribute('height') }; // get the dimensions of the canvas frame
	let ctx = canvas.getContext('2d'); // establish the 2d context	
	let controls = container.querySelector('.controls input'); // get the controls bar

	let utils = {
		// wait on all images to be loaded, then call a callback
		waitOnImages: function(cb) {
			var loaded = []; // images loaded array
			loaded.push = function() { // override default push
				Array.prototype.push.apply(this, arguments); // push elem to array first
				if (this.length >= srcs.length) {
					cb.call(fc); // if all images loaded, call the callback
				}
			}
			for (var i = 0; i < srcs.length; i++) {
				srcs[i].onload = (function cc(_i) { // cc -> check complete image on load
					if (srcs[_i].complete) loaded.push(srcs[_i]); // if the image has finished loading, push to loaded
					else setTimeout(cc.bind(null, _i), 10); // else check again in 10ms
				})(i);
			}
		},
		// simple throttle function	
		throttle: function(fn, threshhold, scope) {
			threshhold || (threshhold = 100);
			var last, deferTimer;
			return function () {
				var context = scope || this;

				var now = +new Date(),
				    args = arguments;
				if (last && now < last + threshhold) {
					// hold on to it
					clearTimeout(deferTimer);
					deferTimer = setTimeout(function () {
						last = now;
						fn.apply(context, args);
					}, threshhold);
				} else {
					last = now;
					fn.apply(context, args);
				}
			}
		}
	}

	let fc = { // fc -> flicker config
		animation: (() => {
			if(config.animation) return config.animation;
			throw new err('AnimationInitialisationError', 'You must initialise the Flicker with the object generated in flicker_map.json - have you run the Flicker package yet?');
		})(),
		rootPath: config.rootPath || 'flicker/', // root path for sprites
		//controls: config.controls || true,
		//playThrough: config.playThrough || true,
		container: container, // flicker cpontext
		paused: false, // is the flicker paused
		direction: 'forwards', // flicker direction
		currentFrame: 0, // current frame in the flicker
		currentSprite: srcs[0].getAttribute('src'), // current sprite sequence
		play: play, // play from given frame
		reverse: reverse, // reverse from given frame
		pause: pause, // pause the flicker
		wait: wait, // wait for seconds
		seek: seek, // seek to specific point
		utils: utils, // utility functions
		on: on, // add event handler helper
		eventHandlers: { // flicker event handlers
			sequenceChange: n => null,
			flickerEnd: n => null
		},
		_advanceRef: null, // timestamp reference to prevent duplicate advancing
		_delay: 0 // pretty primitive delay implementation
	};
	

	/*
		CORE FUNCTIONALITY
	*/

	// init the controls
	controls.setAttribute('max', fc.animation.frames.length - 1); // init the length of the controls bar
	controls.addEventListener('input', utils.throttle(seek)); // throttle seek function to reduce jank
	
	// advance the flick, either forwards or in reverse
	function advance(nf, localRef) {
		if(fc.paused || localRef !== fc._advanceRef) return fc; // if paused, or this loop has been superceded, return
		else if (fc.direction === 'forwards') {
			if(nf >= fc.animation.frames.length) { // if the animation is over	
				fc.paused = true; // stop the animation
				fc.eventHandlers.flickerEnd.call(fc, fc.direction); // emit the flickerEnd event
			}		
			else {
				draw(nf); // draw the next frame
				nf++; // increment nf
			}
		}
		else if (fc.direction === 'reverse') {
			if(nf < 0) { // if the animation is over	
				fc.paused = true; // stop the animation
				fc.eventHandlers.flickerEnd.call(fc, fc.direction); // emit the flickerEnd event
			}		
			else {
				draw(nf); // draw the next frame
				nf--; // decrement nf
			}
		}		
		setTimeout(requestAnimationFrame.bind(null, advance.bind(null, nf, localRef)), 1000 / 24); // iterate the draw loop
		return fc;
	}

	// draw the frame at index nf
	function draw(nf) {
		var src = `${fc.rootPath}${fc.animation.frames[nf].src}`;		
		var sprite = document.querySelector(`.sprites img[src="${src}"]`); // get sprite

		if(fc.currentSprite !== src) { // if the sprite sequence has changed
			fc.eventHandlers.sequenceChange.call(fc, src); // emit the sequenceChange event
		}
		fc.currentSprite = src; // set the Flicker's current sprite to sprite
		fc.currentFrame = nf; // set the Flicker's current frame to nf
		try {
			ctx.drawImage( // draw the nf using the sprite source
				sprite, fc.animation.frames[nf].x, fc.animation.frames[nf].y, frameDimensions.w, frameDimensions.h,
				0, 0, frameDimensions.w, frameDimensions.h 
			); 
			//ctx.drawImage(sprite, fc.animation.frames[nf].x * -1, fc.animation.frames[nf].y * -1); // draw the nf using the sprite source
		}
		catch(e) {
			throw new err('CanvasDrawError', `Failed to draw image at path '${src}'\r\n. Try adding this within your flicker context:\r\n\r\n<img class="sprite" src="${src}" alt=" "/>`);
		}
	}

	// play the flick in the specified direction
	function play(nf = fc.currentFrame, forwards = true) {
		let localRef = new Date(); // create a timestamp for this function
		fc._advanceRef = localRef; // assign localRef to the flicker config		
		fc.paused = false; // play the flicker
		fc.direction = forwards ? 'forwards' : 'reverse'; // set the direction
		advance(nf, localRef); // advance to the next frame
		return fc;
	}

	// syntax sugar for reverse playing
	function reverse(nf) {	
		return play(nf, false);
	}

	// pause the flick
	function pause() {	
		fc.paused = true;
		return fc;
	}

	// wait for seconds before the next flick action
	function wait(seconds) { 
		fc._delay += seconds;	
		return {
			play: function(){
				setTimeout(play, fc._delay*1000);
				return fc;	
			},
			reverse: function(){
				setTimeout(reverse, fc._delay*1000);
				return fc;	
			},
			pause: function(){
				setTimeout(pause, fc._delay*1000);
				return fc;	
			},
			wait: function(){
				setTimeout(wait, fc._delay*1000);
				return fc;	
			}
		}
	}

	// controls the flick using a range slider
	function seek() {
		fc.paused = true;
		draw(this.getAttribute('value')); // draw the sought frame
		return fc;
	}

	// event registration helper
	function on(event, cb) {
		if(event in fc.eventHandlers) return fc.eventHandlers[event] = cb; // if the event exists, register the handler
		throw new err('EventHandlerRegistrationError', `The specified event '${event}' does not exist`);
	}

	// custom error factory
	function err(name, message)	 {
		let e = new Error(message);
		e.name = name;
		return e;
	}

	return fc; // return the flicker config object

};