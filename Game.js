var Game = function(grid, automatedAlgorithm)
{
	
	this.grid = grid;
	this.valueGrid = new ValueGrid(this.grid);
	this.gridAnalyzer = new GridAnalyzer(this.grid);
	this.tileManager = new TileManager(this.grid, this.gridAnalyzer);

	this.automatedAlgorithm = automatedAlgorithm;
	this.dead = false;
	this.lastMove = "left"; 
	this.turn = 0;
	this.nonMovingStreak = 0;
	this.automated = false;
	this.automatedGameSpeed = 10;		//Milliseconds per automated turn
	

	//Render grid
	this.grid.render();		//Might not even want this here, or maybe this is the only place it should be, because it just needs to render once, then never again, the only thing that will change is the tiles on top of the grid. 
	//this.runGame();	

	//Add tiles
	this.tileManager.addTile();
	this.tileManager.addTile();

}

Game.prototype.setAutomated = function(automated)
{
	this.automated = automated;
}

Game.prototype.runGame = function()
{
	if(!this.automated)
	{
	 	this.makeMove();
	}
	else
	{
		var timeout;
		if(!this.dead)
		{
			timeout = setTimeout($.proxy(function()
			{
				if(this.automated)
				{
					this.makeAutomatedMove();	
					grid.render();

					if(!grid.canTilesMoveOrMerge())
					{
						this.dead = true;
					}
				}
				this.runGame();						//There is probably a better way to do this. Seriously look into it, this is probably pretty inefficient
			}, this), this.automatedGameSpeed);
		}
		else
		{
			clearTimeout(timeout);				//Don't I need this somewhere else too? Am I running a bunch of threads when I keep toggling between automated and not? Consider this. 
		}
	}
}

Game.prototype.takeTurn = function(key)
{
	var direction = this.getDirectionFromInput(key);
	this.gridAnalyzer.calculateMovedTilePositions(direction);
	this.tileManager.animateTilesMoving(direction);
}


Game.prototype.getDirectionFromInput = function(key)
{
	var direction;

	if(isValidKey(key))
	{
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
	}

	return direction;
}

Game.prototype.makeMove = function(key)
{
//	var tileHasMoved = grid.moveTiles(direction);
//	if(tileHasMoved)
//	{
//		grid.addNewTile();
//	}
	//setTimeout(grid.render(), 2000);				//This seems odd, shouldn't I be rendering the grid much more frequently? How is this working?
}

Game.prototype.makeAutomatedMove = function()
{
	eval(this.automatedAlgorithm);

/*	var direction;

	if(this.getNumFreeSpaces() > 1)
	{
		if(!this.lastMove || this.lastMove === "left" || this.lastMove === "right" || this.lastMove === "up")
		{
			direction = "down";
			this.lastMove = "down";
		}
		else if(this.nonMovingStreak > 5)
		{
			direction ="up";
			this.lastMove = "up";
		}
		else if(this.nonMovingStreak > 3)
		{
			direction ="right";
			this.lastMove = "right";
		}
		else
		{
			direction = "left";
			this.lastMove = "left";
		}
	}
	else 
	{
		console.log(this.valueGrid.canMoveInDirection("left"));
		this.setAutomated(false);
	}

	var tileHasMoved = grid.moveTiles(direction);
	if(tileHasMoved)
	{
		grid.addNewTile();
		this.nonMovingStreak = 0;
	}
	else
	{
		this.nonMovingStreak++;
	}

	/*console.log(this.valueGrid.getHighestValue());*/

}