var Grid = function(xDimension, yDimension)
{
	this.origin;// = new Cell(0, 0);
	this.xDimension = xDimension;
	this.yDimension = yDimension;
	this.buildGrid();
	//this.goThroughTheCells();
}

Grid.prototype.goThroughTheCells = function(doBlah, params, cell)
{	
	cell = cell || this.origin;

//console.log("oddling");
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

Grid.prototype.moveTiles = function(direction)						//Need to compute all the new tile directions before actually moving the tiles. 
{
	console.log(direction);
	if(direction === "left")
	{
		for(var i=0; i<this.yDimension; i++)
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
		for(var i=this.xDimension-1; i>=0; i--)
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
		for(var i=0; i<this.yDimension; i++)
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
		for(var i=this.yDimension-1; i>=0; i--)
		{
			var current = this.getRow(i);
			do
			{
				this.moveTile(current, direction);
				current = current.right;
			} while(current);
		}
	}
}

Grid.prototype.moveTile = function(cell, direction)
{
	//console.log("movetile");
	if(cell.tile)
	{
		if(this.tileCanMoveOrMerge(cell, direction))
		{
			this.computeTileEndPosition(cell, direction, this.tileCanMoveOrMerge(cell, direction));
		}
	}

}

Grid.prototype.computeTileEndPosition = function(cell, direction, moveType)				//Cori
{
	//tile can move? 
		//Tile can move in 
	if(moveType === "merge")
	{

	}
	else if(moveType === "move")
	{
		var current = cell;

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
					var tile = current.tile;
					current.tile = null;
					current = current.right;
					tile.move(current.xPosition, current.yPosition);
					current.tile = tile;
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
		} while(current && this.tileCanMoveOrMerge(current, direction))
	}
/*	console.log("current tile: ");
console.log(current.tile);*/
	return cell;
}

Grid.prototype.tileCanMoveOrMerge = function(cell, direction)
{
	direction = direction + "";
	direction = direction.toLowerCase(); 

	var tile = cell.tile;
	var canMove;

	if(cell && cell.tile)
	{

	//	console.log(cell);
		//check for empty adjacent spaces or equivalent adjacent tiles
		switch (direction)
		{
			case "left":
				if(cell && cell.left && !cell.left.tile)	
					canMove = !cell.left.tile ? "move" : (cell.left.tile.value == tile.value ? "merge" : false);
				break;
			case "right":
				if(cell && cell.right && !cell.right.tile)
					canMove = !cell.right.tile ? "move" : (cell.right.tile.value == tile.value ? "merge" : false);
				break;
			case "up":
				if(cell && cell.up && !cell.up.tile)
					canMove = !cell.up.tile ? "move" : (cell.up.tile.value == tile.value ? "merge" : false);
				break;
			case "down":
				if(cell && cell.down && !cell.down.tile)
					canMove = !cell.down.tile ? "move" : (cell.down.tile.value == tile.value ? "merge" : false);
				break;
			default:
				console.log("oddlingzzzzz");							//Do something about this
		}
	}

	return canMove;
}

Grid.prototype.buildGrid = function()
{
	var tempGrid = [[],[],[],[]]; 			//Make this dynamic 
	
	for(var i=0; i<this.xDimension; i++)
	{
		for(var j=0; j<this.yDimension; j++)
		{
			tempGrid[i][j] = new Cell(i, j);
		}
	}

	this.origin = tempGrid[0][0];

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
			if(i === this.xDimension-1)
			{
				hasRight = false;
			}

			if(j === 0)
			{
				hasUp = false;
			}
			if(j === this.yDimension-1)
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

	for(var i=0; i<this.xDimension; i++)
	{
		for(var j=0; j<this.yDimension; j++)
		{
			var cell = this.getCell(i, j);

			if(!cell.tile)//.isEmtpy())
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
		return null;
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
	console.log(index);
console.log(rowHead);
	return rowHead;
}

Grid.prototype.getColumn = function(index)
{
	var columnHead = this.origin;

	for(var i=0; i<index; i++)					//Might be off by one
	{
		columnHead = columnHead.right;
	}
	console.log("columnHead");
console.log(columnHead);
	return columnHead;
}

Grid.prototype.render = function()
{
	var grid = $('div.grid').length > 0 ? $('div.grid') : $("<div class='grid'></div>");			//There might be a better way to do this bit. 
	grid.empty();
	$('div#game-container').append(grid);
	
	for(var j=0; j<this.xDimension; j++)
	{
		for(var i=0; i<this.yDimension; i++)
		{			
			grid.append(this.getCell(i, j).getHTML());
		}
	}
}