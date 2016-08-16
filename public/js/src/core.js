(function(w){
	/*
		UTILITY FUNCTIONS
	*/

	let utils = {
		// wait on all images to be loaded, then call a callback
		waitOnImages: function (cb) {
			var loaded = []; // images loaded array
			loaded.push = function () {
				// override default push
				Array.prototype.push.apply(this, arguments); // push elem to array first
				if (this.length >= srcs.length) {
					console.log('loading done');
					cb(Flicker); // if all images loaded, call the callback
				}
			};
			for (var i = 0; i < srcs.length; i++) {
				srcs[i].onload = (function cc(_i) {
					// cc -> check complete image on load
					if (srcs[_i].complete) loaded.push(srcs[_i]); // if the image has finished loading, push to loaded
					else setTimeout(cc.bind(null, _i), 10); // else check again in 10ms
				})(i);
			}
		},
		// simple throttle function
		throttle: function (fn, threshhold, scope) {
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

	/*
		CORE FUNCTIONALITY
	*/

	let canvas = document.querySelector('#flicker canvas'); // get the canvas element
	let ctx = canvas.getContext('2d'); // establish the 2d context
	let srcs = Array.prototype.slice.call(document.querySelectorAll('#flicker .sprites img')); // get the array of source sprites
	let seekInput = document.querySelector('.seek input') // get the seek bar

	let Flicker = { // Flicker config
		animation: {},
		playing: true, 
		forward: true, 
		currentFrame: 0, 
		currentSprite: srcs[0].src, 
		playThrough: true,
		init: init,
		play: play,
		reverse: reverse,
		pause: pause,
		wait: wait,		
		_delay: 0
	}; 

	// initialise the flicker after everything's loaded

	function init(anim, cb) {
		Flicker.animation = anim;
		seekInput.setAttribute('max', Flicker.animation.frames.length - 1); // init the length of the seek bar
		seekInput.addEventListener('input', utils.throttle(seek)); // throttle seek function to reduce jank
		return utils.waitOnImages(cb);
	}

	// advance the flick, either forward or in reverse

	function advance(nf) {
		if(!Flicker.playing) return Flicker;
		else if (Flicker.direction === 'forward') {
			if(nf >= Flicker.animation.frames.length) { // if the animation is over	
				Flicker.playing = false; // stop the animation
				console.log('animation completed forward');
			}		
			else {
				draw(nf); // draw the next frame
				nf++; // increment nf
			}
		}
		else if (Flicker.direction === 'reverse') {
			if(nf < 0) { // if the animation is over	
				Flicker.playing = false; // stop the animation
				console.log('animation completed reverse');
			}		
			else {
				draw(nf); // draw the next frame
				nf--; // decrement nf
			}
		}		
		setTimeout(requestAnimationFrame.bind(null, advance.bind(null, nf)), 1000 / 24); // iterate the draw loop
		return Flicker; 
	}

	// draw the frame at index nf

	function draw(nf) {
		var sprite = document.querySelector(`.sprites img[src="flicker/${[Flicker.animation.frames[nf].src]}"]`); // get sprite
		Flicker.currentSprite = sprite; // set the Flicker's current sprite to sprite
		Flicker.currentFrame = nf; // set the Flicker's current frame to nf	
		ctx.drawImage(sprite, Flicker.animation.frames[nf].x * -1, Flicker.animation.frames[nf].y * -1); // draw the nf using the sprite source	
	}

	// play the flick forward

	function play(nf) {	
		let frame = nf || Flicker.currentFrame;
		Flicker.playing = true;
		Flicker.direction = 'forward';
		advance(frame); // advance to the next frame
		return Flicker;
	}

	// play the flick in reverse

	function reverse(nf) {	
		let frame = nf || Flicker.currentFrame;
		Flicker.playing = true;
		Flicker.direction = 'reverse';
		advance(frame);	
		return Flicker;
	}

	// pause the flick

	function pause() {	
		Flicker.playing = false;	
		return Flicker;
	}

	// wait for seconds before the next flick action

	function wait(seconds) { 
		Flicker._delay += seconds;	
		return {
			play: function(){
				setTimeout(Flicker.play, Flicker._delay*1000);
				return Flicker;	
			},
			reverse: function(){
				setTimeout(Flicker.reverse, Flicker._delay*1000);
				return Flicker;	
			},
			pause: function(){
				setTimeout(Flicker.pause, Flicker._delay*1000);
				return Flicker;	
			},
			wait: function(){
				setTimeout(Flicker.wait, Flicker._delay*1000);
				return Flicker;	
			}
		}
	}

	// seek the flick using a range slider

	function seek() {
		pause();
		draw(this.getAttribute('value')); // draw the sought frame
		return Flicker;
	}

	window.Flicker = Flicker; // attach Flicker to global object

})(window);

// register handlers and begin animation process

let animation = {"frames":[{"src":"sequence001_sprite.jpg","x":0,"y":0},{"src":"sequence001_sprite.jpg","x":1120,"y":0},{"src":"sequence001_sprite.jpg","x":2240,"y":0},{"src":"sequence001_sprite.jpg","x":3360,"y":0},{"src":"sequence001_sprite.jpg","x":4480,"y":0},{"src":"sequence001_sprite.jpg","x":5600,"y":0},{"src":"sequence001_sprite.jpg","x":6720,"y":0},{"src":"sequence001_sprite.jpg","x":7840,"y":0},{"src":"sequence001_sprite.jpg","x":8960,"y":0},{"src":"sequence001_sprite.jpg","x":0,"y":840},{"src":"sequence001_sprite.jpg","x":1120,"y":840},{"src":"sequence001_sprite.jpg","x":2240,"y":840},{"src":"sequence001_sprite.jpg","x":3360,"y":840},{"src":"sequence001_sprite.jpg","x":4480,"y":840},{"src":"sequence001_sprite.jpg","x":5600,"y":840},{"src":"sequence001_sprite.jpg","x":6720,"y":840},{"src":"sequence001_sprite.jpg","x":7840,"y":840},{"src":"sequence001_sprite.jpg","x":8960,"y":840},{"src":"sequence001_sprite.jpg","x":0,"y":1680},{"src":"sequence001_sprite.jpg","x":1120,"y":1680},{"src":"sequence001_sprite.jpg","x":2240,"y":1680},{"src":"sequence001_sprite.jpg","x":3360,"y":1680},{"src":"sequence001_sprite.jpg","x":4480,"y":1680},{"src":"sequence001_sprite.jpg","x":5600,"y":1680},{"src":"sequence001_sprite.jpg","x":6720,"y":1680},{"src":"sequence001_sprite.jpg","x":7840,"y":1680},{"src":"sequence001_sprite.jpg","x":8960,"y":1680},{"src":"sequence001_sprite.jpg","x":0,"y":2520},{"src":"sequence001_sprite.jpg","x":1120,"y":2520},{"src":"sequence001_sprite.jpg","x":2240,"y":2520},{"src":"sequence001_sprite.jpg","x":3360,"y":2520},{"src":"sequence001_sprite.jpg","x":4480,"y":2520},{"src":"sequence001_sprite.jpg","x":5600,"y":2520},{"src":"sequence001_sprite.jpg","x":6720,"y":2520},{"src":"sequence001_sprite.jpg","x":7840,"y":2520},{"src":"sequence001_sprite.jpg","x":8960,"y":2520},{"src":"sequence001_sprite.jpg","x":0,"y":3360},{"src":"sequence001_sprite.jpg","x":1120,"y":3360},{"src":"sequence001_sprite.jpg","x":2240,"y":3360},{"src":"sequence001_sprite.jpg","x":3360,"y":3360},{"src":"sequence001_sprite.jpg","x":4480,"y":3360},{"src":"sequence001_sprite.jpg","x":5600,"y":3360},{"src":"sequence001_sprite.jpg","x":6720,"y":3360},{"src":"sequence001_sprite.jpg","x":7840,"y":3360},{"src":"sequence001_sprite.jpg","x":8960,"y":3360},{"src":"sequence001_sprite.jpg","x":0,"y":4200},{"src":"sequence001_sprite.jpg","x":1120,"y":4200},{"src":"sequence001_sprite.jpg","x":2240,"y":4200},{"src":"sequence001_sprite.jpg","x":3360,"y":4200},{"src":"sequence001_sprite.jpg","x":4480,"y":4200},{"src":"sequence001_sprite.jpg","x":5600,"y":4200},{"src":"sequence001_sprite.jpg","x":6720,"y":4200},{"src":"sequence001_sprite.jpg","x":7840,"y":4200},{"src":"sequence001_sprite.jpg","x":8960,"y":4200},{"src":"sequence001_sprite.jpg","x":0,"y":5040},{"src":"sequence001_sprite.jpg","x":1120,"y":5040},{"src":"sequence001_sprite.jpg","x":2240,"y":5040},{"src":"sequence001_sprite.jpg","x":3360,"y":5040},{"src":"sequence001_sprite.jpg","x":4480,"y":5040},{"src":"sequence001_sprite.jpg","x":5600,"y":5040},{"src":"sequence001_sprite.jpg","x":6720,"y":5040},{"src":"sequence001_sprite.jpg","x":7840,"y":5040},{"src":"sequence001_sprite.jpg","x":8960,"y":5040},{"src":"sequence001_sprite.jpg","x":0,"y":5880},{"src":"sequence001_sprite.jpg","x":1120,"y":5880},{"src":"sequence001_sprite.jpg","x":2240,"y":5880},{"src":"sequence001_sprite.jpg","x":3360,"y":5880},{"src":"sequence001_sprite.jpg","x":4480,"y":5880},{"src":"sequence001_sprite.jpg","x":5600,"y":5880},{"src":"sequence001_sprite.jpg","x":6720,"y":5880},{"src":"sequence001_sprite.jpg","x":7840,"y":5880},{"src":"sequence001_sprite.jpg","x":8960,"y":5880},{"src":"sequence001_sprite.jpg","x":0,"y":6720},{"src":"sequence001_sprite.jpg","x":1120,"y":6720},{"src":"sequence001_sprite.jpg","x":2240,"y":6720},{"src":"sequence001_sprite.jpg","x":3360,"y":6720},{"src":"sequence001_sprite.jpg","x":4480,"y":6720},{"src":"sequence001_sprite.jpg","x":5600,"y":6720},{"src":"sequence002_sprite.jpg","x":0,"y":0},{"src":"sequence002_sprite.jpg","x":1120,"y":0},{"src":"sequence002_sprite.jpg","x":2240,"y":0},{"src":"sequence002_sprite.jpg","x":3360,"y":0},{"src":"sequence002_sprite.jpg","x":4480,"y":0},{"src":"sequence002_sprite.jpg","x":5600,"y":0},{"src":"sequence002_sprite.jpg","x":6720,"y":0},{"src":"sequence002_sprite.jpg","x":7840,"y":0},{"src":"sequence002_sprite.jpg","x":8960,"y":0},{"src":"sequence002_sprite.jpg","x":0,"y":840},{"src":"sequence002_sprite.jpg","x":1120,"y":840},{"src":"sequence002_sprite.jpg","x":2240,"y":840},{"src":"sequence002_sprite.jpg","x":3360,"y":840},{"src":"sequence002_sprite.jpg","x":4480,"y":840},{"src":"sequence002_sprite.jpg","x":5600,"y":840},{"src":"sequence002_sprite.jpg","x":6720,"y":840},{"src":"sequence002_sprite.jpg","x":7840,"y":840},{"src":"sequence002_sprite.jpg","x":8960,"y":840},{"src":"sequence002_sprite.jpg","x":0,"y":1680},{"src":"sequence002_sprite.jpg","x":1120,"y":1680},{"src":"sequence002_sprite.jpg","x":2240,"y":1680},{"src":"sequence002_sprite.jpg","x":3360,"y":1680},{"src":"sequence002_sprite.jpg","x":4480,"y":1680},{"src":"sequence002_sprite.jpg","x":5600,"y":1680},{"src":"sequence002_sprite.jpg","x":6720,"y":1680},{"src":"sequence002_sprite.jpg","x":7840,"y":1680},{"src":"sequence002_sprite.jpg","x":8960,"y":1680},{"src":"sequence002_sprite.jpg","x":0,"y":2520},{"src":"sequence002_sprite.jpg","x":1120,"y":2520},{"src":"sequence002_sprite.jpg","x":2240,"y":2520},{"src":"sequence002_sprite.jpg","x":3360,"y":2520},{"src":"sequence002_sprite.jpg","x":4480,"y":2520},{"src":"sequence002_sprite.jpg","x":5600,"y":2520},{"src":"sequence002_sprite.jpg","x":6720,"y":2520},{"src":"sequence002_sprite.jpg","x":7840,"y":2520},{"src":"sequence002_sprite.jpg","x":8960,"y":2520},{"src":"sequence002_sprite.jpg","x":0,"y":3360},{"src":"sequence002_sprite.jpg","x":1120,"y":3360},{"src":"sequence002_sprite.jpg","x":2240,"y":3360},{"src":"sequence002_sprite.jpg","x":3360,"y":3360},{"src":"sequence002_sprite.jpg","x":4480,"y":3360},{"src":"sequence002_sprite.jpg","x":5600,"y":3360},{"src":"sequence002_sprite.jpg","x":6720,"y":3360},{"src":"sequence002_sprite.jpg","x":7840,"y":3360},{"src":"sequence002_sprite.jpg","x":8960,"y":3360},{"src":"sequence002_sprite.jpg","x":0,"y":4200},{"src":"sequence002_sprite.jpg","x":1120,"y":4200},{"src":"sequence002_sprite.jpg","x":2240,"y":4200},{"src":"sequence002_sprite.jpg","x":3360,"y":4200},{"src":"sequence002_sprite.jpg","x":4480,"y":4200},{"src":"sequence002_sprite.jpg","x":5600,"y":4200},{"src":"sequence002_sprite.jpg","x":6720,"y":4200},{"src":"sequence002_sprite.jpg","x":7840,"y":4200},{"src":"sequence002_sprite.jpg","x":8960,"y":4200},{"src":"sequence002_sprite.jpg","x":0,"y":5040},{"src":"sequence002_sprite.jpg","x":1120,"y":5040},{"src":"sequence002_sprite.jpg","x":2240,"y":5040},{"src":"sequence002_sprite.jpg","x":3360,"y":5040},{"src":"sequence002_sprite.jpg","x":4480,"y":5040},{"src":"sequence002_sprite.jpg","x":5600,"y":5040},{"src":"sequence002_sprite.jpg","x":6720,"y":5040},{"src":"sequence002_sprite.jpg","x":7840,"y":5040},{"src":"sequence002_sprite.jpg","x":8960,"y":5040},{"src":"sequence002_sprite.jpg","x":0,"y":5880},{"src":"sequence002_sprite.jpg","x":1120,"y":5880}]};

Flicker.init(animation, function(){	
	Flicker.play().wait(2).pause().wait(3).reverse(); // start the animation from the beggining (0th frame)
})