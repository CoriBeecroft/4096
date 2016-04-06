var Game = function(grid, automatedAlgorithm)
{
	
	this.grid = grid;
	this.gridAnalyzer = new GridAnalyzer(this.grid);
	this.tileManager = new TileManager(this, this.grid, this.gridAnalyzer);

	this.animated = true;

	this.automatedAlgorithm = automatedAlgorithm;
	this.dead = false;
	this.lastMove = "left"; 
	this.turn = 0;
	this.nonMovingStreak = 0;
	this.automated = false;
	this.automatedInterval;
	this.automatedGameSpeed = 10;		//Milliseconds per automated turn
	
	//Add tiles
	this.tileManager.addTile();
	this.tileManager.addTile();
}

Game.prototype.setAutomated = function(automated)
{
	if(this.automated && !automated)
	{
		clearInterval(this.automatedInterval);
	}

	this.automated = automated;

	if(this.automated)
	{
		this.animated = false;
		this.automatedInterval = setInterval($.proxy(function()
		{
			this.makeAutomatedMove();
		}, this), this.automatedGameSpeed);
	}
	else
	{
		this.animated = true;
	}
}

Game.prototype.takeTurn = function(key)
{
	var direction = this.getDirectionFromInput(key);
	this.tileManager.moveMergeTiles(direction);
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

Game.prototype.makeAutomatedMove = function()
{
	eval(this.automatedAlgorithm);

/*	var direction;

	if(this.gridAnalyzer.getNumFreeSpaces() > 1)
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
		this.setAutomated(false);
	}

	var tileHasMoved = this.tileManager.moveMergeTiles(direction);		//might need to do error checking on direction
	if(tileHasMoved)
	{
		this.nonMovingStreak = 0;
	}
	else
	{
		this.nonMovingStreak++;
	}*/
}