var Grid = function(width, height)
{
	this.origin;
	this.width = width;
	this.height = height;
	this.buildGrid();
}

Grid.prototype.goThroughTheCells = function(doBlah, params, cell)				//probably won't actually need this. 
{	
	cell = cell || this.origin;

	doBlah(cell, params);
	if(cell.right)
	{
		this.goThroughTheCells(doBlah, params, cell.right);
	}

	if(cell.down)
	{
		this.goThroughTheCells(doBlah, params, cell.down);
	}
}

Grid.prototype.moveTiles = function(direction)
{
	if(direction === "left")
	{
		for(var i=0; i<this.height; i++)
		{
			var current = this.getColumn(i);
			do
			{
				this.moveTile(current, direction);
				current = current.down;
			} while(current);
		}
	}

	if(direction === "right")
	{
		for(var i=this.width-1; i>=0; i--)
		{
			var current = this.getColumn(i);
			do
			{
				this.moveTile(current, direction);
				current = current.down;
			} while(current);
		}
	}
	
	if(direction === "up")
	{
		for(var i=0; i<this.height; i++)
		{
			var current = this.getRow(i);
			do
			{
				this.moveTile(current, direction);
				current = current.right;
			} while(current);
		}
	}

	if(direction === "down")
	{
		for(var i=this.height-1; i>=0; i--)
		{
			var current = this.getRow(i);
			do
			{
				this.moveTile(current, direction);
				current = current.right;
			} while(current);
		}
	}

	this.resetMergedTiles();
}

Grid.prototype.resetMergedTiles = function()
{
	this.goThroughTheCells(function(cell)
	{
		console.log(cell);
		if(cell && cell.tile)
		{
			cell.tile.hasMerged = false;
		}
	});
}

Grid.prototype.moveTile = function(cell, direction)
{
	if(cell.tile)
	{
		if(this.tileCanMoveOrMerge(cell, direction))
		{
			this.computeTileEndPosition(cell, direction, this.tileCanMoveOrMerge(cell, direction));
		}
	}
}

Grid.prototype.computeTileEndPosition = function(cell, direction, moveType)
{
	var current = cell;
	if(moveType === "move")
	{
		do
		{
			switch (direction)
			{
				case "left":
					var tile = current.tile;
					current.tile = null;
					current = current.left;
					tile.move(current.xPosition, current.yPosition);
					current.tile = tile;
					break;
				case "right":
					console.log(current);
					if(current.right)
					{	
						var tile = current.tile;
						current.tile = null;
						current = current.right;
						tile.move(current.xPosition, current.yPosition);
						current.tile = tile;
					}
					break;
				case "up":
					var tile = current.tile;
					current.tile = null;
					current = current.up;
					tile.move(current.xPosition, current.yPosition);
					current.tile = tile;
					break;
				case "down":
					var tile = current.tile;
					current.tile = null;
					current = current.down;
					tile.move(current.xPosition, current.yPosition);
					current.tile = tile;
					break;
			}
		} while(current && this.tileCanMoveOrMerge(current, direction) === "move")
	}
	
	if(this.tileCanMoveOrMerge(current, direction) === "merge" && !current.tile.hasMerged)
	{
		console.log("merging?");
		console.log(current);
		console.log(direction);
		console.log(this.tileCanMoveOrMerge(current, direction));

		switch(direction)
		{
			case "left":
				if(!current.left.tile.hasMerged)
				{
					current.left.tile.value *= 2;
					current.left.tile.hasMerged = true;
					current.tile = null;
				}
				break;
			case "right":
				if(!current.right.tile.hasMerged)
				{
					current.right.tile.value *= 2;
					current.right.tile.hasMerged = true;
					current.tile = null;
				}
				break;
			case "up":
				if(!current.up.tile.hasMerged)
				{
					current.up.tile.value *= 2;
					current.up.tile.hasMerged = true;
					current.tile = null;
				}
				break;
			case "down":
				if(!current.down.tile.hasMerged)
				{
					current.down.tile.value *= 2;
					current.down.tile.hasMerged = true;
					current.tile = null;
				}
				break;
		}
	}
}

Grid.prototype.tileCanMoveOrMerge = function(cell, direction)
{
	direction = direction + "";
	direction = direction.toLowerCase(); 

	
	var canMove;

	if(cell && cell.tile)
	{
		var tile = cell.tile;
		//check for empty adjacent spaces or equivalent adjacent tiles
		switch (direction)
		{
			case "left":
				if(cell && cell.left)			//These are a mess... clean 'em up if possible. 
					canMove = !cell.left.tile ? "move" : (cell.left.tile.value === tile.value ? "merge" : false);
				break;
			case "right":
			//	console.log("right");
				if(cell && cell.right)
				{
					if(!cell.right.tile)
						canMove = "move";
					else if(cell.right.tile.value === tile.value)
					{
						canMove = "merge";
					}
					else
					{
						canMove = "oddling";
					}
				//	console.log(cell.right);
				//	canMove = !cell.right.tile ? "move" : (cell.right.tile.value === tile.value ? "merge" : false);
				}
				else
				{
					canMove = "fathead";
				}
			//	console.log("canmove: " + canMove);
				break;
			case "up":
				if(cell && cell.up)
					canMove = !cell.up.tile ? "move" : (cell.up.tile.value === tile.value ? "merge" : false);
				break;
			case "down":
				if(cell && cell.down)
					canMove = !cell.down.tile ? "move" : (cell.down.tile.value === tile.value ? "merge" : false);
				break;
		}

	}

	return canMove;
}

Grid.prototype.buildGrid = function()			//Uhh... refactor this, it's terrible. 
{
	var tempGrid = [[],[],[],[]]; 			//Make this dynamic 
	
	for(var i=0; i<this.width; i++)
	{
		for(var j=0; j<this.height; j++)
		{
			tempGrid[i][j] = new Cell(i, j);
		}
	}

	for(var i=0; i<tempGrid.length; i++)
	{
		for(var j=0; j<tempGrid[i].length; j++)
		{
			var hasLeft = true;
			var hasRight = true;
			var hasUp = true;
			var hasDown = true;

			if(i === 0)
			{
				hasLeft = false;
			}
			if(i === this.width-1)
			{
				hasRight = false;
			}

			if(j === 0)
			{
				hasUp = false;
			}
			if(j === this.height-1)
			{
				hasDown = false;
			}

			if(hasLeft)
			{
				tempGrid[i][j].link(tempGrid[i-1][j], "left");
			}

			if(hasRight)
			{
				tempGrid[i][j].link(tempGrid[i+1][j], "right");
			}
			
			if(hasUp)
			{
				tempGrid[i][j].link(tempGrid[i][j-1], "up");
			}
			
			if(hasDown)
			{
				tempGrid[i][j].link(tempGrid[i][j+1], "down");
			}
		}
	}

	this.origin = tempGrid[0][0];
}

Grid.prototype.addNewTile = function()					//maybe return -1 if no tile is added.  
{
	var cell = this.findEmptyCell();
	
	if(cell)
	{
		cell.tile = new Tile(cell.xPosition, cell.yPosition);
	}
}

Grid.prototype.findEmptyCell = function()						//This probably needs to be tested a little more. Check is grid is empty. 
{
	var emptyCells = [];

	for(var i=0; i<this.width; i++)
	{
		for(var j=0; j<this.height; j++)
		{
			var cell = this.getCell(i, j);

			if(cell.isEmpty())
			{
				emptyCells.push(cell);
			}
		}
	}

	if(emptyCells.length > 0)
	{
		var randomIndex = parseInt(Math.random()*emptyCells.length);
		return emptyCells[randomIndex];	
	}
	else
	{
		return null;				//THis is probably not necessary... but maybe makes it easier to read?
	}
}

Grid.prototype.getCell = function(xPosition, yPosition)
{
	var current = this.origin;

	for(var i=0; i<xPosition; i++)
	{
		current = current.right;
	}
	
	for(var j=0; j<yPosition; j++)
	{
		current = current.down;
	}

	return current; 
}

Grid.prototype.getRow = function(index)
{
	var rowHead = this.origin;

	for(var i=0; i<index; i++)
	{
		rowHead = rowHead.down;
	}

	return rowHead;
}

Grid.prototype.getColumn = function(index)
{
	var columnHead = this.origin;

	for(var i=0; i<index; i++)					//Might be off by one
	{
		columnHead = columnHead.right;
	}

	return columnHead;
}

Grid.prototype.render = function()
{
	var grid = $('div.grid').length > 0 ? $('div.grid') : $("<div class='grid'></div>");			//There might be a better way to do this bit. 
	grid.empty();
	$('div#game-container').append(grid);
	
	for(var j=0; j<this.width; j++)
	{
		for(var i=0; i<this.height; i++)
		{			
			grid.append(this.getCell(i, j).getHTML());
		}
	}
}