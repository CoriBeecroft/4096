var Game = function(grid, automatedAlgorithm)
{
	
	this.grid = grid;
	this.gridAnalyzer = new GridAnalyzer(this.grid);
	this.tileManager = new TileManager(this, this.grid, this.gridAnalyzer);

	this.animated = true;

	this.automatedAlgorithm = automatedAlgorithm;
	this.lastMove = "left"; 
	this.turn = 0;
	this.nonMovingStreak = 0;
	this.automated = false;
	this.automatedInterval;
	this.automatedGameSpeed = 300;		//Milliseconds per automated turn
	
	this.keyHandlingInProgress = false;
	this.inputToBeHandled = [];

	//Add tiles
	this.tileManager.addTile();
	this.tileManager.addTile();
}

Game.prototype.handleInput = function(input)
{
	if(!this.keyHandlingInProgress)
	{
		var keyEvent;
		
		if(this.inputToBeHandled.length > 0)
		{
			input = this.inputToBeHandled[0];
			this.inputToBeHandled.shift();			//removes first element
		}
		else
		{
			keyEvent = input;
		}
		if(keyEvent)
		{
			if(input == 'a')
			{
				this.setAutomated(!this.automated);
				this.keyHandlingInProgress = false;
			}
			else	//if input is a direction
			{
				console.log(input);
				this.takeTurn(input);
			}
		}
	}
	else
	{
		this.inputToBeHandled.push(input);
	}
}

Game.prototype.newGame = function()
{
	this.grid.clear(); 
	this.turn = 0;
	this.nonMovingStreak = 0;
	this.automated = false;
	clearInterval(this.automatedInterval);

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
		//this.animated = false;
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

Game.prototype.takeTurn = function(direction)
{
	this.keyHandlingInProgress = true;
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
//	eval(this.automatedAlgorithm);

	var direction;

	if(this.gridAnalyzer.getNumFreeSpaces() > 1)
	{
		if(this.gridAnalyzer.canMoveOrMerge('down'))
		{
			direction = "down";
		}
		else if(this.gridAnalyzer.canMoveOrMerge('left'))
		{
			direction ="left";
		}
		else if(this.gridAnalyzer.canMoveOrMerge('right'))
		{
			direction ="right";
		}
		else
		{
			direction = "up";
		}
	}
	else 
	{
		this.setAutomated(false);
	}

	var tileHasMoved = this.handleInput(direction);  //this.tileManager.moveMergeTiles(direction);		//might need to do error checking on direction	
	
	if(tileHasMoved)
	{
		this.nonMovingStreak = 0;
	}
	else
	{
		this.nonMovingStreak++;
	}
}

Game.prototype.handleDeath = function()
{
	$('#grid').append('<div id="game-over"><p>Game over</p></div>');

	if(this.automated)
	{
		this.setAutomated(false);
	}
}

Game.prototype.handleWin = function()
{

}