var Game = function(grid, automatedAlgorithm)
{
	this.developmentMode = false;

	this.winValue = 4096;
	this.winHasBeenCommunicated = false;

	this.grid = grid;
	this.gridAnalyzer = new GridAnalyzer(this.grid);
	this.tileManager = new TileManager(this, this.grid, this.gridAnalyzer);

	this.animated = true;

	this.automatedAlgorithm = automatedAlgorithm;
	this.lastMove = "left"; 
	
	this.automated = false;
	this.automatedInterval;
	
	this.keyHandlingInProgress = false;
	this.movesQueue = [];
	this.movementEnabled = true;

	//Add tiles
	this.tileManager.addTile();
	this.tileManager.addTile();
}

Game.prototype.getAutomatedGameSpeed = function() 
{
	return this.developmentMode ? 30 : 300;		//Milliseconds per automated turn
}

Game.prototype.queueMove = function(input)
{
	if(this.movementEnabled)
	{
		if(!this.keyHandlingInProgress)
		{
			var keyEvent;
			
			if(this.movesQueue.length > 0)
			{

				input = this.movesQueue.shift();			//returns and removes first element
			}
			else
			{
				keyEvent = input;
			}
			if(keyEvent)
			{
				this.takeTurn(input);
			}
		}
		else
		{
			this.movesQueue.push(input);
		}
	}
}

Game.prototype.newGame = function()
{
	this.grid.clear(); 
	this.automated = false;
	clearInterval(this.automatedInterval);
	this.winHasBeenCommunicated = false;
	this.tileManager.highestTile = 0;
	$('div#game-over').css('visibility', 'hidden');
	$('div#win-screen').css('visibility', 'hidden');


	this.tileManager.addTile();
	this.tileManager.addTile();

	$('#game-container').focus();
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
		this.automatedAlgorithm = editor.getValue();
		$('button.toggle-automation').text("Stop\u00A0Automation");

		if(this.getAutomatedGameSpeed() < 200)
		{
			this.animated = false;
		}

		this.automatedInterval = setInterval($.proxy(function()
		{
			if(this.gridAnalyzer.canMoveOrMerge())
			{
				this.makeAutomatedMove();
			}
			else
			{
				this.handleDeath();
			}
		}, this), this.getAutomatedGameSpeed());
	}
	else
	{
		$('button.toggle-automation').text("Run\u00A0Automation");
		this.animated = true;
		$('#game-container').focus();
	}
}

Game.prototype.takeTurn = function(direction)
{
	this.keyHandlingInProgress = true;
	this.tileManager.moveMergeTiles(direction);
}

Game.prototype.makeAutomatedMove = function()
{
	if(this.developmentMode)
	{
		if(this.gridAnalyzer.getNumFreeSpaces() < 2)
		{
			this.setAutomated(false);
			//Probably should also clear the moves queue
		}
		else if(canMove('down'))
		{
			move('down');
			move('left');
		}
		else if(canMove('left'))
		{
			move('left');
		}
		else if(canMove('right'))
		{
			move('right');
		}
		else if(canMove('up'))
		{
			move('up');
			move('down');
		}
	}
	else
	{
		eval(this.automatedAlgorithm);
	}
}

var move = function(direction)
{
	game.queueMove(direction);
}

var canMove = function(direction)
{
	return game.gridAnalyzer.canMoveOrMerge(direction);
}


Game.prototype.handleDeath = function()
{
	if(this.automated)
	{
		this.setAutomated(false);
	}

	$('#game-over').css('visibility', 'visible');

	$('#game-over').animate({"opacity": "1"}, 300);

	$('#game-over .new-game').focus();
}

Game.prototype.handleWin = function()
{
	if(this.automated)
	{
		this.setAutomated(false);
	}

	//disable movement 
	this.movementEnabled = false;

	$('#win-screen').css('visibility', 'visible');

	$('#win-screen').animate({"opacity": "1"}, 300);

	$('#win-screen .keep-playing').focus();
	
	this.winHasBeenCommunicated = true;
}