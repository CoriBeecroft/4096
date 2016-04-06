var Cell = function(xPosition, yPosition, grid)
{
	this.xPosition = xPosition || 0;
	this.yPosition = yPosition || 0;
	this.tile;
	this.grid = grid;
}

Cell.cellWidth = 106.25;
Cell.cellHeight = 106.25;
Cell.cellMargin = 15;

Cell.prototype.getHTML = function()
{
	var $html = $("<div class='cell' x = '" + this.xPosition +  "' y = '" + this.	yPosition + "'></div>");

	if(this.tile)
	{
		$($html).append(this.tile.getHTML());
	}

	return $html;
}

Cell.prototype.getElement = function()
{
	var cells = $('div.cell');
	var thisCell;

	for(var i=0; i<cells.length; i++)
	{
		var currentCell = cells.eq(i);

		if(currentCell.attr('x') === (this.xPosition + "") && currentCell.attr('y') === (this.yPosition + ""))
		{
			thisCell = currentCell;
		}
	}

	return thisCell;
}

Cell.prototype.isEmpty = function()
{
	return this.tile ? false : true;
}

Cell.prototype.addTile = function(tile)
{
	this.tile = tile;
}

Cell.prototype.removeTile = function()
{
	this.tile = null;
}