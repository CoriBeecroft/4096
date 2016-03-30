var TileManager = function(grid, gridAnalyzer)
{
	this.grid = grid;
	this.gridAnalyzer = gridAnalyzer;
}

TileManager.prototype.addTile = function()			//Should be adds new tile in random empty cell if no args, but if args, then adds specified tile to specified cell location
{
	//
	//Add new tile to random empty cell in grid
	//

	//Find empty cells
	var emptyCells = this.gridAnalyzer.getEmptyCells();
	
	//Pick a random one
	if(emptyCells.length > 0)
	{
		var randomIndex = parseInt(Math.random()*emptyCells.length);
		var randomCell = emptyCells[randomIndex];	

		//Add tile
		var tile = new Tile(randomCell);
		randomCell.addTile(tile);
	//	this.grid.render();
		return tile;
	}
	else //return error
	{
		return -1;
	}

}

TileManager.prototype.animateNewTile = function(tile)
{
	console.log(tile);
	tile.getElement().animate({height: "106px", width: "106.25px"}, 5000, function(){});
}

TileManager.prototype.animateTiles = function(direction)
{
	var cells = this.gridAnalyzer.getNonEmptyCells();

	for(var i=0; i<cells.length; i++)
	{
		cells[i].tile.animateMove(direction);
	}
}