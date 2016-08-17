let Flicker = function(config = {}){ // attach Flicker to global object 

	/*
		INITIALISE THE FLICKER INSTANCE
	*/

	let container = (() => {
		if(config.container) return config.container;
		throw new Error('You must specify a container for the Flicker context');
	})();
	let srcs = (() => {
		let arr = Array.prototype.slice.call(container.querySelectorAll('.sprite')); // get the array of source sprites;
		if(arr.length > 0) return arr;
		throw new Error('Each Flicker context must contain at least one sprite');
	})();

	let canvas = container.querySelector('canvas'); // get the canvas element
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
			throw new Error('Animation can\'t be undefined');
		})(),
		rootPath: config.rootPath || 'flicker/',
		//controls: config.controls || true,
		//playThrough: config.playThrough || true,
		container: container,
		paused: false,
		direction: 'forward',				
		currentFrame: 0,		
		currentSprite: srcs[0].src,				
		play: play,
		reverse: reverse,
		pause: pause,
		wait: wait,
		seek: seek,
		utils: utils,
		_delay: 0
	};
	

	/*
		CORE FUNCTIONALITY
	*/

	// init the controls
	controls.setAttribute('max', fc.animation.frames.length - 1); // init the length of the controls bar
	controls.addEventListener('input', utils.throttle(seek)); // throttle seek function to reduce jank
	
	// advance the flick, either forward or in reverse
	function advance(nf) {
		if(fc.paused) return fc;
		else if (fc.direction === 'forward') {
			if(nf >= fc.animation.frames.length) { // if the animation is over	
				fc.paused = true; // stop the animation
				console.log('animation completed forward');
			}		
			else {
				draw(nf); // draw the next frame
				nf++; // increment nf
			}
		}
		else if (fc.direction === 'reverse') {
			if(nf < 0) { // if the animation is over	
				fc.paused = true; // stop the animation
				console.log('animation completed reverse');
			}		
			else {
				draw(nf); // draw the next frame
				nf--; // decrement nf
			}
		}		
		setTimeout(requestAnimationFrame.bind(null, advance.bind(null, nf)), 1000 / 24); // iterate the draw loop
		return fc; 
	}

	// draw the frame at index nf
	function draw(nf) {
		var src = `${fc.rootPath}${fc.animation.frames[nf].src}`
		var sprite = document.querySelector(`.sprites img[src="${src}"]`); // get sprite
		fc.currentSprite = sprite; // set the Flicker's current sprite to sprite
		fc.currentFrame = nf; // set the Flicker's current frame to nf
		try {
			ctx.drawImage(sprite, fc.animation.frames[nf].x * -1, fc.animation.frames[nf].y * -1); // draw the nf using the sprite source
		}
		catch(e) {
			throw new Error(`Failed to draw image at path '${src}'\r\nThis error usually occurs when the animation tries to draw a sprite which is not within this flicker context; try adding this within your flicker context:\r\n\r\n<img class="sprite" src="${src}" alt=" "/>`);
		}
	}

	// play the flick forward
	function play(nf) {	
		let frame = nf || fc.currentFrame;
		fc.paused = false;
		fc.direction = 'forward';
		advance(frame); // advance to the next frame
		return fc;
	}

	// play the flick in reverse
	function reverse(nf) {	
		let frame = nf || fc.currentFrame;
		fc.paused = false;
		fc.direction = 'reverse';
		advance(frame);	
		return fc;
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
		pause();
		draw(this.getAttribute('value')); // draw the sought frame
		return fc;
	}	

	return fc; // return the flicker config object

};