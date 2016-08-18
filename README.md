# flicker
Create beautiful, seekable, mobile-friendly-auto-playable HTML videos (faked with sprite animations and canvas).

Demo: [flicker.jonathan-brooks.co.uk](http://flicker.jonathan-brooks.co.uk)

## Install

<pre>
  npm install flicker
</pre>

## Why?

I basically didn't like HTML video limitations on mobile (specifically no autoplay for hero backgrounds), so I figured
a good solution would be to use sprite animations - but packing the sprites and converting the frame coords to JSON with an external tool
took forever, and I wanted to play/pause/reverse/seek my sprite animations easier. So I made a tool which does both.
Essentially, my pipeline was as follows:

<pre>

(create video)     --> video 
(photoshop export) --> image sequence(s)
(flicker package)  --> packed sprites &amp; JSON frame coord map
(flicker.min.js)   --> canvas animation goodness

</pre>

## Useage - Step 0 - Generating image sequences for packing

This step, namely converting your video into an image sequence, is at your discretion. Here are a couple possible methods:
* Using Photoshop: [How To Convert A Video Into An Image Sequence](https://ihatetomatoes.net/convert-video-image-sequence/)
* Using online-convert.com: [Online image converter to JPEG](http://image.online-convert.com/convert-to-jpg) (it should be noted that when I tried this, the jpegs were in the wrong order and need to be sorted)

## Useage - Step 1 - Packing the image sequences into sprites

After running `npm install flicker`, you should notice the following folders in the package directory:

<pre>

.
+-- sequences/ (where to put your image sequences)
+-- flicker/ (where the sequences are exported to packaged sprites and frame coord map)

</pre>

Before running the flicker app, you'll need to move your image sequences into the `sequences/` folder. 
Each sequence should be stored within it's own folder, resembling the following: 

<pre>

.
+-- sequences/
|   +-- sequence1/
|   |	+-- image1.jpg 
|   |	+-- image2.jpg 
|   +-- sequence2/
|   |	+-- image1.jpg 
|   |	+-- image2.jpg 
+-- flicker/

</pre>

Then run `npm start` from the package directory - this process can take a little while, depending on the amount of images
being packed into sprites. After it's finished, your packed sprites and the JSON map representing the entire animation
(both sequence1 and sequence2 combined) will be inside `flicker/`:

<pre>

.
+-- sequences/
|   +-- sequence1/
|   |	+-- image1.jpg 
|   |	+-- image2.jpg 
|   +-- sequence2/
|   |	+-- image1.jpg 
|   |	+-- image2.jpg 
+-- flicker/
|   +-- sequence1_sprite.jpg/
|   +-- sequence2_sprite.jpg/
|   +-- flicker_map.json/

</pre>

## Useage - Step 2 - Using the sprites in your HTML

You can find an example by heading to [flicker.jonathan-brooks.co.uk](http://flicker.jonathan-brooks.co.uk) and viewing the page source,
but I'll include a snippet on it's set up here:

<pre>

&lt;html&gt;
	&lt;head&gt;
		&lt;meta charset="utf-8"&gt;		
	&lt;/head&gt;
	&lt;body&gt;
		&lt;div id="flicker1" class="flicker"&gt;
			&lt;canvas class="canvas" width="560" height="420"&gt;&lt;/canvas&gt;
			&lt;div class="controls"&gt;
				&lt;input type="range" min="0" max="1" value="0" step="1" oninput="this.setAttribute('value', this.value);"/&gt;
			&lt;/div&gt;
			&lt;div class="sprites" style="display: none;"&gt;
				&lt;img class="sprite" src="flicker/sequence001_sprite.jpg" alt=" "/&gt;
				&lt;img class="sprite" src="flicker/sequence002_sprite.jpg" alt=" "/&gt;
			&lt;/div&gt;		
		&lt;/div&gt;				
		&lt;script type="text/javascript" src="js/flicker.min.js"&gt;&lt;/script&gt;
		&lt;script type="text/javascript"&gt;

			var map = // copy flicker_map.json into a variable here, like { frames: [SUPER LONG ARRAY] };

			// register the Flicker object

			var myFlicker = new Flicker({
				animation: map, // specify the frame coordinate map
				rootPath: 'flicker/', // specify the root path for the sprites (defaults to flicker/)
				container: document.getElementById('flicker1') // specify the context for the flicker
			});

			// flicker provides a utility called waitOnImages which waits for the source sprites to load
			// this is necessary when using high res images, as playing the animation before the images
			// have loaded results in the canvas drawing a blank image

			myFlicker.utils.waitOnImages(function () {
				console.log('done loading');

				/*  
					BACKGROUND LOOP EXAMPLE
				    play from current frame (defaults to frame 0 (the beginning)), 
					then register an event handler on flickerEnd to play the flicker
					from the beginning whenever the flicker finishes
				*/

				this.play();
				this.on('flickerEnd', function(direction){
					console.log('flicker ended whilst playing %s', direction);
					this.play(0); // play from the beginning
				});

				/*  
					ILLUSTRATIVE EXAMPLE
				    play from current frame, wait for 2 seconds, pause, wait for 3 seconds,
					reverse from current frame, wait for one second, play from frame 0 (the beginning)
				*/

				// this.play().wait(2).pause().wait(3).reverse().wait(1).play(0);
							
			});

			// naturally, event handlers can also be registered outside the
			// waitOnImages function, directly on the flicker object
			// the sequenceChange event is emitted whenever the flicker transitions
			// from one sequence to another
			
			myFlicker.on('sequenceChange', function(seq){
				console.log('transitioned to sprite sequence: %s', seq);
				/*  
					STOP PLAYTHROUGH EXAMPLE
					pauses between each sequence, requiring manual replaying
					to continue the flicker (perhaps triggered by a scroll event?)
				*/
				
				// this.pause(); 
			});	

		&lt;/script&gt;
	&lt;/body&gt;
&lt;/html&gt;

</pre>

The js setup in the above snippet is (thus far) as complicated as the config gets. I'll be adding features in the future,
like optional playThrough (pause after each sequence) and showing/hiding the seek controls in the config.

## Notes

It should be noted that this tool is very much in pre-production, and as such it's still pretty limited. Here
are some of the issues I'll be working on henceforth:

* At the moment, because the sprite packer tries to process all the sequences at once, it falls over if
the sequences are too long (and they often are - 24 images = 1 second of video after all). This fix is a priority
and will come soon.
* In testing the [images package](https://www.npmjs.com/package/images) (which flicker depends on for sprite packing),
I found that somewhat arbitrarily it falls over when the sprite resolution roughly exceeds 10,000 x 10,000 pixels. Again, I 
will do some investigating into why this limit exists and see if I can work around it with some crafty image compression 
(or something similar).
* At the moment you have to manually separate the huge monolithic image sequences you get from the video export manually - 
at some point in the future I'm hoping to add custom CLI parameters/JSON config file which let you specify when to cut the sequence 
into sub-sequences at given points in time (specified in frames or seconds from the beginning of the video).

If you have any questions, or wish to contribute, then don't hesitate to contact me!

Happy coding everyone ♥