var Game = function(playFunction)
{
	//Do error checking on playFunction
	this.playFunction = playFunction || this.makeAutomatedMove;
	this.dead = false;
	this.lastMove = "left"; 
	this.turn = 0;
	this.nonMovingStreak = 0;
	this.automated = false;
	this.movesMade = 0;

	this.runGame();
}

Game.prototype.setAutomated = function(automated)
{
	console.log(automated)
	if(automated)
	{
		if(!this.automated)
		{
			this.automated = true;
		}
	}
	else
	{
		if(this.automated)
		{
			this.automated = false;
		}
	}
}

Game.prototype.runGame = function()
{
	if(!this.automated)
	{
	 	this.makeMove();
	}
	else
	{
		setTimeout($.proxy(function()
		{
			console.log("is this interval still going?");
			if(!this.dead && this.automated)
			{
				console.log("fathead");
				this.makeAutomatedMove();	
				
				grid.render();
				this.turn++;

				if(!grid.canTilesMove())
				{
					this.dead = true;
				}
			}
			this.runGame();
		}, this), 50);		
	}
}

Game.prototype.makeMove = function(key)
{
	if(isValidKey(key))	//Maybe this function should be in this class
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
	grid.render();
}

Game.prototype.makeAutomatedMove = function()
{
	var direction;

	if(!this.lastMove || this.lastMove === "left" || this.lastMove === "right" || this.lastMove === "up")
	{
		direction = "down";
		this.lastMove = "down";
	}
	else if(this.nonMovingStreak > 5)//this.turn > 1 && parseInt(Math.random() * 50 + 1) === 1)
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
}