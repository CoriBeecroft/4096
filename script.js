var grid;
var game;

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
var A = 65;

var keyHandlingInProgress = false;
var keysToBeHandled = [];

var header = function()
{
	var header = $('<header>');
	header.append('<div id="title-container"></div>');
	header.append('<div id="button-container"></div>');
	header.children('div#title-container').append('<h1>4096</h1><p>Dis is what dis game is all aboot!</p>');
	header.children('div#button-container').append('<button class="new-game">New Game</button><button>Run Automated</button>');

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

	$('div#game-container').keydown(manageKeydowns);

	$('button.new-game').click(function()
	{
		game.newGame();
	});


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
				keyHandlingInProgress = false;
				break;
			case LEFT:
			case RIGHT: 
			case UP: 
			case DOWN:
				game.takeTurn(e.keyCode);
				break;
		}
	}
	else
	{
		keyHandlingInProgress = false;
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