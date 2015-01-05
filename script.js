var grid;

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;

$(document).ready(function(){
	$('body').prepend("<div id='game-container'></div>")
 	
 	grid = new Grid(4, 4);

	//Add tiles
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();
	grid.addNewTile();




	//render grid
	grid.render();

	//add keyboard events
	$('body').keydown(function(e) 				// this shouldn't be on body, make sure to fix this. 
	{
		var key = e.keyCode;
		if(isValidKey(key))
		{
			var direction;
			switch(key)
			{
				case LEFT: 
					direction = "left";
					break;
				case RIGHT: 
					direction = "right";
					break;
				case UP:
					direction = "up";
					break;
				case DOWN:
					direction = "down";
					break;
			}

			grid.moveTiles(direction);
			grid.addNewTile();
			grid.render();
		}
	})
});

var isValidKey = function(keyCode)
{
	var validKeys = [LEFT, RIGHT, UP, DOWN];
	for(var i=0; i<validKeys.length; i++)
	{
		if(keyCode == validKeys[i])
		{
			return true;
		}
	}
	return false;
}