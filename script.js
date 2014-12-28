//		TODO: 
//	Make a traverse tiles function that takes in functions. 
//	Make the two-dee tiles array into a graph instead 'cause that will be so much cooler, holmes. 
//
//

var grid;
$(document).ready(function(){
	$('body').prepend("<div id='game-container'></div>")
 	grid = new Grid(4, 4);
	grid.render();
	//$('div#game-container').append("<div class='tile-container'></div>");

	//Add tiles
	addNewTile();
	addNewTile();

	//add keyboard events
	$('body').keydown(function(e){				// this shouldn't be on body, make sure to fix this. 

		if(isValidKey(e.keyCode))
		{
			moveTiles("left");		//need to input direction, duh
			addNewTile();
		}

		
	/*	for(var i=0; i<tiles.length; i++)
		{
			for(j=0; j<tiles[i].length; j++)
			{
				
			}
		}*/
	})
});


//var tiles = [new Array(4), new Array(4), new Array(4), new Array(4)];

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
	//console.log(direction);
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
			console.log("test")
			return true;
		}
	}
	return false;
}

var addNewTile = function()					//don't add if the grid is full
{
	if(!grid.isFull())
	{
		var tile = new Tile(findEmptyCellCoordinates());
		tiles[tile.x][tile.y] = tile;	
	}
}

/*var isGridFull = function()
{
	for(var i=0; i<tiles.length; i++)
	{
		for(var j=0; j<tiles[i].length; j++)
		{
			if(!tiles[i][j])
			{
				return false;
			}
		}
	}

	return true;
}*/

//These aren't fully being used right now. 
var gridHeight = 4;
var gridWidth = 4;

//need to make sure there actually are empty cells before running this. Maybe do a check in here.. Yeah, that would probably be a good idea.  
var findEmptyCellCoordinates = function()						//This probably needs to be tested a little more
{
	var emptyXCells = [];

	while(emptyXCells.length == 0)
	{
		var x = parseInt(Math.random()*4);			//Find a column with empty cells
		var y;
	
		for(var i=0; i<tiles[x].length; i++)
		{
			if(!tiles[x][i])
			{
				emptyXCells.push(i);
			}
		}
	}
	

	y = emptyXCells[parseInt(Math.random()*emptyXCells.length)];	//Choose a random empty cell from the chosen column
	console.log({ x: x, y: y});
	return { x: x, y: y};
}

