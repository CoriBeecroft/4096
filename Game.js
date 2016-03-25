var Game = function(grid, automatedAlgorithm)
{
	
	this.grid = grid;
	this.valueGrid = new ValueGrid(this.grid);
	this.automatedAlgorithm = automatedAlgorithm;
	this.dead = false;
	this.lastMove = "left"; 
	this.turn = 0;
	this.nonMovingStreak = 0;
	this.automated = false;
	this.automatedGameSpeed = 10;		//Milliseconds per automated turn

	//Add tiles
	grid.addNewTile();
	grid.addNewTile();

	//Render grid
	grid.render();		

	this.runGame();	
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

Game.prototype.makeMove = function(key)
{
	if(isValidKey(key))
	{
		var direction;
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

	var tileHasMoved = grid.moveTiles(direction);
	if(tileHasMoved)
	{
		grid.addNewTile();
	}
	setTimeout(grid.render(), 2000);				//This seems odd, shouldn't I be rendering the grid much more frequently? How is this working?
}

Game.prototype.getNumFreeSpaces = function()		//Might not be necessary
{
	return grid.getEmptyCells().length;
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