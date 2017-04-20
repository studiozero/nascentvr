var $ = function(el){
	return document.querySelector(el)
}


document.addEventListener("DOMContentLoaded", function(event) {

	// Asset loaded func
	var assetLoaded = function(event){
		loader.value = loader.value += prog_steps;
		console.log(loader.value);
		if(loader.value > 99){
			removeFromDom(loader);
		}
	}

	// Enter Buttons
	var enter_webvr = $('.enter-vr');
	var enter_desktop = $('.enter-desktop');
	var enter_mobile = $('.enter-mobile');

	var assets = [];
	var vr_active = false;
	var asset_items = document.querySelectorAll('a-asset-item');
	var loader = document.querySelector('progress');

	for(a = 0; a < asset_items.length; a++){
		asset_items[a].addEventListener('loaded', assetLoaded);
		console.log(asset_items)
	}

	var prog_steps = 100 / asset_items.length;

	var intro = $('#intro');

	var camera = $('#camera');
	var sceneEl = $('a-scene');

	var stage = $('#stage');

	var scene1 = $('#scene-1');
	var scene2 = $('#scene-2');

	var parp = $('#parp');
	var parp_exit = $('#parp_exit');


	var parp_inhibitor = $('#parp-inhibitor');
	var parp_inhibitor_exit = $('#parp_inhibitor_exit');

	var good_dna = $('#dna');
	var broken_dna = $('#dna_single_broken');

	var s2Entrance = $('#s2Entrance');

	var PIB = $('#parp-inhibitor-break');

	var s2_damaged = $('#s2_dna_single_broken');
	var s2_forked = $('#dead_dna');

	var remove_headset = $('#remove-headset');
	var outro = $('#outro');


	// Sounds

	var sounds = [];

	var vo1 = $('#vo1');
	var vo2 = $('#vo2');

	sounds.push(vo1);
	sounds.push(vo2);


	// Put a loop to loop through sounds and pause them all.

	for(i = 0; i < sounds.length; i++){
		sounds[i].pause();
	}

	var playPause = function(){
		for(i = 0; i < sounds.length; i++){
			sounds[i].play();
			sounds[i].pause();
		}		
	}

	enter_desktop.addEventListener('click', function(event){
		event.preventDefault();
		playPause();
		begin();
	});

	enter_mobile.addEventListener('click', function(event){
		event.preventDefault();
		playPause();
		begin();
	});

	enter_webvr.addEventListener('click', function(event){
		event.preventDefault();
		playPause();
		sceneEl.enterVR();
		begin();
	});

	sceneEl.addEventListener('enter-vr', function () {
  	console.log("ENTERED VR");
  	vr_active = true;
	});

	sceneEl.addEventListener('exit-vr', function () {
  	console.log("EXITED VR");
  	vr_active = false;
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
			initOutro();
		}, 6000);

	});

	var initOutro = function(){

		// If we are in VR mode - show remove headset screen - wait - then exit VR mode

		if(vr_active){
			show_remove();
		} else {
			show_remove();
		}

	}

	var show_remove = function(){
		remove_headset.setAttribute('visible', true);
		setTimeout(function(){
			sceneEl.exitVR();
			runEnd();
		}, 3000)
	}

	var runEnd = function(){
		sceneEl.setAttribute('visible', 'false');
		sceneEl.setAttribute('vr-mode-ui', 'enabled:false');
		outro.style.display='flex';
	}

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