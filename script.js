var grid;
var game;

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
var A = 65;
var N = 78;

var header = function()
{
	var header = $('<header>');
	header.append('<div id="title-container"></div>');
	header.append('<div id="button-container"></div>');
	header.children('div#title-container').append('<h1>4096</h1><p>Use the arrow keys to move and merge the tiles to get the 4096 tile</p>');
	header.children('div#button-container').append('<button class="new-game">New Game</button><button class="toggle-automation">Run Automation</button>');

	return header;
}

$(document).ready(function()
{
	$('main').prepend("<div id='game-container' tabindex='0'></div>");
	$('main').prepend(header());
	$('#game-container').focus();

	grid = new Grid(4, 4);

	game = new Game(grid);
	game.automatedAlgorithm = $('textarea').val();

	$('div#game-container').keydown(keydownHandler);

	$('button.new-game').click(function()
	{
		game.newGame();
	});

	$('button.toggle-automation').click(function()
	{
		game.setAutomated(!game.automated);
	});

	$('button').click(function()
	{
		game.automatedAlgorithm = $('textarea').val();
	});
});

var keydownHandler = function(e) 	
{
	var key = e.keyCode;

	if(isValidKey(key))	
	{
		e.preventDefault();
		e.stopPropagation();
		switch(key)
		{
			case A: 
				game.queueMove('a');	//ok, does it really make sense to be sending this into queueMove? Something needs to be changed here. 
				break;
			case N:
				game.newGame();
				break;
			case LEFT:
				game.queueMove('left');
				break;
			case RIGHT: 
				game.queueMove('right');
				break;
			case UP: 
				game.queueMove('up');
				break;
			case DOWN:
				game.queueMove('down');
				break;
			default: 
				console.log("Invalid input");
		}
	}
}

var isValidKey = function(keyCode)
{
	var validKeys = [LEFT, RIGHT, UP, DOWN, A, N];
	for(var i=0; i<validKeys.length; i++)
	{
		if(keyCode == validKeys[i])
		{
			return true;
		}
	}
	return false;
}