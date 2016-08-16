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
	let srcSprite = `${seq}_sprite.jpg`;
	return new Promise((resolve, reject) => {
		getFilenames(seq) // get all the files in the target directory
		.then(fileNames => fileNames.filter((f, i) => /.jpg/.test(f))) // get the images of the sequence
		.then(imageNames => imageNames.sort()) // sort them alpabetically
		.then(sortedImageNames => sortedImageNames.map(s => imglib(`sequences/${seq}/` + s))) // get an array of image objects from the filenames
		.then(images => createSprite(images, srcSprite)) // create the sprite		
		.then(sprite => sprite.save(`flicker/${srcSprite}`)) // save the sprite
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

function createSprite(images, srcSprite) {
	let w = images[0].width(), 
		h =	images[0].height(),
		columns = Math.ceil(10000 / w), // get number of columns
		rows = Math.ceil(images.length / columns); // get number of rows

	let sprite = imglib(columns * w, rows * h); // generate the empty sprite
	let pos = { col: 0, row: 0 }; // remember position in the grid	

	images.forEach(img => {		
		map.frames.push({src: srcSprite, x: w * pos.col, y: h * pos.row }); // add this frame to the animation frames object
		sprite.draw(img, w * pos.col, h * pos.row); // draw this image to the sprite		

		if(pos.col + 1 > columns - 1 && pos.row + 1 > rows) { // if the position exceeds the grid
			throw new Error('Sprite has exceeded maximum dimensions - oops!'); // throw an error
		}
		else if (pos.col + 1 > columns - 1) { // if we're at the end of the row
			pos.row++; // move to the next row
			pos.col = 0; // reset to the first column
		}
		else {
			pos.col++; // otherwise just move to the next column
		}
	})
	return sprite; // return the completed sprite
}

function saveMap() {
	return new Promise((resolve, reject) => {
		fs.writeFile('flicker/flicker_map.json', JSON.stringify(map, null), (err) => { // write the flick to a file
			if (err) return reject(err); // reject the promise on error
			resolve('Succesfully saved JSON coordinate map'); // otherwise resolve it
		})
	})
}

// start the process

getSequences('sequences/') // get every sequence
.then(sequences => Promise.all(sequences.map(generateFlick))) // generate the flick with each sequence
.then(saveMap) // save the generated map to file
.then(success => console.log(success)) // log successs
.catch(e => console.log(e)) // log any errors if they occur

/*
// program for converting sprite packer from txt to json

fs.readFile(map, 'utf-8', (err, data) => {
	if (err) throw err;
	let json = {sprite: sprite, coords: []};
	let coords = data
		.replace(/\w+ = /gm, '')
		.replace(/\r|\n/gm, ' ')
		.replace(/\s{2,}/gm, ' ')
		.trim()
		.split(' ');
	while(coords.length > 0) {
		json.coords.push({x: coords.shift(), y: coords.shift()});
	}  
	fs.writeFile(`${path.parse(map).name}.json`, JSON.stringify(json, null, '\t'), (err) => {
		if (err) throw err;
		console.log('Succesfully converted coordinates to JSON');
	});
});
*/