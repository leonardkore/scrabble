
function Opponent() {

	this.createTiles = function () {
		var arr = [0, 1, 2, 3, 4, 5, 6];
		var letter;

		for (var i = 0; i < 7; i++){
			letter = user.nextLetter();	
			tiles[i] = (new Block(user.position(arr[i]), 567, letter));
		}
	}

	this.play = function () {
		var difficulty = 0;
		user.allPossibleWords(true);
		if (first) 
			first = false;
		var arr2 = finalWords_[difficulty].location.slice();
		var arr3 = finalWords_[difficulty].gridNum.slice();

		for (var i = 0; i < arr2.length; i++){
			tiles[arr2[i]].move(arr3[i], true);
		}

		user.savetoFixed(finalWords_[difficulty].location, true);
		user.addPieces(finalWords_[difficulty].location, true);

		if (!first) {

			compScore = compScore + finalWords_[difficulty].sum;
			lastWordComp = finalWords_[difficulty].finalWords;
			pointsC = finalWords_[difficulty].sum;
		}

		finalWords_.length = 0;
		if (gV){
			user.allPossibleWords();
			divs.writeWords();
			divs.isOver();
		}

		divs.scoreAndWord();
	}
}