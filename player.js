
function Player() {

	this.orientation;

	this.play = function () {
		user.integrityCheck();
		if (arguments.callee.caller){
			var sec = true;
		}
		if (user.firstWordCheck(sec)){
			user.savetoFixed(user.numPieces());
			user.addPieces(user.numPieces());
			finalWords_.length = 0; 
			user.integrityCheck();
			opponent.play();
			divs.scoreAndWord();
			
		} else {
			user.clears();
		}

	} 

	this.integrityCheck = function () {
		for (var i = 0; i < fixedPieces.length; i++){
			isOccupied[fixedPieces[i].blockGridPos] = true;
		}
	}


	this.coordinates = function(lett, x, y, bgp){
		this.letter = lett;
		this.bx = x;
		this.by = y;
		this.blockGridPos = bgp;
	}

	this.addPieces = function(arr, opp, ng) {

		var letter;

		for (var i = 0; i < arr.length; i++){
			if (ng){
				letter = user.nextLetter();	
				if (letter === 'true'){
					user.newGame();
					return;
				}
				blocks[arr[i]] = (new Block(this.position(arr[i]), sizeOfBlock, letter));
				letter = user.nextLetter();	
				if (letter === 'true'){
					user.newGame();
					return;
				}
				tiles[arr[i]] = (new Block(this.position(arr[i]), 567, letter));
			} else {
				letter = user.nextLetter();	
				if (letter === 'true'){
					user.newGame();
					break;
				}
				if (opp){
					tiles[arr[i]] = (new Block(this.position(arr[i]), 567, letter));
				} else {
					blocks[arr[i]] = (new Block(this.position(arr[i]), sizeOfBlock, letter));
				}
			}
			
		}

	}

	this.position = function (pos) {

		for (var i = 0; i < 7; i++){
			if (pos === i){
				return (620 + (43*i))
			}
		}

	}

	this.numPieces = function () {
		var count = [];

		for (var i = 0; i < blocks.length; i++){
			if (blocks[i].blockGridPos != -1){
				count.push(i);
			}
		}

		return count;
	}

	this.pass = function () {
		opponent.play();
	}

	this.clears = function () {

		for (var i = 0; i < blocks.length; i++){
			blocks[i].cleared();
		}

	}

	this.peek = function () {
		peek = !peek;
	}

	this.savetoFixed = function(arr, opp) {

		for (var i = 0; i < arr.length; i++){
			if (opp){
				fixedPieces.push(new this.coordinates(tiles[arr[i]].letter, tiles[arr[i]].bx, tiles[arr[i]].by, tiles[arr[i]].blockGridPos));
				isOccupied[tiles[arr[i]].blockGridPos] = true;
			} else {
				fixedPieces.push(new this.coordinates(blocks[arr[i]].letter, blocks[arr[i]].bx, blocks[arr[i]].by, blocks[arr[i]].blockGridPos));
				isOccupied[blocks[arr[i]].blockGridPos] = true;
			}
			
		}
	}	

	this.newGame = function(){

		box_ = random([1, 15]);

		compScore = 0;
		playerScore = 0;
		lastWordComp = '';
		lastWordPlayer = '';
		pointsP = 0;
		pointsC = 0;

		divs.scoreAndWord();

		bag = [];
		fixedPieces = [];
		first = true;

		for (var i = 1; i < 226; i++){
			isOccupied[i] = false;
		}

		user.letterDist();
		user.addPieces([0,1,2,3,4,5,6], false, true);
		
		if (gV) {
			user.allPossibleWords();
			divs.hideAll();
			divs.writeWords();
			divs.isOver();
		}
	}

	this.firstWordCheck = function (sec) {

		if (sec){
			first = false;
			return true;
		}

		var centerCheck = false;

		if (first){

			for (var i = 0; i < blocks.length; i++){
				if (blocks[i].blockGridPos === 113){
					centerCheck = true;
				}
			}

			if (!centerCheck){
				alert("First word must be on star");
				return false;
			} else if (user.numPieces().length === 1){ 
				alert("Word must be at least 2 letters");
				return false;
			} else if (!this.verticalHorizontalCheck()){
				return false;
			} else {
				first = false;
				return true;
			}
		}

		return this.verticalHorizontalCheck();

	}

	this.compareArrays = function( arr1, arr2){
		if (arr1.length != arr2.length){
			return false;
		}

		for (var i = 0; i < arr1.length; i++){
			if (arr1[i] !== arr2[i]){
				return false;
			}
		}

		return true;
	}

	this.secCheck = function(num, gridNum) {

		for (var i = 0; i < gridNum.length - 1; i++){
			if (gridNum[i] === (gridNum[i + 1] - num)){

			}  else {
				return false;
			}
		}

		return true;

	}

	this.verticalHorizontalCheck = function() {

		var gridNum = [];
		var verticalMissing = [];
		var vertIdeal = [];
		var horiIdeal= [];
		var count = 0;
		var stop = false;


		gridNum = this.getGridNum();

		var start = gridNum[0];

		for (var i = 0; i < gridNum.length ; i++){
			stop = false;
			for (var x = 0; x < fixedPieces.length; x++){
				if ((start +  (count * 15)) === (fixedPieces[x].blockGridPos)){
					gridNum.push(start +  (count * 15));
					verticalMissing.push(start +  (count * 15));
					count++;
					stop = true;
				}
			}
			if (!stop) {
				count++;
			}

		}

		gridNum = gridNum.sort((a, b) => a - b);

		if (this.secCheck(15, gridNum)){
			this.orientation = 'vertical';
			return this.proximity(gridNum);
		}

		count = 0;
		this.removeThese(gridNum, verticalMissing);

		for (var i = 0; i < gridNum.length; i++){
			stop = false;
			for (var x = 0; x < fixedPieces.length; x++){
				if ((start + count) === (fixedPieces[x].blockGridPos)){
					gridNum.push(start + count);
					count++;
					stop = true;
				}
			}

			if (!stop){
				count++;
			}
		}

		gridNum = gridNum.sort((a, b) => a - b);

		if (this.secCheck(1, gridNum)){
			this.orientation = 'horizontal';
			return this.proximity(gridNum);
		}

		alert("Make a vertical or horizontal word");
		return false;

	}

	this.removeThese = function(arr1, arr2) {

		for (var i = 0; i < arr2.length; i++){

			if (arr1.indexOf(arr2[i]) != -1)
				arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
		return arr1;
	}

	this.getGridNum = function(){

		var gridNum = [];

		for (var i = 0; i < blocks.length; i++){
			if (blocks[i].blockGridPos != -1)
				gridNum.push(blocks[i].blockGridPos);
		}

		gridNum = gridNum.sort((a, b) => a - b);

		return gridNum;

	}

	this.proximity = function (arr) {

		var temp = [];
		var neighbors = [];
		var gridNum = [];

		for (var i = 0; i < fixedPieces.length; i++){
			temp[0] = fixedPieces[i].blockGridPos + 1;
			temp[1] = fixedPieces[i].blockGridPos - 1;
			temp[2] = fixedPieces[i].blockGridPos + 15;
			temp[3] = fixedPieces[i].blockGridPos - 15;

			for (var p = 0; p < temp.length; p++){
				if (temp[p] > 0 && temp[p] < 256){
					neighbors.push(temp[p]);
				}
			}
			
		}

		gridNum = this.getGridNum();

		for (var i = 0; i < gridNum.length; i++){
			for (var x = 0; x < neighbors.length; x++) {
				if (gridNum[i] === neighbors[x]){
					return this.compileWords(arr);
				}
			}
		}

		if (first)
			return this.compileWords(arr);

		alert("Place word next to already established squares");

		return false;

	}

	this.lessOneWordCheck = function(gridNum, x, y) {

		var keepGoing = true;
		var num = gridNum[y] + x;

		while (keepGoing){

			if (isOccupied[num]){
				gridNum.push(num);						
			} else {
				keepGoing = false;
			}

			if (x === 1){
				if (num % 15 === 1 || x % 15 === 0){
					keepGoing = false;
				}
			}

			num = num + x;
		}

		return gridNum;
	}

	this.oneLetterWordCreator = function(gridNum, x){

		var num = gridNum[0];

		num = num + x;
		
		var keepGoing = true;
		var arr2 = gridNum.slice();

		while (keepGoing) {
			if (isOccupied[num]){
				arr2.push(num);
			} else {
				keepGoing = false;
			}

			if (x === 1){
				if (x % 15 === 0 || x % 15 === 1){
					keepGoing = false;
				}
			}

			num = num + x;
		}

		return arr2;
	}

	this.makeWordFromGridNumbers = function(gridNum) {

		var word = '';
		var arr = user.numPieces();

		gridNum = gridNum.sort((a, b) => a - b);
		gridNum = this.removeDuplicates(gridNum);		

		for (var i = 0; i < arr.length; i++){
			for (var p = 0; p < gridNum.length; p++){
				if (blocks[arr[i]].blockGridPos === gridNum[p]){
					gridNum[p] = [];
					gridNum[p][0] = blocks[arr[i]].letter
				}
			}
		}
		for (var i = 0; i < gridNum.length; i++){
			if (isNaN(gridNum[i])) {
				word = word + (gridNum[i]);
			} else {
				for (var p = 0; p < fixedPieces.length; p++){
					if (fixedPieces[p].blockGridPos === gridNum[i]){
						word = word + fixedPieces[p].letter;
					}
				}
			}
		}

		return word;

	}

	this.compileWords = function(gridNum) {

		var fw;
		var sum = 0;
		var word = [];
		var finalWords = [];

		if (gridNum.length === 1) {

			var vert = false;
			var hori = false;

			word.push(this.oneLetterWordCreator(gridNum, -1));
			word.push(this.oneLetterWordCreator(gridNum, 1));
			word.push(this.oneLetterWordCreator(gridNum, -15));
			word.push(this.oneLetterWordCreator(gridNum, 15));

			if (word[0].length > 1 && word[1].length > 1){
				word[4] = [];
				word[4].push(this.oneLetterWordCreator(gridNum, -1));
				word[4].push(this.oneLetterWordCreator(gridNum,  1));
				word[5] = word[4][0].concat(word[4][1]);
				word[5] = this.removeDuplicates(word[5]);
				word[5] = this.makeWordFromGridNumbers(word[5]);
				finalWords.push(word[5]);
				hori = true;				

			}

			if (word[2].length > 1 && word[3].length > 1){
				word[6] = [];
				word[6].push(this.oneLetterWordCreator(gridNum, 15));
				word[6].push(this.oneLetterWordCreator(gridNum, -15));
				word[7] = word[6][0].concat(word[6][1]);
				word[7] = this.removeDuplicates(word[7]);
				word[7] = (this.makeWordFromGridNumbers(word[7]));
				finalWords.push(word[7]);
				vert = true;				
			}

			for (var i = 0; i < 4; i++){
				if (word[i].length > 1){
					word[i] = this.makeWordFromGridNumbers(word[i]);
				}
			}

			if (vert && !hori){
				if (word[0].length > 1)
					finalWords.push(word[0]);
				if (word[1].length > 1)
					finalWords.push(word[1]);				
			}

			if (!vert && hori){
				if (word[2].length > 1)
					finalWords.push(word[2]);
				if (word[3].length > 1)
					finalWords.push(word[3]);				

			}

			if (!vert && !hori){
				for (var i = 0; i < 4; i++){
					if (word[i].length > 1){
						finalWords.push(word[i]);
					}
				}

			}

			console.log(finalWords);

			return this.isWord(finalWords);

		}

		var arr2 = this.getGridNum().slice();

		finalWords = this.finalWordCreator(arr2, gridNum, false);

		console.log(finalWords);

		if (this.isWord(finalWords)){
			lastWordPlayer = finalWords.slice();
			fw = finalWords.join("");
			for (var i = 0; i < fw.length; i++){
				sum = sum + blocks[0].numValue(fw[i]);
			}

			playerScore = playerScore + sum;
			pointsP = sum;
			return true;
		} else {
			return false;
		}
	}

	this.finalWordCreator = function (arr2, gridNum){

		var word = [];
		var finalWords = [];

		switch(this.orientation){
			case 'vertical':
				for (var i = 0; i < arr2.length ; i++){
					word[i + 1] = [];
					word[i + 1].push(this.oneLetterWordCreator([arr2[i]] , -1));
					word[i + 1].push(this.oneLetterWordCreator([arr2[i]] , 1));
					word[arr2.length + 1 + i] = word[i + 1][0].concat(word[i + 1][1]);
					word[arr2.length + 1 + i] = this.removeDuplicates(word[arr2.length + 1 + i]);
					word[arr2.length + 1 + i] = this.makeWordFromGridNumbers(word[arr2.length + 1 + i]);
					gridNum = this.lessOneWordCheck(gridNum, -15, gridNum.length - 1);
					gridNum = this.lessOneWordCheck(gridNum, 15, 0);
				}				
				break;
			case 'horizontal':
				for (var i = 0; i < arr2.length ; i++){
					word[i + 1] = [];
					word[i + 1].push(this.oneLetterWordCreator([arr2[i]] ,-15));
					word[i + 1].push(this.oneLetterWordCreator([arr2[i]] , 15));
					word[arr2.length + 1 + i] = word[i + 1][0].concat(word[i + 1][1]);
					word[arr2.length + 1 + i] = this.removeDuplicates(word[arr2.length + 1 + i]);
					word[arr2.length + 1 + i] = this.makeWordFromGridNumbers(word[arr2.length + 1 + i]);
					gridNum = this.lessOneWordCheck(gridNum, -1, gridNum.length - 1);
					gridNum = this.lessOneWordCheck(gridNum, 1, 0);
				}
				break;
		}

		word[0] = this.makeWordFromGridNumbers(gridNum);

		finalWords.push(word[0]);

		for (var i = arr2.length + 1; i < arr2.length + 1 + arr2.length; i++){
			if (word[i].length > 1){
				finalWords.push(word[i]);
			}
		}

		return finalWords;		
	}

	this.noWordsOnBoardView = function (opp) {

		finalWords_.length = 0;

		var letters = [];
		var words = [];
		var list = [];
		var sum = 0;
		var locationandGrid = [];

		if (opp) {
			for (var i = 0; i < tiles.length; i++){
				letters[i] = tiles[i].letter;
			}
		} else {
			for (var i = 0; i < blocks.length; i++){
				letters[i] = blocks[i].letter;
			}
		}

		for (var subset of G.powerSet(letters)) {
			subset = subset.join("");
			if (subset != '' && subset.length > 1) {
				list = this.createWords(subset, subset.length);
				for (var i = 0; i < list.length; i++){
					words.push(list[i]);
				}
				list.length = 0;
			}
		}

		words = this.removeDuplicates(words, true);

		for (var i = 0; i < words.length; i++){
			for (var p = 0; p < words[i].length; p++){
				sum = sum + blocks[0].numValue(words[i][p]);
			}
			locationandGrid = this.locationAndGridFunc(words[i], letters);
			finalWords_.push(new this.noWordsCor(words[i], sum, locationandGrid[0], locationandGrid[1]));
			sum = 0;
		}

		finalWords_ = finalWords_.sort((a, b) => b.sum - a.sum);
	}

	this.locationAndGridFunc = function(words, letters, num){
		var gridNum = [];
		var arr2 = letters.slice();
		var arr3 = [];
		var arr4 = [];

		var start = 113 - (parseInt(words.length / 2) * box_);

		for (var i = 0; i < words.length; i++){
			gridNum[i] = start + i * (box_);
		}

		for (var i = 0; i < words.length; i++){
			arr3.push(arr2.indexOf(words[i]));
			arr2[arr2.indexOf(words[i])] = '';
		}

		arr4.push(arr3);
		arr4.push(gridNum);

		return 	arr4;	
	}

	this.noWordsCor = function(words, sum, location, gridNum){
		this.finalWords = words;
		this.sum = sum;
		this.location = location;
		this.gridNum = gridNum;
	}

	this.allPossibleWords = function (opp){

		if (first){
			user.noWordsOnBoardView(opp);
			return;
		}
		finalWords_.length = 0;
		var space = [];
		var num;
		var letters = [];
		var space2 = [];
		var upArr = []; var downArr = []; var leftArr = []; var rightArr = [];
		var upWord = []; var downWord = []; var leftWord = []; var rightWord = [];
		var temp = [];
		var onBoard = [];
		var arr2 = [];
		var arr3 = [];

		for (var i = 0; i < 4; i++){
			onBoard[i] = [];
		}

		for (var i = 0; i < fixedPieces.length; i++){
			num = fixedPieces[i].blockGridPos;
				if (!isOccupied[num + 15])
					space.push(num + 15);
				if (!isOccupied[num - 15])
					space.push(num - 15);
				if (!isOccupied[num + 1 ])
					space.push(num + 1 );
				if (!isOccupied[num - 1 ])
					space.push(num - 1 );
		}

		for (var i = 0; i < fixedPieces.length; i++){
			arr3[fixedPieces[i].blockGridPos] = fixedPieces[i].letter;
		}
		if (opp) {
			for (i = 0; i < tiles.length; i++){
				letters.push(tiles[i].letter);
			}
		} else {
			for (i = 0; i < blocks.length; i++){
				letters.push(blocks[i].letter);
			}
		}

		for (var i = 0; i < space.length; i++){
			space2.push(new user.spaceCoordinates(space[i], user.spaceGrid(-1, space[i]), user.spaceGrid(1, space[i]), user.spaceGrid(-15, space[i] ), user.spaceGrid(15, space[i])))
		}

		for (var subset of G.powerSet(letters)) {
			
			for (var i = 0; i < space2.length; i++){
				for (var c = 0; c < 4; c++){
					onBoard[c].length = 0;
				}
				upArr.length = 0; downArr.length = 0; leftArr.length = 0; rightArr.length = 0;
				upWord.length = 0; downWord.length = 0; leftWord.length = 0; rightWord.length = 0;
				if (space2[i].down.length !== 0){
					for (var p = 0; p < space2[i].down.length; p++) {
						downArr.push(space2[i].down[p].letter);
						onBoard[0].push(space2[i].down[p].number);
					}
					downWord = downArr.slice();
					downArr = downArr.concat(subset);
				}
				if (space2[i].left.length !== 0){
					for (var p = 0; p < space2[i].left.length; p++) {				
						leftArr.push(space2[i].left[p].letter);
						onBoard[1].push(space2[i].left[p].number);						
					}
					leftWord = leftArr.slice();
					leftArr = leftArr.concat(subset);											
				}
				if (space2[i].right.length !== 0){
					for (var p = 0; p < space2[i].right.length; p++) {
						onBoard[2].push(space2[i].right[p].number);
						rightArr.push(space2[i].right[p].letter);
					}
					rightWord = rightArr.slice();
					rightArr = rightArr.concat(subset);						
				}
				if (space2[i].up.length !== 0){
					for (var p = 0; p < space2[i].up.length; p++) {
						onBoard[3].push(space2[i].up[p].number);
						upArr.push(space2[i].up[p].letter);
					}
					upWord = upArr.slice();
					upArr = upArr.concat(subset);
				}

				if (rightArr.length > 1) {
					temp = user.createWords(rightArr.join(""), rightArr.length);
					if (temp.length > 0) {
						for (var a = 0; a < temp.length; a++){
							if (user.isSubset(temp[a], rightWord.join(""))){
								user.getGridNumII(onBoard[2], rightWord.join(""), temp[a], 1, arr3, opp);
							}
						}
					}
				}	
				if (leftArr.length > 1) {
					temp = user.createWords(leftArr.join(""), leftArr.length);
					if (temp.length > 0){
						for (var a = 0; a < temp.length; a++) {
							if (user.isSubset(temp[a], leftWord.join(""))){	
								user.getGridNumII(onBoard[1], leftWord.join(""), temp[a], 1, arr3, opp);
							}
						}

					}	
				}	
				if (upArr.length > 1) {
					temp = user.createWords(upArr.join(""), upArr.length);
					if (temp.length > 0){
						for (a = 0; a < temp.length; a++){
							if (user.isSubset(temp[a], upWord.join(""))){
								user.getGridNumII(onBoard[3], upWord.join(""), temp[a], 15, arr3, opp);								
							}
						}
					}
				}	
				if (downArr.length > 1) {
					temp = user.createWords(downArr.join(""), downArr.length);
					if (temp.length > 0){
						for (a = 0; a < temp.length; a++){
							if (user.isSubset(temp[a], downWord.join(""))){	
								user.getGridNumII(onBoard[0], downWord.join(""), temp[a], 15, arr3, opp);
							}
						}
					
					}

				}

			}

		}

		finalWords_ = finalWords_.sort((a, b) => b.sum - a.sum);

		// remove duplicates from array of objects

		var arr = {};

		for ( var i=0, len=finalWords_.length; i < len; i++ )
		    arr[finalWords_[i]['finalWords']] = finalWords_[i];

		finalWords_ = new Array();

		for ( var key in arr )
		    finalWords_.push(arr[key]);

		//removal done

			
	}

	this.getGridNumII = function (onBoard, downWord, temp, x, arr3, opp) {

		var num = x;
		var num2 = x;
		var gridNum = [];
		var k = temp.indexOf(downWord);
		var p = temp.indexOf(downWord) + downWord.length;
		var numLetter = [];
		var count = 0;
		var arr2 = [];
		var oBNumLetter = [];
		var finalWords = [];
		var c = [];	
		var sum = 0;
		var location = [];

		var str = temp;
		str = str.replace(downWord, "");

		if (str.length === 0){
			return;
		}

		if (opp) {

			for (i = 0; i < tiles.length; i++){
				tiles[i].blockGridPos = -1;
				arr2[i] = tiles[i].letter; 
			}
		} else {
			for (i = 0; i < blocks.length; i++){
				blocks[i].blockGridPos = -1;
				arr2[i] = blocks[i].letter; 
			}
		}

		while (k > 0){
			gridNum.push(onBoard[0] - num);
			k--;
			num = num + x;
		}

		while (p < temp.length){
			gridNum.push(onBoard[onBoard.length - 1] + num2)
			p++;
			num2 = num2 + x;
		}

		gridNum = gridNum.sort((a, b) => a - b);

		for (var i = 0; i < gridNum.length; i++){
			if (isOccupied[gridNum[i]]){
				return false;
			}
		}

		c = gridNum.concat(onBoard);
		c = c.sort((a, b) => a - b);

		if ((gridNum.length + onBoard.length) < (c.length)){
			alert('err', temp);
		}

		if (!this.edgeTest(c, x)){
			return;
		}

		for (var i = 0; i < str.length; i++){
			numLetter.push(new this.cor(gridNum[i], str[i]));
		}

		for (var i = 0; i < numLetter.length; i++){
			for (var z = 0; z < arr2.length; z++){
				if (numLetter[i].letter === arr2[z]){
					arr2[z] = '';
					location.push(z);
					break;				
				}
			}
		}

		finalWords = this.createWordsForComp(gridNum, numLetter, str, temp, arr3, x, c);	

		if (this.isWord(finalWords, true)){

			for (var i = 0; i < finalWords.length; i++){
				for (var p = 0; p < finalWords[i].length; p++){
					sum = sum + blocks[0].numValue(finalWords[i][p]);
				}
			}
			if (c.length === (onBoard.length + gridNum.length)){
				finalWords_.push(new this.finalHolder(c, gridNum, finalWords, sum, location));
			} else {
				console.log(finalWords, "error");
			}
				
			sum = 0;
		}

	}

	this.finalHolder = function (c, gridNum, finalWords, sum, location){
		this.c = c;
		this.gridNum = gridNum;
		this.finalWords = finalWords;
		this.sum = sum;
		this.location = location;
	}

	this.edgeTest = function (c, x) {

		if (x === 1){
			var num =  parseInt(c[0]/15) + 1;

			if ((c[c.length - 1]  <= (num * 15)) && (c[0] > ((num - 1) * 15)) ) {

			} else {
				return false;
			}
		} else {
			if ( (c[c.length - 1] <= 225)  && (c[0] >= 1) ){

			} else {
				return false;
			}
		}

		if (x === 1){
			var row = parseInt((c[0] - 1) / 15) + 1;
			var rowStart = (( row - 1 ) * 15 ) + 1;
			var rowEnd = rowStart + 14;
			for (var i = 0; i < c.length; i++){
				if (c[i] <= rowEnd && c[i] >= rowStart){
					// console.log(rowStart, rowEnd, c);
				} else {
					// console.log(rowStart, rowEnd);
					return false;
				}
			}
		}

		return true;
	}

	this.create = function (num, x, arr3) {

		var letters = [];

		while (isOccupied[num]){

			letters.push(arr3[num]);
			if (x === 1){
				if (num % 15 === 0 || num % 15 === 1){
					return letters.join("");
				}
			}
			num = num + x;
		}

		return letters.join("");

	}

	this.createWordsForComp = function (gridNum, numLetter, str, temp, arr3, x, c) {

		if (x === 15){
			x = 1;
		} else {
			x = 15;
		}

		var lettersBefore = '';
		var lettersAfter = '';
		var wordBank = [];
		var onBoardLetters = [];
		var final = [];

		var num;
		

		for (var i = 0; i < numLetter.length; i++){
			num = numLetter[i].number - x;
			lettersBefore = this.create(num , -x, arr3);
			num = numLetter[i].number + x;
			lettersAfter = this.create(num, x, arr3);
			if (lettersBefore.length > 0 || lettersAfter.length > 0){
				lettersBefore = this.returnReverse(lettersBefore);
				wordBank.push(lettersBefore.concat(numLetter[i].letter, lettersAfter));
			}
		}

		if (x === 1){
			x = 15;
		} else {
			x = 1;
		}

		lettersBefore = '';
		lettersAfter = '';

		num = c[0] - x;
		lettersBefore = this.create(num , -x, arr3);
		num = c[c.length - 1] + x;
		lettersAfter = this.create(num, x, arr3);

		if (lettersBefore.length > 0 || lettersAfter.length > 0){
			lettersBefore = this.returnReverse(lettersBefore);
			wordBank.push(lettersBefore.concat(temp, lettersAfter));
		} else {
			wordBank.push(temp);
		}

		return wordBank;
	}

	this.returnReverse = function(str){
	   if (str === "")
	    return "";
	  else
	    return this.returnReverse(str.substr(1)) + str.charAt(0);

	}


	this.isSubset = function (arr1, arr2) {

		return arr1.indexOf(arr2) >= 0;
	}

	this.spaceGrid = function (x, y) {

		var num = x + y;
		var keepGoing = true;
		var arr = [];
		var lett;

		while(keepGoing){
			if (isOccupied[num]){
				for ( var i = 0; i < fixedPieces.length; i++){
					if (fixedPieces[i].blockGridPos === num){
						lett = fixedPieces[i].letter;
					}
				}
				arr.push(new this.cor(num, lett));
			} else {
				keepGoing = false;
			}

			if (x === 1){
				if (num % 15 === 1 || num % 15 === 0){
					keepGoing = false;
				}
			}

			num = num + x;
		}

		if (x < 0){
			arr = arr.reverse();
		}

		return arr;

	}

	this.cor = function (number, letter){
		this.number = number;
		this.letter = letter;
	}

	this.spaceCoordinates = function(start, left, right, up, down){
		this.start = start;
		this.left = left;
		this.right = right;
		this.up = up;
		this.down = down;
	}	

	this.createButtons = function () {

		play = createButton('Play');
		play.position(630, 90);
		play.mousePressed(this.play);

		pass = createButton('Pass');
		pass.position(680, 90);
		pass.mousePressed(this.pass);

		clears = createButton('Clear');
		clears.position(730, 90);
		clears.mousePressed(this.clears);

		swap = createButton('Peek');
		swap.position(780, 90);
		swap.mousePressed(this.peek);

		ng = createButton('New Game');
		ng.position(835, 90);
		ng.mousePressed(this.newGame);

		godView = createButton('God View');
		godView.position(730, 120);
		godView.mousePressed(function () {
			gV = !gV;
			if (!gV) {
				divs.hideAll();
			} else {
				user.allPossibleWords();
				divs.hideAll();
				divs.writeWords();
				divs.isOver();
			}
		});

	}

	this.dist = function(p){

		switch(p){
			case 'E':
				return 12;
			case 'A':
			case 'I':
				return 9;
			case 'O':
				return 8;
			case 'N':
			case 'R':
			case 'T':
				return 6;
			case 'L':
			case 'S':
			case 'U':
			case 'D':
				return 4;
			case 'Q':
			case 'Z':
			case 'K':
			case 'J':
			case 'X':
				return 1;
			case 'G':
				return 3;
			case 'B':
			case 'C':
			case 'M':
			case 'P':
			case 'F':
			case 'H':
			case 'V':
			case 'W':
			case 'Y':
				return 2;

		}
	}


	this.letterDist = function() {

		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		var count = 0;

		while (count < 26){
			var p = alphabet[count].toUpperCase();
			this.num = this.dist(p);
			for (var i = 0; i < this.num ; i++){
				bag.push(p);
			}
			count++;
		}

		// bag.push(' ');
		// bag.push(' ');
		
	}

	this.nextLetter = function () {

		if (bag.length === 0){
			if (playerScore > compScore){
				divs.scoreAndWord();
				alert("You Win !");
			}
			if (playerScore === compScore){
				divs.scoreAndWord();
				alert("Tie Game !");
			}
			if (playerScore < compScore) {
				divs.scoreAndWord();
				alert("You Lose");
			}
			
			return 'true';
		}

		var letter = random(bag);
		var index = bag.indexOf(letter);
		bag.splice(index, 1);

		return letter;
	}

	this.makeArray = function(word) {

		var arr = [];
		for (var i = 0; i < word.length; i++){
			arr[i] = word[i];
		}

		return arr;

	}

	this.removeDuplicates = function(arr , x) {

	  var i,
	      len=arr.length,
	      out=[],
	      obj={};

	  for (i=0;i<len;i++) {
	    obj[arr[i]]=0;
	  }
	  for (i in obj) {
	  	if (x){
	  		out.push(i);
	  	}
	  	else {
	  		out.push(parseInt(i));
	  	}
	    
	  }
	  return out;
	}

	this.isWord = function (arr, x) {

		var word;
		var alphaWord;

		for (var i = 0; i < arr.length; i++){
			word = arr[i];
			alphaWord = alphabeticOrder(word);
			if (lib[word.length][alphaWord]){
				if (lib[word.length][alphaWord][word]){

				} else {
					if (!x)
						alert(arr[i] + " is not a word");
					return false;
				}

			} else {
				if (!x)
					alert(arr[i] + " is not a word");
				return false;
			}

		}

		return true;

	}

	this.createWords = function (word, numLetters) {

		answers = [];
		word = alphabeticOrder(word);

		for (var prop in lib[numLetters][word]) { 
			answers.push(prop);
		}

		answers = user.removeDuplicates(answers, true);

		return answers;		
	}
}