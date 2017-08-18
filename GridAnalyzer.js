var GridAnalyzer = function(grid)
{
	this.grid = grid;
}

GridAnalyzer.prototype.calculateMovedTilePositions = function(direction)
{
	var tilesCanMove = 0;

	if(direction == 'left')
	{
		//Move
		for(var i=0; i<this.grid.width; i++)
		{
			for(var j=this.grid.height-1; j>=0; j--)
			{
				if(this.grid.cells[j][i].isEmpty())
				{
					//Go back and increment canMoveRight in every tile to the left of this one
					for(var k=j; k<this.grid.height; k++)		//kinda silly 'cause k=i is empty so this is inefficient, but don't want to just subtract 1 'cause errors n' shit
					{
						if(!this.grid.cells[k][i].isEmpty())
						{
							this.grid.cells[k][i].tile.moveLeft++;
							tilesCanMove++;
						}
					}
				}
			}
		}
	}
	else if(direction == 'right')
	{
		//Move
		for(var i=0; i<this.grid.width; i++)
		{
			for(var j=0; j<this.grid.height; j++)
			{
				if(this.grid.cells[j][i].isEmpty())
				{
					for(var k=j; k>=0; k--)
					{
						if(!this.grid.cells[k][i].isEmpty())
						{
							this.grid.cells[k][i].tile.moveRight++;
							tilesCanMove++;
						}
					}
				}
			}
		}
	}
	else if(direction == 'up')
	{
		//Move
		for(var j=0; j<this.grid.height; j++)
		{
			for(var i=this.grid.width-1; i>=0; i--)
			{
				if(this.grid.cells[j][i].isEmpty())
				{
					for(var k=i; k<this.grid.width; k++)
					{
						if(!this.grid.cells[j][k].isEmpty())
						{
							this.grid.cells[j][k].tile.moveUp++;
							tilesCanMove++;
						}
					}
				}
			}
		}
	}
	else if(direction == 'down')
	{
		//Move
		for(var j=0; j<this.grid.height; j++)
		{
			for(var i=0; i<this.grid.width; i++)
			{
				if(this.grid.cells[j][i].isEmpty())
				{
					for(var k=i; k>=0; k--)
					{
						if(!this.grid.cells[j][k].isEmpty())
						{
							this.grid.cells[j][k].tile.moveDown++;
							tilesCanMove++;
						}
					}
				}
			}
		}
	}

	return tilesCanMove;
}

GridAnalyzer.prototype.calculateMergedTilePositions = function(direction)
{
	var tilesCanMerge = false;

	if(direction == 'left')
	{
		//Merge
		for(var i=0; i<this.grid.height; i++)
		{
			var prevTile = null;
			var numMerges = 0;
			for(var j=0; j<this.grid.width; j++)
			{
				var currentTile = this.grid.cells[j][i].tile;
				if(currentTile)
				{
					if(prevTile)
					{
						if(currentTile.canMerge(prevTile))
						{
							currentTile.setMerge(prevTile);						
							numMerges++;
							tilesCanMerge = true;
							prevTile = null;
						}
						else
						{
							prevTile = currentTile
						}
					}
					else
					{
						prevTile = currentTile;
					}
					currentTile.moveLeft += numMerges;
				}
			}
		}
	}
	else if(direction == 'right')
	{
		//Merge
		for(var i=0; i<this.grid.height; i++)
		{
			var prevTile = null;
			var numMerges = 0;
			for(var j=this.grid.width-1; j>=0; j--)
			{
				var currentTile = this.grid.cells[j][i].tile;
				if(currentTile)
				{
					if(prevTile)
					{
						if(currentTile.canMerge(prevTile))
						{
							currentTile.setMerge(prevTile);						
							numMerges++;
							tilesCanMerge = true;
							prevTile = null;
						}
						else
						{
							prevTile = currentTile
						}
					}
					else
					{
						prevTile = currentTile;
					}
					currentTile.moveRight += numMerges;
				}
			}
		}
	}
	else if(direction == 'up')
	{
		//Merge
		for(var j=0; j<this.grid.width; j++)
		{
			var prevTile = null;
			var numMerges = 0;
			for(var i=0; i<this.grid.height; i++)
			{
				var currentTile = this.grid.cells[j][i].tile;
				if(currentTile)
				{
					if(prevTile)
					{
						if(currentTile.canMerge(prevTile))
						{
							currentTile.setMerge(prevTile);						
							numMerges++;
							tilesCanMerge = true;
							prevTile = null;
						}
						else
						{
							prevTile = currentTile
						}
					}
					else
					{
						prevTile = currentTile;
					}
					currentTile.moveUp += numMerges;
				}
			}
		}
	}
	else if(direction == 'down')
	{
		//Merge
		for(var j=0; j<this.grid.width; j++)
		{
			var prevTile = null;
			var numMerges = 0;
			for(var i=this.grid.height-1; i>=0; i--)
			{
				var currentTile = this.grid.cells[j][i].tile;
				if(currentTile)
				{
					if(prevTile)
					{
						if(currentTile.canMerge(prevTile))
						{
							currentTile.setMerge(prevTile);						
							numMerges++;
							tilesCanMerge = true;
							prevTile = null;
						}
						else
						{
							prevTile = currentTile
						}
					}
					else
					{
						prevTile = currentTile;
					}
					currentTile.moveDown += numMerges;
				}
			}
		}
	}

	return tilesCanMerge;
}

GridAnalyzer.prototype.calculateMovedAndMergedTilePositions = function(direction)
{	
	var tilesMoved = this.calculateMovedTilePositions(direction);
	var tilesMerged = this.calculateMergedTilePositions(direction);
	return  tilesMoved || tilesMerged;
}

GridAnalyzer.prototype.print = function()
{
	var toPrint = "";
	for(var i=0; i<this.grid.width; i++)
	{
		for(var j=0; j<this.grid.height; j++)
		{
			toPrint += "[";
			
			if(this.grid.cells[j][i].isEmpty())
			{
				toPrint += 0;
			}
			else
			{
				toPrint += this.grid.cells[j][i].tile.value;
			}

			toPrint +="]";
		}
		toPrint += "\n";
	}
	console.log(toPrint);
}

GridAnalyzer.prototype.getEmptyCells = function()
{
	var emptyCells = [];

	for(var i=0; i<this.grid.width; i++)
	{
		for(var j=0; j<this.grid.height; j++)
		{
			if(this.grid.cells[i][j].isEmpty())
			{
				emptyCells.push(this.grid.cells[i][j]);
			}
		}
	}

	return emptyCells;
}

GridAnalyzer.prototype.getNonEmptyCells = function()
{
	var nonEmptyCells = [];

	for(var i=0; i<this.grid.width; i++)
	{
		for(var j=0; j<this.grid.height; j++)
		{
			if(!this.grid.cells[i][j].isEmpty())
			{
				nonEmptyCells.push(this.grid.cells[i][j]);
			}
		}
	}

	return nonEmptyCells;
}

GridAnalyzer.prototype.getNumFreeSpaces = function()
{
	return this.getEmptyCells().length;
}

GridAnalyzer.prototype.numMoves = function(direction)
{
	var numMoves = this.calculateMovedTilePositions(direction);

	this.clearMovesAndMerges();

	return numMoves;
}

GridAnalyzer.prototype.numMerges = function(direction)
{
	var numMerges = this.calculateMergedTilePositions(direction);
	
	this.clearMovesAndMerges();
	
	return numMerges;
}

GridAnalyzer.prototype.canMove = function(direction)
{
	return this.numMoves(direction) > 0;
}

GridAnalyzer.prototype.canMerge = function(direction)
{
	return this.numMerges(direction) > 0;
}

GridAnalyzer.prototype.canMoveOrMerge = function(direction)
{
	if(direction)
	{
		return this.canMove(direction) || this.canMerge(direction);
	}
	else
	{
		return this.canMoveOrMerge('left') || this.canMoveOrMerge('right') || this.canMoveOrMerge('up') || this.canMoveOrMerge('down');
	}
}

GridAnalyzer.prototype.clearMovesAndMerges = function()
{
	var nonEmptyCells = this.getNonEmptyCells();

	for(var i=0; i<nonEmptyCells.length; i++)
	{
		var tile = nonEmptyCells[i].tile;
		tile.clearMovesAndMerges();
	}
}