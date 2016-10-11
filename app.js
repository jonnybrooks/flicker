"use strict";

const fs = require('fs');
const process = require('process');
const path = require('path');
const imglib = require('images');

let map = { frames: [] };

function getSequences(sequences) {
	return new Promise((resolve, reject) => {
		fs.readdir(sequences, (err, files) => {
			if(err) return reject(err);
			resolve(files.filter(file => fs.statSync(path.join(sequences, file)).isDirectory()));
		})
	})  
}

function generateFlick (seq) {
	return new Promise((resolve, reject) => {
		getFilenames(seq) // get all the files in the target directory
		.then(fileNames => fileNames.filter((f, i) => /.jpg/.test(f))) // get the images of the sequence
		.then(imageNames => imageNames.sort()) // sort them alpabetically
		.then(sortedImageNames => sortedImageNames.map(s => imglib(`sequences/${seq}/` + s))) // get an array of image objects from the filenames
		.then(images => createSprite(images, seq)) // create the sprites		
		.then(resolve) // then resolve the promise
		.catch(e => reject(e)) // otherwise reject with caugh error
	})	
}

function getFilenames(seq) {
	return new Promise((resolve, reject) => {
		fs.readdir(`sequences/${seq}/`, function(err, files) {
			if(err) return reject(err);
			resolve(files);
		})
	})
}

function createSprite(images, seq) {
	let w = images[0].width(), // get the unit width of each image
		h =	images[0].height(), // get the unit height of each iamge
		maxRows = Math.ceil(10000 / h), // get max rows per sprite
		rows = maxRows, // and rows
		iteration = 0, // and the sequence iteration
		sprite; // declare the empty sprite

	let currentRow = 0; // remember the current row in the drawing process
	let spritesNeeded = Math.ceil(images.length / maxRows);
	let finalSprite = Math.ceil(images.length % maxRows);

	images.forEach((img, i) => {
		if(i % maxRows === 0) { // if this is a new sprite
			if(--spritesNeeded === 0) { // if this is the last sprite
				rows = finalSprite; // give this sprite the minimum rows needed for the last sprite
			}
			currentRow = 0; // reset the current row to 0 for the new sprite
			sprite = imglib(w, rows * h); // create the sprite
		}
		
		map.frames.push({ sequence: `${seq}_${iteration}`, offset: h * map.frames.length }); // add this frame to the animation frames object
		sprite.draw(img, 0, h * currentRow); // draw this image to the sprite

		currentRow++; // advance to the next row
		
		if((i + 1) % maxRows === 0 || i === images.length - 1) {
			try {
				sprite.save(`flicker/${seq}_${iteration}.sprite.jpg`); // save the sprite to the FS	
				console.log(`saving sprite: ${seq}_${iteration}.sprite.jpg`);
			}
			catch(e) {
				console.log(`FAILED: flicker/${seq}_${iteration}.sprite.jpg`);
			}			
			iteration++; // iterate the file number
		}
	})
}

function saveMap() {
	return new Promise((resolve, reject) => {
		fs.writeFile('flicker/flicker_map.json', JSON.stringify(map, null), err => { // write the flick to a file
			if (err) return reject(err); // reject the promise on error
			resolve('Succesfully saved JSON coordinate map'); // otherwise resolve it
		})
	})
}

// start the process

getSequences('sequences/') // get every sequence
.then(sequences => Promise.all(sequences.map(generateFlick))) // generate the flick with each sequence
.catch(e => console.log(e)) // log any errors if they occur
.then(saveMap) // save the generated map to file
.then(success => console.log(success)) // log successs