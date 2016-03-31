var TileManager = function(grid, gridAnalyzer)
{
	this.grid = grid;
	this.gridAnalyzer = gridAnalyzer;

	this.areTilesAnimating;
	this.tilesAnimating = 0;
}

//Grid needs to be initialized first
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
		var tile = new Tile(randomCell, this);
		randomCell.addTile(tile);
		return tile;
	}
	else //return error
	{
		return -1;
	}
}

TileManager.prototype.animateTiles = function(direction)
{
	var cells = this.gridAnalyzer.getNonEmptyCells();

	for(var i=0; i<cells.length; i++)
	{
		cells[i].tile.animate();
	}

	//set an interval
	this.areTilesAnimating = setInterval($.proxy(function()
	{
		if(this.tilesAnimating == 0)
		{
			this.afterTilesAnimate(direction);
		}
	}, this, direction), 10);
}

//A function to be called after all the tiles have animated and their callbacks have been executed
TileManager.prototype.afterTilesAnimate = function(direction)
{
	this.updateTilePositions(direction);
	this.grid.render();

	clearInterval(this.areTilesAnimating);
	keyHandlingInProgress = false;
	manageKeydowns();
}

TileManager.prototype.updateTilePositions = function(direction)
{
	if(direction == 'left')
	{
		for(var j=0; j<this.grid.height; j++)
		{
			for(var i=0; i<this.grid.width; i++)
			{
				var currentCell = this.grid.cells[i][j];
				if(!currentCell.isEmpty())
				{
					currentCell.tile.updatePosition();
				}
			}
		}
	}

	else if(direction == 'right')
	{
		for(var j=0; j<this.grid.height; j++)
		{
			for(var i=this.grid.width-1; i>=0; i--)
			{
				var currentCell = this.grid.cells[i][j];
				if(!currentCell.isEmpty())
				{
					currentCell.tile.updatePosition();
				}
			}
		}
	}
	else if(direction == 'up')
	{
		for(var j=0; j<this.grid.height; j++)
		{
			for(var i=0; i<this.grid.width; i++)
			{
				var currentCell = this.grid.cells[i][j];
				if(!currentCell.isEmpty())
				{
					currentCell.tile.updatePosition();
				}
			}
		}
	}
	else if(direction == 'down')
	{
		for(var j=this.grid.height-1; j>=0; j--)
		{
			for(var i=0; i<this.grid.width; i++)
			{
				var currentCell = this.grid.cells[i][j];
				if(!currentCell.isEmpty())
				{
					currentCell.tile.updatePosition();
				}
			}
		}
	}
}