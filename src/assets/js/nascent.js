document.addEventListener("DOMContentLoaded", function(event) {

	var start = document.querySelector('#start');
	var intro = document.querySelector('#intro');

	var camera = document.querySelector('#camera');
	var sceneEl = document.querySelector('a-scene');

	var stage = document.querySelector('#stage');

	var scene1 = document.querySelector('#scene-1');
	var scene2 = document.querySelector('#scene-2');

	var parp = document.querySelector('#parp');
	var parp_exit = document.querySelector('#parp_exit');


	var parp_inhibitor = document.querySelector('#parp-inhibitor');
	var parp_inhibitor_exit = document.querySelector('#parp_inhibitor_exit');

	var good_dna = document.querySelector('#dna');
	var broken_dna = document.querySelector('#dna_single_broken');

	// Sounds

	var sounds = [];

	var vo1 = document.querySelector('#vo1');

	sounds.push(vo1);

	// Put a loop to loop through sounds and pause them all.

	vo1.pause();


	start.addEventListener('click', function(){
		begin();
	});


	var begin = function(){
		removeFromDom(intro);

		playVO(vo1);

		sceneEl.setAttribute('visible', 'true');
		sceneEl.setAttribute('vr-mode-ui', 'enabled:true');

		parp.emit('scene-start');
		parp_inhibitor.emit('scene-start');
	}

	// Repaired

	parp_exit.addEventListener('animationstart', function(){
		setTimeout(function(){
			hide(broken_dna);
			show(good_dna);
		}, 10000)
	})

	parp_exit.addEventListener('animationend', function(){
		removeFromDom(parp);
		scene2.emit('moveIn');
		scene2.setAttribute('visible', 'true');
	});

	parp_inhibitor_exit.addEventListener('animationend', function(){
		removeFromDom(parp_inhibitor);
		scene2.emit('moveIn');
		scene1.emit('moveOut');
	});


	var playVO = function(sound){
		setTimeout(function(){
			sound.play();
		}, 1200)
	}


	var removeFromDom = function(element){
		element.parentNode.removeChild(element);
	}

	var hide = function(element){
		element.setAttribute('visible', 'false');
	}

	var show = function(element){
		element.setAttribute('visible', 'true');
	}




})