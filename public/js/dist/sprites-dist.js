"use strict";

var animation = { "frames": [{ "src": "sequence001_sprite.jpg", "x": 0, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 0 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 840 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 1680 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 2520 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 3360 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 4200 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 5040 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 6720, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 7840, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 8960, "y": 5880 }, { "src": "sequence001_sprite.jpg", "x": 0, "y": 6720 }, { "src": "sequence001_sprite.jpg", "x": 1120, "y": 6720 }, { "src": "sequence001_sprite.jpg", "x": 2240, "y": 6720 }, { "src": "sequence001_sprite.jpg", "x": 3360, "y": 6720 }, { "src": "sequence001_sprite.jpg", "x": 4480, "y": 6720 }, { "src": "sequence001_sprite.jpg", "x": 5600, "y": 6720 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 2240, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 3360, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 4480, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 5600, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 6720, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 7840, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 8960, "y": 0 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 2240, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 3360, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 4480, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 5600, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 6720, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 7840, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 8960, "y": 840 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 2240, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 3360, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 4480, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 5600, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 6720, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 7840, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 8960, "y": 1680 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 2240, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 3360, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 4480, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 5600, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 6720, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 7840, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 8960, "y": 2520 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 2240, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 3360, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 4480, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 5600, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 6720, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 7840, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 8960, "y": 3360 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 2240, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 3360, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 4480, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 5600, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 6720, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 7840, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 8960, "y": 4200 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 2240, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 3360, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 4480, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 5600, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 6720, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 7840, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 8960, "y": 5040 }, { "src": "sequence002_sprite.jpg", "x": 0, "y": 5880 }, { "src": "sequence002_sprite.jpg", "x": 1120, "y": 5880 }] };

var canvas = document.getElementById("canvas"); // get the canvas element
var ctx = canvas.getContext("2d"); // establish the 2d context
var srcs = Array.prototype.slice.call(document.querySelectorAll(".sprites img")); // get the array of source sprites
var playing = true;

function waitForImages(i) {
  // wait for all source images to finish loading
  if (i >= srcs.length) return;
  srcs[i].onload = waitForImages(++i);
}

waitForImages(0); // block draw before loading

document.querySelector(".seek input").setAttribute("max", animation.frames.length - 1);
document.querySelector(".seek input").addEventListener("input", throttle(function () {
  playing = false;
  draw(this.getAttribute("value"));
}, 42));

function draw(nf) {
  // nf -> next frame
  if (nf >= animation.frames.length) {
    // if the animation is over
    console.log("animation completed"); // print complete
  } else {
    var sprite = document.querySelector(".sprites img[src=\"flick/" + [animation.frames[nf].src] + "\"]"); // get sprite
    ctx.drawImage(sprite, animation.frames[nf].x * -1, animation.frames[nf].y * -1); // draw the nf using the sprite source		
  }
  if (playing) setTimeout(requestAnimationFrame.bind(null, draw.bind(null, ++nf)), 1000 / 24); // iterate the draw loop
};

draw(0);

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
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
  };
}
