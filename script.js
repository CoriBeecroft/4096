$(document).ready(function(){
	renderGrid(gridHeight, gridWidth);
	$('body').append("<div class='tile-container'></div>");

	var tile = new Tile();
	tiles[tile.x][tile.y] = tile;
	tile = new Tile();
	tiles[tile.x][tile.y] = tile;
});

var tiles = [[], [], [], []]; 

//These aren't fully being used right now. 
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