var Tile = function(x, y, value)
{
	//generate coordinates
	//Right now this is for an empty grid, later change this so that it picks a random x or y that has empty spaces, then randomly pick from the empty spacecs. 
	this.x = x;
	this.y = y;
	this.hasMerged = false;

	//generate value
	this.value = value || (parseInt(Math.random()*10) % 5 == 0) ? (4) : (2);
}

Tile.prototype.getHTML = function()
{
	return $("<div class='tile' x='" + this.x + "' y='" + this.y + "' style = 'background-color: " + this.getColor() + "'>" + "<div class=value style = 'font-size: " + this.getFontSize() + "px; margin-top: " + (106.25 - this.getFontSize())/2 + "px'>"  + this.value + "</div></div>");
	//return $("<div class='tile' x='" + this.x + "' y='" + this.y + "'>" + this.value + "</div>");
}

Tile.prototype.getFontSize = function()
{
	var valueString = this.value + "";
	var length = valueString.length;
	var size;

/*	if(length < 5)
	{
		size = parseInt(100 - (length-1)*19);
	}
	else if(length >= 5 && length < 7)
	{
		size = parseInt(35 - (length-5)*6);
	}
	else if(length >= 7 && length <9)
	{
		size = parseInt(25 - (length-7)*3);
	}					*/											//Might need more cases(including potentially a truncate), but this is good for now

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
/*	var red = this.calculateColorComponent(102, 255, 10, 16);
	var green = this.calculateColorComponent(102, 200, 1, 8);
	var blue = this.calculateColorComponent(102, 200, 3, 12);

	return "#" + red + green + blue;*/


	return "hsla(" + this.value + "," + 75 + "%," + 35 + "%," + 1 + ")";
}

Tile.prototype.calculateColorComponent = function(initialValue, finalValue, startingPower, endingPower)
{
	var slope = parseInt((255-initialValue)/(endingPower-startingPower));
	var power = this.getPower();

	if(power >= startingPower && power <= endingPower)
	{
		console.log(((power-startingPower)*slope + initialValue).toString(16));
		return ((power-startingPower)*slope + initialValue).toString(16);
	}
	else
	{
		return "00";
	}
}

Tile.prototype.getPower = function()
{
	var power = 1;
	var tempValue = 2

	while(tempValue !== this.value)
	{
		tempValue *= 2;
		power++;
	}

	return power;
}

Tile.prototype.formatHexNumber = function(number)
{
	//if(number.)
}


Tile.prototype.move = function(x, y)
{
	this.x = x;
	this.y = y;
	this.element = $("<div class='tile' x='" + this.x + "' y='" + this.y + "'>" + this.value + "</div>");
}