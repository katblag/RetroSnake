var Snake = function () {
	this.direction = "west";
	this.body = [[8, 15], [8, 16], [8, 17], [8, 18]];
	this.eatenApples = 0;
};

Snake.prototype.turn = function (direction) {
	this.direction = direction;
};

Snake.prototype.move = function (newHead, game) {	
	this.body.unshift(newHead);
	for (var a = 0; a < game.apples.length; a++) {
		if (newHead[0] === game.apples[a][0] &&
			newHead[1] === game.apples[a][1]) {
			game.apples.splice(a, 1);
			this.eatenApples += 1;
			game.placeApple();
			return;	
		}	
	}
	this.body.pop();
};



var Board = function () {
	this.gameOver = false;
	this.grid = makeGrid();	
	this.snake = new Snake();	
	this.apples = [];
	
	for (var i = 0; i < 4; i++) {
		this.placeApple();
	}
};

var makeGrid = function() {
	var array = new Array();
	for (var i = 0; i < 16; i++){
		array.push(new Array());
		for (var j = 0; j < 16; j++){
			array[i].push(" ");
		}
	}
	return array
};

Board.prototype.placeApple = function () {
	this.apples.push([Math.floor(Math.random() * 16),
			 		  Math.floor(Math.random() * 16)]);
};

Board.prototype.step = function () {
	if (this.snake.direction === "west") {
		var colMovement = -1;
	} else if (this.snake.direction === "east") {
		var colMovement = 1;
	} else if (this.snake.direction === "south") {
		var rowMovement = 1;
	} else {
		var rowMovement = -1;
	}
	
	var oldHead = this.snake.body[0];
	
	if (rowMovement) {
		var newHead = [oldHead[0] + rowMovement, oldHead[1]];
	} else {
		var newHead = [oldHead[0], oldHead[1] + colMovement];
	}
	
	this.validMove(newHead);
};

Board.prototype.validMove = function (newHead) {
	if (newHead[0] > 15 || newHead[0] < 0 ||
		newHead[1] > 15 || newHead[1] < 0) {
			this.gameOver = true;
		}
		
	for ( var i = 0; i < this.snake.body.length; i++) {
		if (newHead[0] === this.snake.body[i][0] &&
			newHead[1] === this.snake.body[i][1])
			this.gameOver = true;
	}
	
	if(!this.gameOver){
		this.snake.move(newHead, this);
	}
};