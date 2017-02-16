
function Block(xpos, ypos, letter){

    this.bx = xpos;
    this.by = ypos;	

    this.xOriginal = xpos;
    this.yOriginal = ypos;

    this.overBox = false;
    this.locked = false;
    this.xOffset = 0;
    this.yOffset = 0;
    this.boxSize = sizeOfBlock;
    this.letter = letter;
    this.blockGridPos = -1;
    this.curr = -1;
    this.color = [152, 251, 152];
    this.color = [ 176,224,230 ] ;

    textAlign(CENTER);	

    this.move = function(gridNum, real){
    	var num;
    	if (real){
    		this.blockGridPos = gridNum;
    		isOccupied[gridNum] = true;
    	}
    	var row;
    	if (gridNum > 0) {
    		row = parseInt((gridNum - 1) / 15 ) + 1;
    	} else {
    		row = 1;
    	}

    	num = gridNum % 15;
    	this.by = row * 38;
    	this.bx = ( num  ) * 38;
    	if (num === 0){
    		this.bx = 15 * 38;
    	}
    	this.color = [251, 152, 251];

    }

	this.show = function(ans) {
		var num;

		if (mouseX > this.bx && mouseX < this.bx + this.boxSize && mouseY > this.by && mouseY < this.by + this.boxSize) 	
		{
			this.overBox = true;

		} else {
			this.overBox = false;
		}

		// draw the box
		strokeWeight(2);
		stroke(this.color[0],this.color[1],this.color[2]);
		fill(255);
		rect(this.bx, this.by, this.boxSize, this.boxSize);
		fill(0);
		stroke(255);
		textSize(30);
		if (ans) {
			text(this.letter, this.bx + (sizeOfBlock/2) - 2, this.by + (sizeOfBlock) - 8);
			num = this.numValue(this.letter);
			if (num === 10){
					textSize(10);
				} else { 
					textSize(12);
			}

			text(num, this.bx + (sizeOfBlock/2) + 13, this.by + (sizeOfBlock) - 4);
		}

	}

	this.showFixed = function() {

		var num ; 

		for (var p = 0; p < fixedPieces.length; p++){
			strokeWeight(2);
			stroke(152, 251, 152);
			// stroke(255,255,204) ;
			fill(255);
			rect(fixedPieces[p].bx, fixedPieces[p].by, sizeOfBlock, sizeOfBlock);
			fill(0);
			stroke(255);
			textSize(30);
			text(fixedPieces[p].letter, fixedPieces[p].bx + (sizeOfBlock/2) - 2, fixedPieces[p].by + (sizeOfBlock) - 8);
			num = this.numValue(fixedPieces[p].letter);
			if (num === 10){
				textSize(10);
			} else { 
				textSize(12);
			}

			text(num, fixedPieces[p].bx + (sizeOfBlock/2) + 13, fixedPieces[p].by + (sizeOfBlock) - 4);
		}
	}

	this.numValue = function(letter) {
		switch(letter) {
			case ',':
			case ' ':
				return 0;
			case 'E':
			case 'A':
			case 'I':
			case 'O':
			case 'N':
			case 'R':
			case 'T':
			case 'L':
			case 'S':
			case 'U':
				return 1;
			case 'D':
			case 'G':
				return 2;
			case 'B':
			case 'C':
			case 'M':
			case 'P':
				return 3;
			case 'F':
			case 'H':
			case 'V':
			case 'W':
			case 'Y':
				return 4;
			case 'K':
				return 5;
			case 'J':
			case 'X':
				return 8;
			case 'Q':
			case 'Z':
				return 10;
		}
	}

	this.cleared = function(){

		this.bx = this.xOriginal;
		this.by = this.yOriginal;
		this.color = [152, 251, 152];
		this.color = [ 176,224,230 ] ;
		for (var i = 0; i < blocks.length; i++){
			blocks[i].blockGridPos = -1;
		}
	}

	this.bounds  = function(){
		var centerX = this.bx + sizeOfBlock / 2;
        var centerY = this.by + sizeOfBlock / 2;
		if (centerX > 608 || centerY > 608 || centerY < 38 || centerX < 38){
			this.bx = this.xOriginal;
			this.by = this.yOriginal;
			isOccupied[this.blockGridPos] = false;
			this.blockGridPos = -1;
		}
	}

	this.snap = function(curr) {

		var centerX = this.bx + sizeOfBlock / 2;
        var centerY = this.by + sizeOfBlock / 2;

        this.response = [];

		this.response = this.gridNumbers(centerX, centerY);

		if (this.response != 0) {

			if (this.curr === curr && this.blockGridPos === this.response[2]){
				this.stop = false;
			} else {
				this.stop = true;
			}

			if (isOccupied[this.response[2]] && this.stop){
				this.bx = this.xOriginal;
				this.by = this.yOriginal;
				isOccupied[this.blockGridPos] = false;
			} else {

				if (this.blockGridPos === this.response[2]){
				}	else {
					isOccupied[this.blockGridPos] = false;
					isOccupied[this.response[2]] = true;
				}
				this.blockGridPos = this.response[2];

				this.bx = this.response[0];
				this.by = this.response[1];

			}
			
		}

		this.curr = curr;

	}

	this.gridNumbers = function(centerX, centerY) {

		var tempX = sizeOfBlock;
		var tempY = sizeOfBlock;
		var arr = [];

		for (var i = 0; i < 15; i++) {
			for (var p = 0; p < 15; p++) {
				if (centerX <= tempX + sizeOfBlock && centerX >= tempX && centerY >= tempY && centerY <= tempY + sizeOfBlock) {
					arr[0] = tempX; arr[1] = tempY, arr[2] = (15*i+p + 1);
					return arr;
				}
				tempX = tempX + sizeOfBlock;
			}
			var tempX = sizeOfBlock;
			tempY = tempY + sizeOfBlock;
		}

		return 0;
	}

}