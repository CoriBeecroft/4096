var TileManager = function(grid, gridAnalyzer)
{
	this.grid = grid;
	this.gridAnalyzer = gridAnalyzer;
	this.areTilesAnimating = setInterval(function(){}, 100);
}

TileManager.tilesAnimating = 0;				//Not sure if this makes sense, but it's convenient right now

//Grid needs to be initialized first
TileManager.prototype.addTile = function(animateGenesis)			//Should be adds new tile in random empty cell if no args, but if args, then adds specified tile to specified cell location
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
		var tile = new Tile(randomCell, animateGenesis);
		randomCell.addTile(tile);
		return tile;
	}
	else //return error
	{
		return -1;
	}
}

TileManager.prototype.animateTiles = function()
{
	var cells = this.gridAnalyzer.getNonEmptyCells();

	for(var i=0; i<cells.length; i++)
	{
		cells[i].tile.animate();
	}

	//set an interval
	this.areTilesAnimating = setInterval($.proxy(function()
	{
		console.log(TileManager.tilesAnimating);
		if(TileManager.tilesAnimating == 0)
		{
			this.afterTilesAnimate();
		}
	}, this), 300);
}

//A function to be called after all the tiles have animated and their callbacks have been executed
TileManager.prototype.afterTilesAnimate = function()
{
	console.log("All tiles have finished animating");
	clearInterval(this.areTilesAnimating);
	keyHandlingInProgress = false;
	manageKeydowns();
}