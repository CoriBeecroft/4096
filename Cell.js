var Cell = function(xPosition, yPosition, tile)
{
	this.xPosition = xPosition || 0;
	this.yPosition = yPosition || 0;
	this.tile = tile;
	this.right;
	this.left;
	this.up;
	this.down;
}

Cell.prototype.getHTML = function()
{
	var $html = $("<div class='grid-cell' data-xPos = ' " + this.xPosition +  "' data-yPos = '" + this.	yPosition + "'></div>");

	if(this.tile)
	{
		$($html).append(this.tile.element);
	}

	return $html;
}

Cell.prototype.isEmpty = function()			//This function might be entirely unnecessary. 
{
	return this.tile ? true : false;
}

Cell.prototype.link = function(cell, direction)
{
	switch(direction)
	{
		case "right": 
			this.right = cell;
			cell.left = this;
			break;
		case "left": 
			this.left = cell;
			cell.right = this;
			break;
		case "up": 
			this.up = cell;
			cell.down = this;
			break;
		case "down": 
			this.down = cell;
			cell.up = this;
			break;
	}
}
