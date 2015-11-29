var grid;

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;
var A = 65;

$(document).ready(function(){
	$('body').prepend("<div id='game-container'></div>")

 	for(var i= 0; i<1; i++)
 	{
 		grid = new Grid(4, 4);

		//Add tiles
		grid.addNewTile();
		grid.addNewTile();

		//Render grid
		grid.render();

 		var game = new Game();
		$('body').keydown(function(e) 	// this shouldn't be on body, make sure to fix this. 
		{
console.log("other keydown");
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
				}
			}
		})

	$('body').keydown(function(e) 	// this shouldn't be on body, make sure to fix this. 
	{
		game.makeMove(e.keyCode)
	});


	//game.makeMove();
 	}
});

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