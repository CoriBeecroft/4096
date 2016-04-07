var TileManager = function(game, grid, gridAnalyzer)
{
	this.game = game;
	this.grid = grid;
	this.gridAnalyzer = gridAnalyzer;

	this.areTilesAnimating;
	this.tilesAnimating = 0;

	this.tilesMovedOrMerged = false;
}

//Add new tile to random empty cell in grid
//Grid needs to be initialized first
TileManager.prototype.addTile = function()			//Should be adds new tile in random empty cell if no args, but if args, then adds specified tile to specified cell location
{
	var emptyCells = this.gridAnalyzer.getEmptyCells();

	if(emptyCells.length > 0)
	{
		//Pick a random empty cell
		var randomIndex = parseInt(Math.random()*emptyCells.length);
		var randomCell = emptyCells[randomIndex];	

		//Add tile
		var tile = new Tile(randomCell, this, this.game.animated);
		randomCell.addTile(tile);
		return tile;
	}
	else //return error
	{
		return -1;
	}
}

TileManager.prototype.moveMergeTiles = function(direction)
{
	this.tilesMovedOrMerged = this.gridAnalyzer.calculateMovedAndMergedTilePositions(direction);
	
	if(this.game.animated)
	{
		this.animateTilesMoving(direction);
	}
	else
	{
		this.updateTiles(direction);
		this.checkForDeath();
	}

	return this.tilesMovedOrMerged;
}

TileManager.prototype.animateTilesMoving = function(direction)
{
	var cells = this.gridAnalyzer.getNonEmptyCells();

	for(var i=0; i<cells.length; i++)
	{
		cells[i].tile.animateMove();
	}

	this.areTilesAnimating = setInterval($.proxy(function()
	{
		if(this.tilesAnimating == 0)
		{
			this.updateTiles(direction);
			this.checkForDeath();
		}
	}, this, direction), 10);
}

TileManager.prototype.updateTiles = function(direction)
{
	this.updateTilePositions(direction);
	this.excuteTileMerges();
	this.grid.render();

	if(this.tilesMovedOrMerged)
	{
		this.addTile();
	}

	clearInterval(this.areTilesAnimating);
	keyHandlingInProgress = false;
	manageKeydowns();
}

TileManager.prototype.excuteTileMerges = function()
{
	var cells = this.gridAnalyzer.getNonEmptyCells();
	for(i=0; i<cells.length; i++)
	{
		cells[i].tile.executeMerge();
	}
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

TileManager.prototype.checkForDeath = function()
{
	//if dead
	if(!this.gridAnalyzer.canMoveOrMerge())
	{
		this.game.handleDeath();
	}
}