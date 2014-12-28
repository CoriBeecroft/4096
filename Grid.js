var Grid = function(xDimension, yDimension)
{
	this.origin = new Cell(0, 0);
	this.xDimension = xDimension;
	this.yDimension = yDimension;
	this.buildGrid();
}

Grid.prototype.buildGrid = function()
{
	var current = this.origin;
	for(var i=0; i<this.xDimension; i++)
	{
		current.right = new Cell(i + 1, 0);
		var temp = current;				//temp is a bad name, change it. 
		for(var j=0; j<this.yDimension; j++)
		{
			temp.down = new Cell(i, j + 1);
			temp = temp.down;
		}
		current = current.right || current;
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

Grid.prototype.isFull = function()
{

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

Grid.prototype.render = function()
{
	var grid = $("<div class='grid'></div>");
	$('div#game-container').append(grid);
	
	for(var i=0; i<this.xDimension; i++)
	{
		for(var j=0; j<this.yDimension; j++)
		{			
			grid.append(this.getCell(i, j).getHTML());
		}
	}
}