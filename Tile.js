var Tile = function(x, y, value)
{
	//generate coordinates
	//Right now this is for an empty grid, later change this so that it picks a random x or y that has empty spaces, then randomly pick from the empty spacecs. 
	this.x = x;
	this.y = y;
	this.mergeQueued = false;

	//generate value
	this.value = value || (parseInt(Math.random()*10) % 5 == 0) ? (4) : (2);
}

Tile.prototype.getHTML = function()
{
	return $("<div class='tile' x='" + this.x + "' y='" + this.y + "'>" + this.value + "</div>");
}

Tile.prototype.move = function(x, y)
{
	this.x = x;
	this.y = y;
	this.element = $("<div class='tile' x='" + this.x + "' y='" + this.y + "'>" + this.value + "</div>");
}