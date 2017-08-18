var Grid = function()
{
	this.cells = [[],[],[],[]];
	this.width = 4; 
	this.height = 4;

	this.init();
}

Grid.prototype.init = function()
{
	for(var j=0; j<this.height; j++)
	{
		for(var i=0; i<this.width; i++)
		{
			this.cells[i][j] = new Cell(i, j, this);
		}
	}

	this.render();
}

Grid.prototype.render = function()
{
	var grid = $('div#grid').length > 0 ? $('div#grid') : $("<div id='grid'></div>");
	grid.empty();
	$('div#game-container').append(grid);
	
	for(var j=0; j<this.height; j++)
	{
		for(var i=0; i<this.width; i++)
		{			
			grid.append(this.cells[i][j].getHTML());
		}
	}
}

Grid.prototype.getCell = function(xIndex, yIndex)
{
	return this.cells[xIndex][yIndex];
}

Grid.prototype.clear = function()
{
	for(var j=0; j<this.height; j++)
	{
		for(var i=0; i<this.width; i++)
		{			
			var cell = this.cells[i][j];
			if(cell.tile)
			{
				cell.removeTile();
			}
		}
	}

	this.render();
}