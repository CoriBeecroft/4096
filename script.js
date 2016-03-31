var grid;
var game;

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
var A = 65;

var keyHandlingInProgress = false;
var keysToBeHandled = [];

$(document).ready(function()
{
	$('main').prepend("<h1>4096</h1><div id='game-container' tabindex='0'></div>");
	$('#game-container').focus();

	grid = new Grid(4, 4);

	game = new Game(grid);
	game.automatedAlgorithm = $('textarea').val();

	$('div#game-container').keydown(manageKeydowns);

	$('button').click(function()
	{
		game.automatedAlgorithm = $('textarea').val();
	});
});

var manageKeydowns = function(e)
{
	if(!keyHandlingInProgress)
	{
		var keyEvent;
		
		if(keysToBeHandled.length > 0)
		{
			keyEvent = keysToBeHandled[0];
			keysToBeHandled.shift();			//removes first element
		}
		else
		{
			keyEvent = e;
		}
		if(keyEvent)
		{
			keydownHandler(keyEvent);
		}
	}
	else
	{
		keysToBeHandled.push(e);
	}
}

var keydownHandler = function(e) 	
{
	keyHandlingInProgress = true;	

	var key = e.keyCode;
	
	if(isValidKey(key))	
	{
		var direction;
		switch(key)
		{
			case A: 
				game.setAutomated(!game.automated);
				game.runGame();
				break;
			default: 
				game.takeTurn(e.keyCode);
		}
	}
}

var isValidKey = function(keyCode)
{
	var validKeys = [LEFT, RIGHT, UP, DOWN, A];
	for(var i=0; i<validKeys.length; i++)
	{
		if(keyCode == validKeys[i])
		{
			return true;
		}
	}
	return false;
}