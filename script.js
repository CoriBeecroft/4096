var grid;

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
var A = 65;

$(document).ready(function()
{
	$('body').prepend("<div id='game-container' tabindex='0'></div>");
	$('#game-container').focus();		//gives #game-container focus on page load

	grid = new Grid(4, 4);

	var game = new Game(grid);

	$('div#game-container').keydown(function(e) 	
	{
		e.stopPropagation();
	
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
					game.makeMove(e.keyCode);
			}
		}
	});

	$('button').click(function()
	{
		game.automatedAlgorithm = $('textarea').val();
	});
});

var isValidKey = function(keyCode)				//is this the right place for this?
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



for(var i=0; i<10; i++)
{
	console.log(i%5);
}