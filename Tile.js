var Tile = function(cell, tileManager, animatedGenesis, value)
{
	this.cell = cell;
	this.tileManager = tileManager;

	this.generatedButNotAnimated = true;

	this.hasMergeEngagement = false;
	this.absorber = false;
	this.betrothed;
		

	this.moveLeft = 0;
	this.moveRight = 0;
	this.moveUp = 0; 
	this.moveDown = 0;

	//generate value 80% chance of being 2, 20% chance of being 4
	this.value = value || (parseInt(Math.random()*10) % 5 == 0) ? (4) : (2);

	this.addToDOM();
	if(animatedGenesis)
	{
		this.animateGenesis();
	}
}

Tile.prototype.addToDOM = function()
{
	if(!this.getElement())
	{
		this.cell.getElement().append(this.getHTML());
	}
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

Tile.prototype.getFontSize = function()
{
	var valueString = this.value + "";
	var length = valueString.length;
	var size;

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

Tile.prototype.canMerge = function(tile)
{
	//neither tile has a previous merge engagement and values are the same 
	return !this.hasMergeEngagement && !tile.hasMergeEngagement && this.value === tile.value;
}

Tile.prototype.clearMovesAndMerges = function()
{
	//clear moves
	this.moveLeft = 0;
	this.moveRight = 0;
	this.moveUp = 0;
	this.moveDown = 0;

	//clear merges
	this.hasMergeEngagement = false;
	this.absorber = false;
	this.betrothed = null;
}

Tile.prototype.setMerge = function(tile, direction)
{
	this.hasMergeEngagement = true;
	tile.hasMergeEngagement = true;

	this.absorber = true; 

	this.betrothed = tile; 
	tile.betrothed = this;
}

Tile.prototype.executeMerge = function()
{
	if(!this.absorber || !this.hasMergeEngagement || !this.betrothed)
	{
		return;
	}

	this.value *= 2;
	
	//check for highest tile	
	this.tileManager.highestTile = (this.value > this.tileManager.highestTile) ? this.value : this.tileManager.highestTile;

	//reset merge values
	this.hasMergeEngagement = false;
	this.absorber = false;
	this.betrothed = null;
}

Tile.prototype.animateGenesis = function()
{
	var element = this.getElement();
	element.css("height", 0 + "px");
	element.css("width", 0 + "px");
	element.css("top", 50 + "px");
	element.css("left", 50 + "px");
	element.animate({height: 106.25 + "px", width: 106.25 + "px", top: 0 + "px", left: 0 + "px"}, 75, $.proxy(this.afterAnimateGenesis, this))
}

Tile.prototype.afterAnimateGenesis = function()
{
	this.generatedButNotAnimated = false;
}

Tile.prototype.animateMove = function()
{
	var cssProperty;

	if(this.moveLeft > 0)
	{
		var moveDistancePixels = ((Cell.cellWidth + Cell.cellMargin) * this.moveLeft) * -1;
		cssProperty = {left: "+=" + moveDistancePixels + "px"};
	}
	else if(this.moveRight > 0)
	{
		var moveDistancePixels = (Cell.cellWidth + Cell.cellMargin) * this.moveRight;
		cssProperty = {left: "+=" + moveDistancePixels + "px"};
	}
	else if(this.moveUp > 0)
	{
		var moveDistancePixels = ((Cell.cellHeight + Cell.cellMargin) * this.moveUp) * -1;
		cssProperty = {top: "+=" + moveDistancePixels + "px"};
	}
	else if(this.moveDown > 0)
	{
		var moveDistancePixels = (Cell.cellHeight + Cell.cellMargin) * this.moveDown;
		cssProperty = {top: "+=" + moveDistancePixels + "px"};
	}	
	else
	{
		return;
	}

	this.getElement().animate(cssProperty, 75, $.proxy(this.afterAnimateMove, this));

	this.tileManager.tilesAnimating++;
}

Tile.prototype.afterAnimateMove = function()
{
	this.tileManager.tilesAnimating--;
}

Tile.prototype.updatePosition = function()
{
	this.cell.removeTile();

	//Find new cell in grid
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