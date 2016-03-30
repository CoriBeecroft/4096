var Cell = function(xPosition, yPosition, grid)
{
	this.xPosition = xPosition || 0;
	this.yPosition = yPosition || 0;
	this.tile;
	this.grid = grid;
}

Cell.prototype.getHTML = function()
{
	var $html = $("<div class='grid-cell' data-xPos = ' " + this.xPosition +  "' data-yPos = '" + this.	yPosition + "'></div>");
	
	if(this.tile)
	{
		$($html).append(this.tile.getHTML());
	}

	return $html;
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
	$('div.grid-cell').empty();
}