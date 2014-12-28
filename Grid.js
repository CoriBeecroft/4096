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

/*var findEmptyCellCoordinates = function()						//This probably needs to be tested a little more
{
	var emptyXCells = [];

	while(emptyXCells.length == 0)
	{
		var x = parseInt(Math.random()*4);			//Find a column with empty cells
		var y;
	
		for(var i=0; i<tiles[x].length; i++)
		{
			if(!tiles[x][i])
			{
				emptyXCells.push(i);
			}
		}
	}
	

	y = emptyXCells[parseInt(Math.random()*emptyXCells.length)];	//Choose a random empty cell from the chosen column
	console.log({ x: x, y: y});
	return { x: x, y: y};
}*/

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
			grid.append(this.getCell(i, j).$html);
		}
	}
}