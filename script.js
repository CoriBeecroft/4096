var grid;
$(document).ready(function(){
	$('body').prepend("<div id='game-container'></div>")
 	
 	grid = new Grid(4, 4);

	//Add tiles
	grid.addNewTile();
	grid.addNewTile();

	//render grid
	grid.render();

	//add keyboard events
	$('body').keydown(function(e){				// this shouldn't be on body, make sure to fix this. 

		if(isValidKey(e.keyCode))
		{
		//	moveTiles("left");		//need to input direction, duh
			grid.addNewTile();
			grid.render();
		}
	})
});

var moveTiles = function(direction)
{
	for(var i=0; i<tiles.length; i++)
	{
		for(var j=0; j<tiles[i].length; j++)
		{
			moveTile(tiles[i][j], direction);
		}
	}
}

var moveTile = function(tile, direction)
{
	//check if tile can move
	if(tileCanMove(direction))
	{
		//compute tile end position
		//move tile
	}
}

var tileCanMove = function(tile, direction)
{
	direction = direction + "";
	direction = direction.toLowerCase();
	var tileToCheck; 

	//check for empty adjacent spaces or equivalent adjacent tiles
	switch (direction)
	{
		case "left":
		//	tileToCheck = 
		case "right":
			console.log("oddling");
		case "up":
			console.log("oddling");
		case "down":
			console.log("oddling");
		default:
			console.log("oddling");				 
	}
}

var isValidKey = function(keyCode)
{
	var validKeys = [37, 38, 39, 40];
	for(var i=0; i<validKeys.length; i++)
	{
		if(keyCode == validKeys[i])
		{
			return true;
		}
	}
	return false;
}