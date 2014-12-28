var Tile = function(coordinates, value)
{
	//generate coordinates
	//Right now this is for an empty grid, later change this so that it picks a random x or y that has empty spaces, then randomly pick from the empty spacecs. 
	this.x = coordinates.x;
	this.y = coordinates.y;

	//generate value
	this.value = value || (parseInt(Math.random()*10) % 5 == 0) ? (4) : (2);

	//generate tile
	this.element =$("<div class='tile' x='" + this.x + "' y='" + this.y + "'>" + this.value + "</div>");				//Element is a dumb name. Maybe get rid of the value class. The value should probably be in an attribute or something, but
	$('div.tile-container').append(this.element);
	this.setPosition();
}

Tile.prototype.setPosition = function()
{
	//Should probably add some type checking on tile, 'cause this might be dangerous otherwise. 
	//extract x and y values
	var x = this.element.attr('x');
	var y = this.element.attr('y');
	
	//convert to top and left values
	x = x*(106.25 + 18);
	y = y*(106.25 + 15);

	//add inline css
	this.element.css("left", x + "px");
	this.element.css( "top", y + "px");
}