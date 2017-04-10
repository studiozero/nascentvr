var $ = function(el){
	return document.querySelector(el)
}


document.addEventListener("DOMContentLoaded", function(event) {

	var assets = document.querySelector('a-assets');

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

	var s2Entrance = document.querySelector('#s2Entrance');

	var PIB = document.querySelector('#parp-inhibitor-break');

	var s2_damaged = document.querySelector('#s2_dna_single_broken');
	var s2_forked = $('#dead_dna');

	// Sounds

	var sounds = [];

	var vo1 = document.querySelector('#vo1');
	var vo2 = document.querySelector('#vo2');

	sounds.push(vo1);
	sounds.push(vo2);


	// Put a loop to loop through sounds and pause them all.

	for(i = 0; i < sounds.length; i++){
		sounds[i].pause();
	}

	assets.addEventListener('loaded', function(){
		console.log('assets loaded')
	});

	start.addEventListener('click', function(){
		begin();
		

		for(i = 0; i < sounds.length; i++){
			sounds[i].play();
			sounds[i].pause();
		}

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
		scene2.setAttribute('visible', 'true');
	});

	parp_inhibitor_exit.addEventListener('animationend', function(){
		hide(parp_inhibitor);
		scene1.emit('moveOut');
		scene2.emit('moveIn');
	});


	// Scene 2

	s2Entrance.addEventListener('animationend', function(){
		hide(scene1);
		playVO(vo2);
		PIB.emit('scene-start');

		setTimeout(function(){
			hide(s2_damaged);
			show(s2_forked);
			$('#broken_model_2').emit('kill-cell');
		}, 10000);


	});


	$('#break_animation').addEventListener('animationstart', function(){

		setTimeout(function(){
			scene2.emit('moveOut');

			hide(scene2);
			sceneEl.setAttribute('visible', 'false');
			sceneEl.setAttribute('vr-mode-ui', 'enabled:false');

			$('#outro').style.display = '';
		}, 6000);

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