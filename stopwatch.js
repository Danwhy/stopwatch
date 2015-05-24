var T = (function(){
	'use strict';

	var startTimer = function(timestamp){
		T.start = timestamp || new Date().getTime();
		reset();
		render(T.start);
		return T.start;
	}

	var padZero = function(num){
		if (num.toString(10).length === 1){
			return '0' + num.toString();
		} else {
			return num.toString();
		}
	}

	var render = function(start){
		T.timerID = setInterval(function(){
			var time = (new Date().getTime() - start).toString();
			var centiseconds = time.slice(-3, -1) || '00';
			var seconds = Math.floor((time / 1000) % 60);
			var minutes = Math.floor((time / (1000 * 60)) % 60);
			$('#timer').text(padZero(minutes) + ':' + padZero(seconds) + ':' + padZero(centiseconds));
		}, 10);
	}

	var reset = function(){
		clearInterval(T.timerID);
		$('#timer').text('00:00:00');
	}

	var pause = function(){
		clearInterval(T.timerID);
		var time = $('#timer').text();
		var mIntoMS = +(time.substr().slice(0, -6)) * 60000;
		var sIntoMS = +(time.substr().slice(-5, -3)) * 1000;
		var csIntoMS =  +(time.substr().slice(-2) + '0');
		T.pausedTime = mIntoMS + sIntoMS + csIntoMS;
	}

	var continueFunc = function(){
		startTimer(new Date().getTime() - T.pausedTime);
	}

	var split = function(){
		$('#timer').after('<div class="split">00:00:00</div>');
	}

	return {
		startTimer : startTimer,
		reset : reset,
		pause : pause,
		continueFunc : continueFunc,
		split: split
	}
}());
