var ValueGrid = function(sourceGrid)
{
	this.sourceGrid = sourceGrid;
	this.width = this.sourceGrid.width;
	this.height = this.sourceGrid.height;
	this.grid = [[], [], [], []];				//inner arrays are columns, not rows

	this.update();
}

ValueGrid.prototype.update = function()
{
/*	for(var i=0; i<this.sourceGrid.width; i++)
	{
		var current = this.sourceGrid.getColumn(i);
		for(var j=0; j<this.sourceGrid.height; j++)
		{
			this.grid[i][j] = current.tile ? current.tile.value : 0;
			current = current.down;
		}
	}*/
}

ValueGrid.prototype.getPossibleMerges = function(direction)
{
/*	this.update();

	var count = 0;
	if(direction == 'left' || direction == 'right')		//Make this so case doesn't matter
	{
		
		for(var j=0; j<this.height; j++)
		{
			for(var i=0; i<this.width-1; i++)
			{
				if(this.grid[i][j] === this.grid[i+1][j])
				{
					count++;
					i++;
				}
			}
		}
	}
	else if(direction == 'up' || direction == 'down')
	{	
		for(var i=0; i<this.width; i++)
		{
			for(var j=0; j<this.height-1; j++)
			{
				if(this.grid[i][j] === this.grid[i][j+1])
				{
					count++;
					j++;
				}
			}
		}
	}

	return count;*/
}

ValueGrid.prototype.canMoveInDirection = function(direction)	//This probably needs a better name or at least should be consistent with the similar merge function
{
	this.update();

	//
	//	Don't forget to write this!
	//
}

ValueGrid.prototype.getHighestValue = function()
{
/*	this.update();

	var highest = 0;

	for(var i=0; i<this.width; i++)
	{
		for(var j=0; j<this.height; j++)
		{
			if(this.grid[i][j] > highest)
			{
				highest = this.grid[i][j];
			}
		}
	}

	return highest;*/
}

ValueGrid.prototype.print = function()
{
/*	var string = "";
	
	for(var j=0; j<this.height; j++)
	{
		for(var i=0; i<this.width; i++)
		{
			string += "[" + this.grid[i][j] + "]";
		}
		string +="\n";
	}

	console.log(string);*/
}