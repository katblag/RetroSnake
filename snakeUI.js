var snakeUI = {
	setBoard: function() {
		for (var i = 0; i < 16; i++) {
			var div = $('<div></div>').attr('id', 'row' + i);
			$('#game').append(div);
			for (var j = 0; j < 16; j++) {
				var span = $('<span></span>').attr('id', 'row' + i + 'col' + j);
				$('#row' + i).append(span);
			}
		}
	},
	
	clearBoard: function() {
		$('span').removeClass('snake apple');
	},
	
	updateBoard: function() {
		for(var a = 0; a < board.apples.length; a++) {
			var apple = board.apples[a];
			$('#row' + apple[0] + 'col' + apple[1]).addClass('apple');
		}
		
		for(var s = 0; s < board.snake.body.length; s++) {
			var snakeBod = board.snake.body[s];
			$('#row' + snakeBod[0] + 'col' + snakeBod[1]).removeClass('apple')
			.addClass('snake');
		}
	},
	
	handleKeyEvent: function(event) {
		
	},
	
	start: function() {
		var startTime = new Date();
		
		$('body').on("keydown", function(event) {
			if(event.keyCode === 37) {
				board.snake.turn("west");
			} else if (event.keyCode === 38) {
				board.snake.turn("north");
			} else if (event.keyCode === 39) {
				board.snake.turn("east");
			} else if (event.keyCode === 40) {
				board.snake.turn("south");
			}
		})
		
		var run = window.setInterval(function () {
			var nowTime = new Date();
			var timer = startTime - nowTime;
			var tString = timeString(startTime, nowTime);
			
			snakeUI.clearBoard();
			board.step();
			snakeUI.updateBoard();
			$('#score').html("Apples: " + board.snake.eatenApples + tString);
			
			if(board.gameOver) {
				alert("You died!");
				window.clearInterval(run);
				
				$('#start').html("Press spacebar to start new game");
				$('body').on("keydown", function(event) {
					if(event.keyCode === 32) {
						$('body').off("keydown");
						$('#start').empty();
						board = new Board();
						snakeUI.start();
					}
				});
			}
		}, 150);	
	}
}

var timeString = function (time1, time2) {
	var diff = time2 - time1;
	var mins = Math.floor(diff / 60000);
	var secs = Math.floor((diff - (mins * 60000)) / 1000);
	var minString = function() {
		if (mins < 10) {
			return "0" + mins;
		} else {
			return mins;
		}
	}
	
	var secsString = function() {
		if (secs < 10) {
			return "0" + secs;
		} else {
			return secs;
		}
	}
	
	return  "Time: " + minString() + ":" + secsString();
}

board = new Board();

$(function () {
	$('#start').html("Press spacebar to start new game");
	snakeUI.setBoard();
	
	
	$('body').on("keydown", function(event) {
		if(event.keyCode === 32) {
			$('body').off("keydown");
			$('#start').empty();
			snakeUI.start();
		}
	});
})
