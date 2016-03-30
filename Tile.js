var Tile = function(cell, value)
{
	this.cell = cell;

	this.hasMerged = false;
	
	this.moveLeft = 0;
	this.moveRight = 0;
	this.moveUp = 0; 
	this.moveDown = 0;
	
	//generate value 80% chance of beig 2, 20% chance of being 4
	this.value = value || (parseInt(Math.random()*10) % 5 == 0) ? (4) : (2);
}

Tile.prototype.getHTML = function()
{
	return $("<div class='tile' x='" + this.cell.xPosition + "' y='" + this.cell.yPosition + "' style = 'font-size: " + this.getFontSize() + "px; background-color: " + this.getColor() + "'>" + this.value + "</div>");
}

Tile.prototype.getElement = function()
{
	var tiles = $('div.tile');
	var thisTile;

	for(var i=0; i<tiles.length; i++)
	{
		var currentTile = tiles.eq(i);
		
		if(currentTile.attr('x') === (this.cell.xPosition + "") && currentTile.attr('y') === (this.cell.yPosition + ""))
		{
			thisTile = currentTile;
		}
	}

	return thisTile;
}

Tile.prototype.getFontSize = function()		//Make a less stupid name for this function. Wait, is this really a stupid name for this function? I don't know, reconsider this whole issue at some point
{
	var valueString = this.value + "";
	var length = valueString.length;
	var size;

	//Might eventually need more cases(including potentially a truncate), but this is good for now
	if(length < 5)
	{
		size = parseInt(100 - (length-1)*25);
	}
	else if(length >= 5 && length < 7)
	{
		size = parseInt(35 - (length-5)*6);
	}
	else if(length >= 7 && length <9)
	{
		size = parseInt(25 - (length-7)*3);
	}					

	return size;
}

Tile.prototype.getColor = function()
{
	var hue = Math.log2(this.value) * 5;

	return "hsla(" + hue + "," + 75 + "%," + 35 + "%," + 1 + ")";
}

Tile.prototype.updatePosition = function()
{
	//remove tile from cell
	this.cell.removeTile();

	//Find new cell
	var newX = this.cell.xPosition + this.moveRight - this.moveLeft;
	var newY = this.cell.yPosition + this.moveDown - this.moveUp;

	var newCell = this.cell.grid.getCell(newX, newY);
	this.cell = newCell;
	this.cell.addTile(this);

	//Reset move values
	this.moveLeft = 0;
	this.moveRight = 0; 
	this.moveUp = 0;
	this.moveDown = 0;
}

Tile.prototype.animateMove = function(direction)
{
	if(direction == 'left')
	{
		var moveDistancePixels = ((Grid.cellWidth + Grid.cellMargin) * this.moveLeft) * -1;
		this.getElement().animate({left: "+=" + moveDistancePixels + "px"}, 300, $.proxy(this.afterAnimateMove, this));
	}
	else if(direction == 'right')
	{
		var moveDistancePixels = (Grid.cellWidth + Grid.cellMargin) * this.moveRight;
		this.getElement().animate({left: "+=" + moveDistancePixels + "px"}, 300, $.proxy(this.afterAnimateMove, this));
	}
	else if(direction == 'up')
	{
		var moveDistancePixels = ((Grid.cellWidth + Grid.cellMargin) * this.moveUp) * -1;
		this.getElement().animate({top: "+=" + moveDistancePixels + "px"}, 300, $.proxy(this.afterAnimateMove, this));
	}
	else if(direction == 'down')
	{
		var moveDistancePixels = (Grid.cellWidth + Grid.cellMargin) * this.moveDown;
		this.getElement().animate({top: "+=" + moveDistancePixels + "px"}, 300, $.proxy(this.afterAnimateMove, this));
	}	
}

Tile.prototype.afterAnimateMove = function()
{
	this.updatePosition();
	this.cell.grid.render();
}