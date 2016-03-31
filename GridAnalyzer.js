var GridAnalyzer = function(grid)		//Tbh, this class is probably not necessary, but it has such a cool name!! I am going to allow it to stay for now, but it will probably just end up being merged with grid
{
	this.grid = grid;
}

GridAnalyzer.prototype.calculateMovedTilePositions = function(direction)	//Maybe a better name for this
{
	if(direction == 'left')
	{
		//Move
		for(var i=0; i<this.grid.width; i++)//Still need to also check if they can merge. =)
		{
			for(var j=this.grid.height-1; j>=0; j--)
			{
				if(this.grid.cells[j][i].isEmpty())
				{
					//Go back and increment canMoveRight in every tile to the left of this one
					for(var k=j; k<this.grid.height; k++)		//kinda silly 'cause k=i is empty so this is inefficient, but don't want to just subtract 1 'cause errors n' shit
					{
						if(!this.grid.cells[k][i].isEmpty())
							this.grid.cells[k][i].tile.moveLeft++;
					}
				}
			}
		}

		//Merge
		for(var i=0; i<this.grid.height; i++)
		{
			var prevTile = null;				//Needs a better name
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
							this.grid.cells[k][i].tile.moveRight++;
					}
				}
			}
		}

		//Merge
		for(var i=0; i<this.grid.height; i++)
		{
			var prevTile = null;				//Needs a better name
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
							this.grid.cells[j][k].tile.moveUp++;
					}
				}
			}
		}

		//Merge
		for(var j=0; j<this.grid.width; j++)
		{
			var prevTile = null;				//Needs a better name
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
							this.grid.cells[j][k].tile.moveDown++;
					}
				}
			}
		}

		//Merge
		for(var j=0; j<this.grid.width; j++)
		{
			var prevTile = null;				//Needs a better name
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

GridAnalyzer.prototype.getNonEmptyCells = function()	//probably a way to combine this and getEmptyCells, but I'll consider that later
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