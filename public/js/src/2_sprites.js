var animation = [{"sprite":"flick/sequence001_sprite.jpg","frames":[{"x":0,"y":0},{"x":1120,"y":0},{"x":2240,"y":0},{"x":3360,"y":0},{"x":4480,"y":0},{"x":5600,"y":0},{"x":6720,"y":0},{"x":7840,"y":0},{"x":8960,"y":0},{"x":0,"y":840},{"x":1120,"y":840},{"x":2240,"y":840},{"x":3360,"y":840},{"x":4480,"y":840},{"x":5600,"y":840},{"x":6720,"y":840},{"x":7840,"y":840},{"x":8960,"y":840},{"x":0,"y":1680},{"x":1120,"y":1680},{"x":2240,"y":1680},{"x":3360,"y":1680},{"x":4480,"y":1680},{"x":5600,"y":1680},{"x":6720,"y":1680},{"x":7840,"y":1680},{"x":8960,"y":1680},{"x":0,"y":2520},{"x":1120,"y":2520},{"x":2240,"y":2520},{"x":3360,"y":2520},{"x":4480,"y":2520},{"x":5600,"y":2520},{"x":6720,"y":2520},{"x":7840,"y":2520},{"x":8960,"y":2520},{"x":0,"y":3360},{"x":1120,"y":3360},{"x":2240,"y":3360},{"x":3360,"y":3360},{"x":4480,"y":3360},{"x":5600,"y":3360},{"x":6720,"y":3360},{"x":7840,"y":3360},{"x":8960,"y":3360},{"x":0,"y":4200},{"x":1120,"y":4200},{"x":2240,"y":4200},{"x":3360,"y":4200},{"x":4480,"y":4200},{"x":5600,"y":4200},{"x":6720,"y":4200},{"x":7840,"y":4200},{"x":8960,"y":4200},{"x":0,"y":5040},{"x":1120,"y":5040},{"x":2240,"y":5040},{"x":3360,"y":5040},{"x":4480,"y":5040},{"x":5600,"y":5040},{"x":6720,"y":5040},{"x":7840,"y":5040},{"x":8960,"y":5040},{"x":0,"y":5880},{"x":1120,"y":5880},{"x":2240,"y":5880},{"x":3360,"y":5880},{"x":4480,"y":5880},{"x":5600,"y":5880},{"x":6720,"y":5880},{"x":7840,"y":5880},{"x":8960,"y":5880},{"x":0,"y":6720},{"x":1120,"y":6720},{"x":2240,"y":6720},{"x":3360,"y":6720},{"x":4480,"y":6720},{"x":5600,"y":6720}]},{"sprite":"flick/sequence002_sprite.jpg","frames":[{"x":0,"y":0},{"x":1120,"y":0},{"x":2240,"y":0},{"x":3360,"y":0},{"x":4480,"y":0},{"x":5600,"y":0},{"x":6720,"y":0},{"x":7840,"y":0},{"x":8960,"y":0},{"x":0,"y":840},{"x":1120,"y":840},{"x":2240,"y":840},{"x":3360,"y":840},{"x":4480,"y":840},{"x":5600,"y":840},{"x":6720,"y":840},{"x":7840,"y":840},{"x":8960,"y":840},{"x":0,"y":1680},{"x":1120,"y":1680},{"x":2240,"y":1680},{"x":3360,"y":1680},{"x":4480,"y":1680},{"x":5600,"y":1680},{"x":6720,"y":1680},{"x":7840,"y":1680},{"x":8960,"y":1680},{"x":0,"y":2520},{"x":1120,"y":2520},{"x":2240,"y":2520},{"x":3360,"y":2520},{"x":4480,"y":2520},{"x":5600,"y":2520},{"x":6720,"y":2520},{"x":7840,"y":2520},{"x":8960,"y":2520},{"x":0,"y":3360},{"x":1120,"y":3360},{"x":2240,"y":3360},{"x":3360,"y":3360},{"x":4480,"y":3360},{"x":5600,"y":3360},{"x":6720,"y":3360},{"x":7840,"y":3360},{"x":8960,"y":3360},{"x":0,"y":4200},{"x":1120,"y":4200},{"x":2240,"y":4200},{"x":3360,"y":4200},{"x":4480,"y":4200},{"x":5600,"y":4200},{"x":6720,"y":4200},{"x":7840,"y":4200},{"x":8960,"y":4200},{"x":0,"y":5040},{"x":1120,"y":5040},{"x":2240,"y":5040},{"x":3360,"y":5040},{"x":4480,"y":5040},{"x":5600,"y":5040},{"x":6720,"y":5040},{"x":7840,"y":5040},{"x":8960,"y":5040},{"x":0,"y":5880},{"x":1120,"y":5880}]}]

var canvas = document.getElementById('canvas'); // get the canvas element
var ctx = canvas.getContext('2d'); // establish the 2d context
var sprites = document.querySelectorAll('.sprites img'); // get the first sprite in the list

(function advance (index){
	if(typeof sprites[index] === "undefined") return;
	sprites[index].onload = function(){
		(function draw(next) {
			var src = sprites[index].getAttribute('src');
			if (next >= animation[index].length) { // if the animation is over
				//animation[src].reverse(); // reverse the animation order
				//draw(0); // start the animation
				advance(++index);
			} 
			else {
				ctx.drawImage(sprites[index], animation[index][next].x * -1, animation[index][next].y * -1); // draw the next frame using the sprite source
				setTimeout(requestAnimationFrame.bind(null, draw.bind(null, ++next)), 1000 / 25); // iterate the draw loop
			}
		})(0); // start the animation
	}
})(0);

/*
for (var i = 0; i < sprites.length; i++) {
	sprites[i].onload = function () { // once the sprites have loaded
		(function draw(next) {
			var src = sprites[i].getAttribute('src');
			if (next >= animation[src].length) { // if the animation is over
				animation[src].reverse(); // reverse the animation order
				draw(0); // start the animation
			} 
			else {
				ctx.drawImage(sprites[i], animation[src][next].x * -1, animation[src][next].y * -1); // draw the next frame using the sprite source
				setTimeout(requestAnimationFrame.bind(null, draw.bind(null, ++next)), 1000 / 25); // iterate the draw loop
			}
		})(0); // start the animation
	}
}
*/