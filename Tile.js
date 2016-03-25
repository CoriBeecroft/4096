var Tile = function(x, y, value)		//What is this value being passed in? oh, nevermind, probably?
{
	this.x = x;
	this.y = y;
	this.hasMerged = false;
	
	//generate value 80% chance of beig 2, 20% chance of being 4
	this.value = value || (parseInt(Math.random()*10) % 5 == 0) ? (4) : (2);
}

Tile.prototype.getHTML = function()
{
	return $("<div class='tile' x='" + this.x + "' y='" + this.y + "' style = 'background-color: " + this.getColor() + "'>" + "<div class=value style = 'font-size: " + this.getFontSize() + "px'>"  + this.value + "</div></div>");
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

Tile.prototype.move = function(x, y)
{
	this.x = x;
	this.y = y;
	this.element = $("<div class='tile' x='" + this.x + "' y='" + this.y + "'>" + this.value + "</div>");
}