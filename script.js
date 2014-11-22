$(document).ready(function(){
	renderGrid(gridHeight, gridWidth);
	$('body').append("<div class='tile-container'></div>");
	addTile(generateTile());
	addTile(generateTile());
});


var gridHeight = 4;
var gridWidth = 4;
var renderGrid = function(gridHeight, gridWidth)
{
	$('body').prepend("<div class='grid'></div>");
	var grid = $('.grid');
	for(var i=0; i<gridHeight; i++)
	{
		grid.append("<div class='grid-row'></div>");
		for(var j=0; j<gridWidth; j++)
		{
			if($('div.grid-row').length == 1)
			{
				$('div.grid-row').append("<div class='grid-cell'></div>");
			}
			else
			{
				$($('div.grid-row')[i]).append("<div class='grid-cell'></div>");
			}
		//	console.log($('div.grid-row')[i]);
		}
	}
}

var addTile = function(tile)
{
	$('div.tile-container').append(tile);
	
	tile = $('div.tile');
	setTilePosition(tile);
}

var setTilePosition = function(tile)
{
	//Should probably add some type checking on tile, 'cause this might be dangerous otherwise. 
	//extract x and y values
	var x = tile.attr('x');
	var y = tile.attr('y');
	console.log(y);
	//convery to top and left values
	x = x*(106.25 + 18);
	y = y*(106.25 + 15);

	//add inline css
	tile.css("left", x + "px");
	tile.css( "top", y + "px");
}

var generateTile = function() 
{
	//generate coordinates
	//Right now this is for an empty grid, later change this so that it picks a random x or y that has empty spaces, then randomly pick from the empty spacecs. 
	var x = parseInt(Math.random()*gridWidth);
	var y = parseInt(Math.random()*gridHeight);

	//generate value
	var value = (parseInt(Math.random()*5) % 5 == 0) ? (4) : (2);

	//generate tile
	var tile ="<div class='tile' x='" + x + "' y='" + y + "'>" + value + "</div>";				//Maybe get rid of the value class. The value should probably be in an attribute or something, but

	return tile;
}