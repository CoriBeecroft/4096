var Grid = function(xDimension, yDimension)
{
	this.origin = new Cell(0, 0);
	this.xDimension = xDimension;
	this.yDimension = yDimension;
	this.buildGrid();
//	console.log("this.origin: ");
//	console.log(this.origin);
}

Grid.prototype.buildGrid = function()
{
	var k = 0;
	//console.log("I are building yo grid! " + this.xDimension + ", " + this.yDimension);
	var current = this.origin;
	for(var i=0; i<this.xDimension; i++)
	{
		current.right = new Cell(i + 1, 0);
		var temp = current;
		for(var j=0; j<this.yDimension; j++)
		{
			k++;
	
			temp.down = new Cell(i, j + 1);
		//	console.log(current.down);
			temp = temp.down;
			console.log(j);
		}
		current = current.right || current;
	}	
	
}

Grid.prototype.isFull = function()
{
//	for(var i=0; i<tiles.length; i++)
//	{
//		for(var j=0; j<tiles[i].length; j++)
//		{
//			if(!tiles[i][j])
//			{
//				return false;
//			}
//		}
//	}
	var isFull = function(cell)
	{

	}

	
	isFull(this.origin);

	return true;
}

Grid.prototype.getCell = function(xPosition, yPosition)
{
	console.log("getCell Coordinates: " + xPosition + ", " + yPosition);
	var current = this.origin;
	//console.log(this.origin.down.down);
	for(var i=0; i<xPosition; i++)
	{
		current = current.right;
	//	console.log(current);
	}
	for(var j=0; j<yPosition; j++)
	{
		current = current.down;
	//	console.log(current);
	}
	console.log(current);
	return current; 
}

Grid.prototype.render = function()
{
	$('div#game-container').append("<div class='grid'></div>");
	var grid = $('.grid');
	for(var i=0; i<this.xDimension; i++)
	{
		for(var j=0; j<this.yDimension; j++)
		{
			
			grid.append(this.getCell(i, j).$html);
		}
	}
}