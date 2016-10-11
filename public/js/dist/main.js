// register the Flicker object

var myFlicker = new Flicker({
	animation: map, // specify the frame coordinate map
	rootPath: 'flicker/', // specify the root path for the sprites (defaults to flicker/)
	container: document.getElementById('flicker1') // specify the context for the flicker
});

var sectionDetails = {
	current: 'start',
	sections: {
		'start': {
			title: 'Everest Windows',
			description: 'Our windows are definitely the best'
		},
		'flicker/sequence1(argon)-0.sprite.jpg': {
			title: 'Double Glazing',
			description: 'Keeps you warm in the winter'
		},
		'flicker/sequence2(soundwave)-0.sprite.jpg': {
			title: 'Argon Gas',
			description: 'Argon gas is inert which is pretty cool'
		},
		'flicker/sequence1(argon)-1.sprite.jpg': {
			title: 'Argon Gas',
			description: 'Argon gas is inert which is pretty cool'
		},
		'flicker/sequence0(glazing)-0.sprite.jpg': {
			title: 'Double Glazing',
			description: 'Keeps you warm in the winter'
		},
		'end': {
			title: 'Sound Dampening',
			description: 'You can play drums really really loud'
		}
	}
}

// flicker provides a utility called waitOnImages which waits for the source sprites to load
// this is necessary when using high res images, as playing the animation before the images
// have loaded results in the canvas drawing a blank image

myFlicker.utils.waitOnImages(function () {
	console.log('done loading');
	this.play().pause(); // paint the first frame

	updateSectionDetails('start');
	window.addEventListener('wheel', function(e){
		$('.section-details').addClass('hide');
		if(e.deltaY > 0 && this.paused) {
			if(sectionDetails.current === 'end') {
				this.play(0).pause(); // play the animation forwards
				updateSectionDetails('start');
			}
			else this.play();
		}
		if (e.deltaY < 0 && this.paused) {
			var lastFrame = this.animation.frames.length-1;
			if(sectionDetails.current === 'start') {
				this.reverse(lastFrame).pause(); // play the animation in reverse
				updateSectionDetails('end');
			}
			else this.reverse();
		}
	}.bind(this))
});

myFlicker.on('sequenceChange', function(seq){
	// console.log('transitioned to sprite sequence: %s', seq);
	if(seq.indexOf('(argon)-0') !== -1 && this.direction === 'forwards') {
		updateSectionDetails(seq);
		this.pause(); // forward pauses
	}
	if(seq.indexOf('(soundwave)-0') !== -1 && this.direction === 'forwards') {
		updateSectionDetails(seq);
		this.pause(); // forward pauses
	}	
	if(seq.indexOf('(argon)-1') !== -1 && this.direction === 'reverse') {
		updateSectionDetails(seq);
		this.pause(); // forward pauses
	}	
	if(seq.indexOf('(glazing)-0') !== -1 && this.direction === 'reverse') {
		updateSectionDetails(seq);
		this.pause(); // forward pauses
	}			
});	

myFlicker.on('flickerEnd', function(dir){
	updateSectionDetails(dir === 'forwards' ?  'end' : 'start');
});	

function updateSectionDetails(seq) {
	sectionDetails.current = seq;
	var details = sectionDetails.sections[seq];
	document.querySelector('.section-details h1').innerHTML = details.title;
	document.querySelector('.section-details p').innerHTML = details.description;
	$('.section-details').removeClass('hide');
}