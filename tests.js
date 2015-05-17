test('check that timer is zero', function(){
	T.startTimer();
	var initval = $('#timer').text();
	equal(initval, "00:00:00", 'Initial value is 0');
});

test('check start button exists', function(){
	equal($('#start').attr('value'), 'Start', 'Start button exists');
});

test('startTimer starts from current time', function(){
	var timestamp = Math.floor(new Date().getTime()/1000);
	var start = Math.floor(T.startTimer()/1000);
	equal(start, timestamp);
});

test('check start button calls start()', function(){
	$('#start').trigger('click');
	var timestamp = Math.floor(new Date().getTime()/1000);
	var start = Math.floor(T.start/1000);
	equal(start, timestamp);
});

test('startTimer accepts a timestamp parameter', function(){
	var timestamp = new Date().getTime() + 3000;
	var start =	T.startTimer(timestamp);
	equal(start, timestamp);
});

test('counter counts one second per second', function( assert ){
	T.startTimer();
	var done = assert.async();
	setTimeout(function(){
		if($('#timer').text().substr(4,4) === '1:00' || ($('#timer').text().substr(4,4) === '0:99')){
			var round = '1:00';
		}
		equal(round, '1:00');
		done();
	}, 1000);
});

test('reset function resets the counter to 0', function(){
	$('#timer').text('11:11:11');
	T.reset();
	equal($('#timer').text(), '00:00:00');
});

test('reset button calls reset function', function(){
	$('#reset').trigger('click');
	equal($('#timer').text(), '00:00:00');
});

test('counter counts ten seconds in ten seconds', function( assert ){
	T.startTimer();
	var done = assert.async();
	setTimeout(function(){
		if($('#timer').text().substr(3,5) === '10:00' || ($('#timer').text().substr(3,5) === '09:99')){
			var round = '10:00';
		}
		equal(round, '10:00');
		done();
	}, 10000);
});

test('pause function pauses timer', function( assert ){
	T.pause();
	var done = assert.async();
	var paused = $('#timer').text();
	setTimeout(function(){
		equal(paused, $('#timer').text());
		T.continueFunc();
		done();
	}, 500);
});

test('continue function unpauses timer', function( assert ){
	var pausedTime;
	T.startTimer();
	var done = assert.async();
	setTimeout(function(){
		T.pause();
		pausedTime = $('#timer').text();
	}, 1000);
	setTimeout(function(){
		T.continueFunc();
	}, 1000);
	setTimeout(function(){
		notEqual(pausedTime, $('#timer').text());
		done();
	}, 100);
});

test('timer adds one minute after 60 seconds', function( assert ){
	var done = assert.async();
	T.startTimer(new Date().getTime() - 59000);
	setTimeout(function(){
		equal($('#timer').text().substr(0,2), '01');
		done();
	}, 1100);
});
