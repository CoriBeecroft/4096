var grid;
var game;

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
var A = 65;
var N = 78;

$(document).ready(function()
{
	$('#game-container').focus();

	grid = new Grid(4, 4);

	game = new Game(grid);
	game.automatedAlgorithm = editor.getValue();
	console.log(editor.getValue());
	
	//
	//	Attach input handlers
	//
	$('div#game-container').keydown(keydownHandler);

	$('button.new-game').click(function()
	{
		$('div#game-over').css('visibility', 'hidden');
		$('#game-over').css('opacity', '0');
		game.newGame();
	});

	$('button.keep-playing').click(function()
	{
		$('div#win-screen').css('visibility', 'hidden');
		$('#win-screen').css('opacity', '0');
		$('#game-container').focus();
		game.movementEnabled = true;
	});

	$('button.toggle-automation').click(function()
	{
		game.setAutomated(!game.automated);
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
				game.setAutomated(!game.automated);
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