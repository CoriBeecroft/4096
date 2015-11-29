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
	console.log(this.xPosition);
	var $html = $("<div class='grid-cell' data-xPos = ' " + this.xPosition +  "' data-yPos = '" + this.	yPosition + "'></div>");

	if(this.tile)
	{
		$($html).append(this.tile.getHTML());
	}

	return $html;
}

Cell.prototype.isEmpty = function()			//This function might be entirely unnecessary. 
{
	return this.tile ? false : true;
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
