var Cell = function(xPosition, yPosition, tile)
{
	this.xPosition = xPosition || 0;
	this.yPosition = yPosition || 0;
	this.tile = tile;
	this.right;
	this.left;
	this.up;
	this.down;
	this.$html = $("<div class='grid-cell' data-xPos = ' " + xPosition +  "' data-yPos = '" + yPosition + "'></div>");
}

Cell.prototype.link = function(cell, direction)
{
	switch(direction)
	{
		case "right": 
			this.right = cell;
			cell.left = this;
		case "left": 
			this.left = cell;
			cell.right = this;
		case "up": 
			this.up = cell;
			cell.down = this;
		case "down": 
			this.down = cell;
			cell.up = this;
	}
}
