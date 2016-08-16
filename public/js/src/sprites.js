"use strict";

let animation = {"frames":[{"src":"sequence001_sprite.jpg","x":0,"y":0},{"src":"sequence001_sprite.jpg","x":1120,"y":0},{"src":"sequence001_sprite.jpg","x":2240,"y":0},{"src":"sequence001_sprite.jpg","x":3360,"y":0},{"src":"sequence001_sprite.jpg","x":4480,"y":0},{"src":"sequence001_sprite.jpg","x":5600,"y":0},{"src":"sequence001_sprite.jpg","x":6720,"y":0},{"src":"sequence001_sprite.jpg","x":7840,"y":0},{"src":"sequence001_sprite.jpg","x":8960,"y":0},{"src":"sequence001_sprite.jpg","x":0,"y":840},{"src":"sequence001_sprite.jpg","x":1120,"y":840},{"src":"sequence001_sprite.jpg","x":2240,"y":840},{"src":"sequence001_sprite.jpg","x":3360,"y":840},{"src":"sequence001_sprite.jpg","x":4480,"y":840},{"src":"sequence001_sprite.jpg","x":5600,"y":840},{"src":"sequence001_sprite.jpg","x":6720,"y":840},{"src":"sequence001_sprite.jpg","x":7840,"y":840},{"src":"sequence001_sprite.jpg","x":8960,"y":840},{"src":"sequence001_sprite.jpg","x":0,"y":1680},{"src":"sequence001_sprite.jpg","x":1120,"y":1680},{"src":"sequence001_sprite.jpg","x":2240,"y":1680},{"src":"sequence001_sprite.jpg","x":3360,"y":1680},{"src":"sequence001_sprite.jpg","x":4480,"y":1680},{"src":"sequence001_sprite.jpg","x":5600,"y":1680},{"src":"sequence001_sprite.jpg","x":6720,"y":1680},{"src":"sequence001_sprite.jpg","x":7840,"y":1680},{"src":"sequence001_sprite.jpg","x":8960,"y":1680},{"src":"sequence001_sprite.jpg","x":0,"y":2520},{"src":"sequence001_sprite.jpg","x":1120,"y":2520},{"src":"sequence001_sprite.jpg","x":2240,"y":2520},{"src":"sequence001_sprite.jpg","x":3360,"y":2520},{"src":"sequence001_sprite.jpg","x":4480,"y":2520},{"src":"sequence001_sprite.jpg","x":5600,"y":2520},{"src":"sequence001_sprite.jpg","x":6720,"y":2520},{"src":"sequence001_sprite.jpg","x":7840,"y":2520},{"src":"sequence001_sprite.jpg","x":8960,"y":2520},{"src":"sequence001_sprite.jpg","x":0,"y":3360},{"src":"sequence001_sprite.jpg","x":1120,"y":3360},{"src":"sequence001_sprite.jpg","x":2240,"y":3360},{"src":"sequence001_sprite.jpg","x":3360,"y":3360},{"src":"sequence001_sprite.jpg","x":4480,"y":3360},{"src":"sequence001_sprite.jpg","x":5600,"y":3360},{"src":"sequence001_sprite.jpg","x":6720,"y":3360},{"src":"sequence001_sprite.jpg","x":7840,"y":3360},{"src":"sequence001_sprite.jpg","x":8960,"y":3360},{"src":"sequence001_sprite.jpg","x":0,"y":4200},{"src":"sequence001_sprite.jpg","x":1120,"y":4200},{"src":"sequence001_sprite.jpg","x":2240,"y":4200},{"src":"sequence001_sprite.jpg","x":3360,"y":4200},{"src":"sequence001_sprite.jpg","x":4480,"y":4200},{"src":"sequence001_sprite.jpg","x":5600,"y":4200},{"src":"sequence001_sprite.jpg","x":6720,"y":4200},{"src":"sequence001_sprite.jpg","x":7840,"y":4200},{"src":"sequence001_sprite.jpg","x":8960,"y":4200},{"src":"sequence001_sprite.jpg","x":0,"y":5040},{"src":"sequence001_sprite.jpg","x":1120,"y":5040},{"src":"sequence001_sprite.jpg","x":2240,"y":5040},{"src":"sequence001_sprite.jpg","x":3360,"y":5040},{"src":"sequence001_sprite.jpg","x":4480,"y":5040},{"src":"sequence001_sprite.jpg","x":5600,"y":5040},{"src":"sequence001_sprite.jpg","x":6720,"y":5040},{"src":"sequence001_sprite.jpg","x":7840,"y":5040},{"src":"sequence001_sprite.jpg","x":8960,"y":5040},{"src":"sequence001_sprite.jpg","x":0,"y":5880},{"src":"sequence001_sprite.jpg","x":1120,"y":5880},{"src":"sequence001_sprite.jpg","x":2240,"y":5880},{"src":"sequence001_sprite.jpg","x":3360,"y":5880},{"src":"sequence001_sprite.jpg","x":4480,"y":5880},{"src":"sequence001_sprite.jpg","x":5600,"y":5880},{"src":"sequence001_sprite.jpg","x":6720,"y":5880},{"src":"sequence001_sprite.jpg","x":7840,"y":5880},{"src":"sequence001_sprite.jpg","x":8960,"y":5880},{"src":"sequence001_sprite.jpg","x":0,"y":6720},{"src":"sequence001_sprite.jpg","x":1120,"y":6720},{"src":"sequence001_sprite.jpg","x":2240,"y":6720},{"src":"sequence001_sprite.jpg","x":3360,"y":6720},{"src":"sequence001_sprite.jpg","x":4480,"y":6720},{"src":"sequence001_sprite.jpg","x":5600,"y":6720},{"src":"sequence002_sprite.jpg","x":0,"y":0},{"src":"sequence002_sprite.jpg","x":1120,"y":0},{"src":"sequence002_sprite.jpg","x":2240,"y":0},{"src":"sequence002_sprite.jpg","x":3360,"y":0},{"src":"sequence002_sprite.jpg","x":4480,"y":0},{"src":"sequence002_sprite.jpg","x":5600,"y":0},{"src":"sequence002_sprite.jpg","x":6720,"y":0},{"src":"sequence002_sprite.jpg","x":7840,"y":0},{"src":"sequence002_sprite.jpg","x":8960,"y":0},{"src":"sequence002_sprite.jpg","x":0,"y":840},{"src":"sequence002_sprite.jpg","x":1120,"y":840},{"src":"sequence002_sprite.jpg","x":2240,"y":840},{"src":"sequence002_sprite.jpg","x":3360,"y":840},{"src":"sequence002_sprite.jpg","x":4480,"y":840},{"src":"sequence002_sprite.jpg","x":5600,"y":840},{"src":"sequence002_sprite.jpg","x":6720,"y":840},{"src":"sequence002_sprite.jpg","x":7840,"y":840},{"src":"sequence002_sprite.jpg","x":8960,"y":840},{"src":"sequence002_sprite.jpg","x":0,"y":1680},{"src":"sequence002_sprite.jpg","x":1120,"y":1680},{"src":"sequence002_sprite.jpg","x":2240,"y":1680},{"src":"sequence002_sprite.jpg","x":3360,"y":1680},{"src":"sequence002_sprite.jpg","x":4480,"y":1680},{"src":"sequence002_sprite.jpg","x":5600,"y":1680},{"src":"sequence002_sprite.jpg","x":6720,"y":1680},{"src":"sequence002_sprite.jpg","x":7840,"y":1680},{"src":"sequence002_sprite.jpg","x":8960,"y":1680},{"src":"sequence002_sprite.jpg","x":0,"y":2520},{"src":"sequence002_sprite.jpg","x":1120,"y":2520},{"src":"sequence002_sprite.jpg","x":2240,"y":2520},{"src":"sequence002_sprite.jpg","x":3360,"y":2520},{"src":"sequence002_sprite.jpg","x":4480,"y":2520},{"src":"sequence002_sprite.jpg","x":5600,"y":2520},{"src":"sequence002_sprite.jpg","x":6720,"y":2520},{"src":"sequence002_sprite.jpg","x":7840,"y":2520},{"src":"sequence002_sprite.jpg","x":8960,"y":2520},{"src":"sequence002_sprite.jpg","x":0,"y":3360},{"src":"sequence002_sprite.jpg","x":1120,"y":3360},{"src":"sequence002_sprite.jpg","x":2240,"y":3360},{"src":"sequence002_sprite.jpg","x":3360,"y":3360},{"src":"sequence002_sprite.jpg","x":4480,"y":3360},{"src":"sequence002_sprite.jpg","x":5600,"y":3360},{"src":"sequence002_sprite.jpg","x":6720,"y":3360},{"src":"sequence002_sprite.jpg","x":7840,"y":3360},{"src":"sequence002_sprite.jpg","x":8960,"y":3360},{"src":"sequence002_sprite.jpg","x":0,"y":4200},{"src":"sequence002_sprite.jpg","x":1120,"y":4200},{"src":"sequence002_sprite.jpg","x":2240,"y":4200},{"src":"sequence002_sprite.jpg","x":3360,"y":4200},{"src":"sequence002_sprite.jpg","x":4480,"y":4200},{"src":"sequence002_sprite.jpg","x":5600,"y":4200},{"src":"sequence002_sprite.jpg","x":6720,"y":4200},{"src":"sequence002_sprite.jpg","x":7840,"y":4200},{"src":"sequence002_sprite.jpg","x":8960,"y":4200},{"src":"sequence002_sprite.jpg","x":0,"y":5040},{"src":"sequence002_sprite.jpg","x":1120,"y":5040},{"src":"sequence002_sprite.jpg","x":2240,"y":5040},{"src":"sequence002_sprite.jpg","x":3360,"y":5040},{"src":"sequence002_sprite.jpg","x":4480,"y":5040},{"src":"sequence002_sprite.jpg","x":5600,"y":5040},{"src":"sequence002_sprite.jpg","x":6720,"y":5040},{"src":"sequence002_sprite.jpg","x":7840,"y":5040},{"src":"sequence002_sprite.jpg","x":8960,"y":5040},{"src":"sequence002_sprite.jpg","x":0,"y":5880},{"src":"sequence002_sprite.jpg","x":1120,"y":5880}]};

let canvas = document.getElementById('canvas'); // get the canvas element
let ctx = canvas.getContext('2d'); // establish the 2d context
let srcs = Array.prototype.slice.call(document.querySelectorAll('.sprites img')); // get the array of source sprites
let playing = true; // play state of the animation

function waitOnImages(cb) {
	let loaded = [];
	loaded.push = function() {
		Array.prototype.push.apply(this, arguments);
		if(this.length >= srcs.length) cb();
	}
	for(var i = 0; i < srcs.length; i++) {
		srcs[i].onload = loaded.push('done');
	}	
}

function draw(nf) { // nf -> next frame
	if (nf >= animation.frames.length) { // if the animation is over
		playing = false; // stop the animation
		console.log('animation completed'); // print complete
	} 
	else {
		var sprite = document.querySelector(`.sprites img[src="flick/${[animation.frames[nf].src]}"]`); // get sprite
		ctx.drawImage(sprite, animation.frames[nf].x * -1, animation.frames[nf].y * -1); // draw the nf using the sprite source				
	}
	if(playing) setTimeout(requestAnimationFrame.bind(null, draw.bind(null, ++nf)), 1000 / 24); // iterate the draw loop	
};

function seek() { // on seek
	playing = false; // pause the animation
	draw(this.getAttribute('value')); // draw the sought frame
}

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
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
  };
}

// register handlers and begin animation

document.querySelector('.seek input').setAttribute('max', animation.frames.length - 1); // init the length of the seek bar
document.querySelector('.seek input').addEventListener('input', throttle(seek)); // throttle to 42 -> one frame in ms (approx)

waitOnImages(function(){
	draw(0); // start the animation from the beggining (0th frame)
});