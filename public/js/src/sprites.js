"use strict";

let animation = [{"sprite":"flick/sequence001_sprite.jpg","frames":[{"x":0,"y":0},{"x":1120,"y":0},{"x":2240,"y":0},{"x":3360,"y":0},{"x":4480,"y":0},{"x":5600,"y":0},{"x":6720,"y":0},{"x":7840,"y":0},{"x":8960,"y":0},{"x":0,"y":840},{"x":1120,"y":840},{"x":2240,"y":840},{"x":3360,"y":840},{"x":4480,"y":840},{"x":5600,"y":840},{"x":6720,"y":840},{"x":7840,"y":840},{"x":8960,"y":840},{"x":0,"y":1680},{"x":1120,"y":1680},{"x":2240,"y":1680},{"x":3360,"y":1680},{"x":4480,"y":1680},{"x":5600,"y":1680},{"x":6720,"y":1680},{"x":7840,"y":1680},{"x":8960,"y":1680},{"x":0,"y":2520},{"x":1120,"y":2520},{"x":2240,"y":2520},{"x":3360,"y":2520},{"x":4480,"y":2520},{"x":5600,"y":2520},{"x":6720,"y":2520},{"x":7840,"y":2520},{"x":8960,"y":2520},{"x":0,"y":3360},{"x":1120,"y":3360},{"x":2240,"y":3360},{"x":3360,"y":3360},{"x":4480,"y":3360},{"x":5600,"y":3360},{"x":6720,"y":3360},{"x":7840,"y":3360},{"x":8960,"y":3360},{"x":0,"y":4200},{"x":1120,"y":4200},{"x":2240,"y":4200},{"x":3360,"y":4200},{"x":4480,"y":4200},{"x":5600,"y":4200},{"x":6720,"y":4200},{"x":7840,"y":4200},{"x":8960,"y":4200},{"x":0,"y":5040},{"x":1120,"y":5040},{"x":2240,"y":5040},{"x":3360,"y":5040},{"x":4480,"y":5040},{"x":5600,"y":5040},{"x":6720,"y":5040},{"x":7840,"y":5040},{"x":8960,"y":5040},{"x":0,"y":5880},{"x":1120,"y":5880},{"x":2240,"y":5880},{"x":3360,"y":5880},{"x":4480,"y":5880},{"x":5600,"y":5880},{"x":6720,"y":5880},{"x":7840,"y":5880},{"x":8960,"y":5880},{"x":0,"y":6720},{"x":1120,"y":6720},{"x":2240,"y":6720},{"x":3360,"y":6720},{"x":4480,"y":6720},{"x":5600,"y":6720}]},{"sprite":"flick/sequence002_sprite.jpg","frames":[{"x":0,"y":0},{"x":1120,"y":0},{"x":2240,"y":0},{"x":3360,"y":0},{"x":4480,"y":0},{"x":5600,"y":0},{"x":6720,"y":0},{"x":7840,"y":0},{"x":8960,"y":0},{"x":0,"y":840},{"x":1120,"y":840},{"x":2240,"y":840},{"x":3360,"y":840},{"x":4480,"y":840},{"x":5600,"y":840},{"x":6720,"y":840},{"x":7840,"y":840},{"x":8960,"y":840},{"x":0,"y":1680},{"x":1120,"y":1680},{"x":2240,"y":1680},{"x":3360,"y":1680},{"x":4480,"y":1680},{"x":5600,"y":1680},{"x":6720,"y":1680},{"x":7840,"y":1680},{"x":8960,"y":1680},{"x":0,"y":2520},{"x":1120,"y":2520},{"x":2240,"y":2520},{"x":3360,"y":2520},{"x":4480,"y":2520},{"x":5600,"y":2520},{"x":6720,"y":2520},{"x":7840,"y":2520},{"x":8960,"y":2520},{"x":0,"y":3360},{"x":1120,"y":3360},{"x":2240,"y":3360},{"x":3360,"y":3360},{"x":4480,"y":3360},{"x":5600,"y":3360},{"x":6720,"y":3360},{"x":7840,"y":3360},{"x":8960,"y":3360},{"x":0,"y":4200},{"x":1120,"y":4200},{"x":2240,"y":4200},{"x":3360,"y":4200},{"x":4480,"y":4200},{"x":5600,"y":4200},{"x":6720,"y":4200},{"x":7840,"y":4200},{"x":8960,"y":4200},{"x":0,"y":5040},{"x":1120,"y":5040},{"x":2240,"y":5040},{"x":3360,"y":5040},{"x":4480,"y":5040},{"x":5600,"y":5040},{"x":6720,"y":5040},{"x":7840,"y":5040},{"x":8960,"y":5040},{"x":0,"y":5880},{"x":1120,"y":5880}]}]
let progress = [];

let canvas = document.getElementById('canvas'); // get the canvas element
let ctx = canvas.getContext('2d'); // establish the 2d context
let srcs = Array.prototype.slice.call(document.querySelectorAll('.sprites img')); // get the array of source sprites
let pos = 0;

function waitForImages(i){
	if(typeof srcs[i] === 'undefined') return 'done loading';
	srcs[i].onload = waitForImages(++i);
}

waitForImages();

(function draw(nf) { // nf -> next frame
	if(pos >= animation.length) return;
	let src = srcs[pos].getAttribute('src');
	if (nf >= animation[pos].frames.length) { // if the animation is over
		//animation[src].reverse(); // reverse the animation order
		//draw(0); // start the animation
		pos++;
		draw(0);
	} 
	else {
		console.log(animation[pos].frames[nf]);
		ctx.drawImage(srcs[pos], animation[pos].frames[nf].x * -1, animation[pos].frames[nf].y * -1); // draw the nf frame using the sprite source
		setTimeout(requestAnimationFrame.bind(null, draw.bind(null, ++nf)), 1000 / 25); // iterate the draw loop
	}
})(0); // start the animation


/*
for (var i = 0; i < sprites.length; i++) {
	sprites[i].onload = function () { // once the sprites have loaded
		(function draw(nf) {
			var src = sprites[i].getAttribute('src');
			if (nf >= animation[src].length) { // if the animation is over
				animation[src].reverse(); // reverse the animation order
				draw(0); // start the animation
			} 
			else {
				ctx.drawImage(sprites[i], animation[src][nf].x * -1, animation[src][nf].y * -1); // draw the nf frame using the sprite source
				setTimeout(requestAnimationFrame.bind(null, draw.bind(null, ++nf)), 1000 / 25); // iterate the draw loop
			}
		})(0); // start the animation
	}
}
*/