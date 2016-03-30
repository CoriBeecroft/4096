var Grid = function()
{
	this.cells = [[],[],[],[]];
	this.width = 4; 
	this.height = 4;

	this.init();
}

//Might be better to put these in cell, not sure
Grid.cellWidth = 106.25;
Grid.cellHeight = 106.25;
Grid.cellMargin = 15;

Grid.prototype.init = function()
{
	for(var j=0; j<this.height; j++)
	{
		for(var i=0; i<this.width; i++)
		{
			this.cells[i][j] = new Cell(i, j, this);
		}
	}
}

Grid.prototype.render = function()
{
	var grid = $('div#grid').length > 0 ? $('div#grid') : $("<div id='grid'></div>");			//There might be a better way to do this bit. 
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