var $ = function(el){
	return document.querySelector(el)
}


var images = [
	'assets/models/parp_tex.png',
	'assets/images/damage_label.png',
	'assets/images/inhibitor_label.png'
]

document.addEventListener("DOMContentLoaded", function(event) {

	var progress = 0;
	var loaded = 0;
	var asset_items = document.querySelector('a-assets').children;
	var total =  asset_items.length + images.length;
	var loading = document.querySelector('.loading');
	var loader = document.querySelector('.progress');
	var isChriOS = navigator.userAgent.match('CriOS');


	// Asset loaded function
	var assetLoaded = function(event){
		loaded = loaded + 1;
		progress = Math.round( (loaded / total * 100) ) + '%';
		loader.innerHTML = progress;
		if(progress === '100%'){
			removeFromDom(loading);
			showStartScreen();
		}
	}

	var showStartScreen = function(){
		enter.style.display = 'block';

		if(navigator.userAgent.match('CriOS')){
			hide(enter_webvr);
		}
	
	}


	var loadImages = function(){

		images.forEach(function(src){
			var img = new Image();
		
			img.onload = function(){
				assetLoaded();
			}
			
			img.src = src;
		})
	
	}

	// Enter Buttons
	var enter = $('.enter-buttons');
	var enter_webvr = $('.enter-vr');
	var enter_desktop = $('.enter-desktop');
	var enter_mobile = $('.enter-mw');

	var assets = [];
	var vr_active = false;

	for(a = 0; a < asset_items.length; a++){

		console.log(asset_items[a]);
		
		var type = asset_items[a].tagName;

		switch(type){

			case "AUDIO":
				asset_items[a].addEventListener('canplay', assetLoaded);
				break;

			case "A-ASSET-ITEM":
				asset_items[a].addEventListener('loaded', assetLoaded);
				break;
		}
	}

	var intro = $('.intro');

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

		if(!isChriOS){
			sceneEl.setAttribute('vr-mode-ui', 'enabled:true');
		}

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

	// Init Functions 
	loadImages();

})