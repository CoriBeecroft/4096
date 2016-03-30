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
	}
	else //return error
	{
		return -1;
	}
}

TileManager.prototype.animateTiles = function(direction)			//ok for now, but it will be pretty damn different once movement is implemented
{
	//Try to make this simpler later
	if(direction == 'left')
	{
		var nonEmptyCells = this.gridAnalyzer.getNonEmptyCells();
	
		for (var i = 0; i<nonEmptyCells.length; i++)
		{
			var tile = nonEmptyCells[i].tile;
			var numCellsToMove = tile.moveLeft;
			var distanceToMove = (Grid.cellWidth + Grid.cellMargin) * numCellsToMove;
			tile.getElement().animate({right: distanceToMove + "px"}, 300, $.proxy(this.afterAnimation, this, tile));
		}
	}
	else if(direction == 'right')
	{
		var nonEmptyCells = this.gridAnalyzer.getNonEmptyCells();
	
		for (var i = 0; i<nonEmptyCells.length; i++)
		{
			var tile = nonEmptyCells[i].tile;
			var numCellsToMove = tile.moveRight;
			var distanceToMove = (Grid.cellWidth + Grid.cellMargin) * numCellsToMove;
			tile.getElement().animate({left: distanceToMove + "px"}, 300, $.proxy(this.afterAnimation, this, tile));
		}	
	}
	else if(direction == 'up')
	{
		var nonEmptyCells = this.gridAnalyzer.getNonEmptyCells();
	
		for (var i = 0; i<nonEmptyCells.length; i++)
		{
			var tile = nonEmptyCells[i].tile;
			var numCellsToMove = tile.moveUp;
			var distanceToMove = (Grid.cellWidth + Grid.cellMargin) * numCellsToMove;
			tile.getElement().animate({bottom: distanceToMove + "px"}, 300, $.proxy(this.afterAnimation, this, tile));
		}
	}
	else if(direction == 'down')
	{
		var nonEmptyCells = this.gridAnalyzer.getNonEmptyCells();
	
		for (var i = 0; i<nonEmptyCells.length; i++)
		{
			var tile = nonEmptyCells[i].tile;
			var numCellsToMove = tile.moveDown;
			var distanceToMove = (Grid.cellWidth + Grid.cellMargin) * numCellsToMove;
			tile.getElement().animate({top: distanceToMove + "px"}, 300, $.proxy(this.afterAnimation, this, tile));
		}
	}	
}

TileManager.prototype.afterAnimation = function(tile)		//Reconsider name
{
	//Update new tiles positions, mergeable tiles are merged and add a new tile to the grid
	tile.updatePosition();
	this.grid.render();
}