var Tile = function(x, y, value)
{
	//generate coordinates
	//Right now this is for an empty grid, later change this so that it picks a random x or y that has empty spaces, then randomly pick from the empty spacecs. 
	this.x = x;
	this.y = y;

	//generate value
	this.value = value || (parseInt(Math.random()*10) % 5 == 0) ? (4) : (2);

	//generate tile
	this.element = $("<div class='tile' x='" + this.x + "' y='" + this.y + "'>" + this.value + "</div>");				//Element is a dumb name. Maybe get rid of the value class. The value should probably be in an attribute or something, but
}