var AutomatedGame = function(playFunction)
{
	//Do error checking on playFunction
	this.playFunction = playFunction || this.makeMove;
	this.dead = false;
	this.lastMove = "left"; 
	this.turn = 0;
	this.nonMovingStreak = 0;

	this.runGame();
}

AutomatedGame.prototype.runGame = function()
{
	setInterval($.proxy(function(){
		if(!this.dead)
		{
			this.makeMove();
			grid.render();
			this.turn++;

			if(!grid.canTilesMove())
			{
				this.dead = true;
			}
		}
	}, this), 10);
}

AutomatedGame.prototype.makeMove = function()
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
	console.log(this.nonMovingStreak);
}