# flicker
Create beautiful, seekable, mobile-friendly animations with sprites and canvas

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
* Using online-convert.com: [Online image converter to JPEG](http://image.online-convert.com/convert-to-jpg)

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
		&lt;div id="flicker"&gt;
			&lt;canvas class="canvas" height="841" width="1121"&gt;&lt;/canvas&gt;
			&lt;div class="controls"&gt;
				&lt;input type="range" min="0" max="1" value="0" step="1" oninput="this.setAttribute('value', this.value);"/&gt;
			&lt;/div&gt;
			&lt;div class="sprites" style="display: none;"&gt;
				&lt;img class="sprite" src="flicker/sequence1_sprite.jpg" alt=" "/&gt;
				&lt;img class="sprite" src="flicker/sequence2_sprite.jpg" alt=" "/&gt;
			&lt;/div&gt;		
		&lt;/div&gt;				
		&lt;script type="text/javascript" src="js/flicker.min.js"&gt;&lt;/script&gt;
		&lt;script type="text/javascript"&gt;

			var map = // copy flicker_map.json into a variable here, like { frames: [SUPER LONG ARRAY] };

			// register the Flicker object
			var myFlicker = new Flicker({
				animation: map, // specify the frame coordinate map
				rootPath: 'flicker/', // specify the root path for the sprites (defaults to flicker/)
				container: document.getElementById('flicker') // specify the context for the flicker
			});

			// flicker provides a utility called waitOnImages which waits for the source sprites to load
			// this is necessary when using high res images, as playing the animation before the images
			// have loaded results in the canvas drawing a blank image

			myFlicker.utils.waitOnImages(function () {
				console.log('done loading');
				// play the animation, then wait for 2 seconds, then pause, then wait for another 3 seconds
				// before playing the animation in reverse (all the way to the beginning)
				this.play().wait(2).pause().wait(3).reverse(); 
			});

		&lt;/script&gt;
	&lt;/body&gt;
&lt;/html&gt;

</pre>

The js setup in the above snippet is (thus far) as complicated as the config gets. I'll be adding features in the future,
like optional playThrough (pause after each sequence) and showing/hiding the seek controls in the config.