"use strict";

const fs = require('fs');
const process = require('process');
const path = require('path');
const imglib = require('images');

let map = { frames: [] };
let imgHTML = [];

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
		console.log(seq);
		getFilenames(seq) // get all the files in the target directory
		.then(fileNames => fileNames.filter((f, i) => /.jpg/.test(f))) // get the images of the sequence
		.then(imageNames => imageNames.sort()) // sort them alpabetically
		.then(sortedImageNames => sortedImageNames.map(s => imglib(`sequences/${seq}/` + s))) // get an array of image objects from the filenames
		.then(images => createSprite(images, seq)) // create the sprite
		.then(global.gc) // free up resources for subsequent sprites
		.catch(e => console.log('garbage collector unsuccessfully exposed'))
		.then(resolve) // then resolve the promise
		.catch(e => resolve()) // otherwise reject with caught error
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
		maxCols = Math.ceil(4096 / w), // get max columns per sprite
		maxRows = Math.ceil(4096 / h), // get max rows per sprite
		cols = maxCols, // as well as attributes for columns
		rows = maxRows, // and rows
		iteration = 0, // and the sequence iteration
		sprite; // declare the empty sprite

	let pos = { col: 0, row: 0 }; // remember position in the grid
	let spritesNeeded = Math.ceil(images.length / (maxCols * maxRows));
	let finalSprite = Math.ceil(images.length % (maxCols * maxRows));

	images.forEach((img, i) => {
		if(i % (maxCols * maxRows) === 0) { // if this is a new sprite
			if(--spritesNeeded === 0) { // and this is the last sprite
				cols = finalSprite < maxCols ? Math.ceil(finalSprite % maxCols) : maxCols; // calc cols in the sprite
				rows = Math.ceil(finalSprite / cols); // and then the rows
			}
			pos = { col: 0, row: 0 }; // reset position in the grid
			sprite = imglib(cols * w, rows * h); // create the sprite
		}
		
		map.frames.push({src: `${seq}_${iteration}.sprite.jpg`, x: w * pos.col, y: h * pos.row }); // add this frame to the animation frames object
		sprite.draw(img, w * pos.col, h * pos.row); // draw this image to the sprite

		if (pos.col + 1 > cols - 1) { // if we're at the end of the row
			pos.row++; // move to the next row
			pos.col = 0; // reset to the first column
		}
		else {
			pos.col++; // otherwise just move to the next column
		}
		if((i + 1) % (maxCols * maxRows) === 0 || i === images.length - 1) {
			console.log(`saving sprite: ${seq}_${iteration}.sprite.jpg`);
			imgHTML.push(`<img class="sprite" src="flicker/${seq}_${iteration}.sprite.jpg" alt="${seq}"/>`);
			sprite.save(`flicker/${seq}_${iteration}.sprite.jpg`);
			iteration++;
		}
	})
}

function saveMap() {
	return new Promise((resolve, reject) => {
		fs.writeFile('flicker/flicker_map.json', JSON.stringify(map, null), err => { // write the flick to a file
			if (err) return reject(err); // reject the promise on error
			console.log('Succesfully saved JSON coordinate map');
			resolve(); // otherwise resolve it
		})
	})
}

function saveImgHTML() {
	return new Promise((resolve, reject) => {
		let html = imgHTML.join('\n');
		fs.writeFile('flicker/flicker_imgHTML.html', html, err => { // write the img html to a file
			if (err) return reject(err); // reject the promise on error
			console.log('Succesfully saved img HTML template');
			resolve(); // otherwise resolve it
		})
	})
}

// generate all sequences

function generateAll (sequences) {
	return new Promise((resolve, reject) => {
		sequences.reduce((p, seq, i, arr) => {			
			return p.then(() => generateFlick(seq));
		}, Promise.resolve())
		.then(resolve);
	})	
}

// start the process

getSequences('sequences/') // get every sequence
.then(sequences => new Promise(resolve => generateAll(sequences).then(resolve))) // generate the flick with each sequence
.then(saveMap) // save the coordinate map
.then(saveImgHTML) // save the img HTML template
.catch(e => console.log(e)) // log any errors if they occur