var GridAnalyzer = function(grid)		//Tbh, this class is probably not necessary, but it has such a cool name!! I am going to allow it to stay for now, but it will probably just end up being merged with grid
{
	this.grid = grid;
}

GridAnalyzer.prototype.calculateMovedTilePositions = function(direction)	//Maybe a better name for this
{
	if(direction == 'left')
	{
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
	}
	else if(direction == 'right')
	{
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
	}
	else if(direction == 'up')
	{
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
	}
	else if(direction == 'down')
	{
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
	}
}

GridAnalyzer.prototype.print = function()
{
	var toPrint = "";
	for(var j=0; j<this.grid.height; j++)
	{
		for(var i=0; i<this.grid.width; i++)
		{
			toPrint += "[";
			
			if(this.grid.cells[i][j].isEmpty())
			{
				toPrint += 0;
			}
			else
			{
				toPrint += this.grid.cells[i][j].tile.value;
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