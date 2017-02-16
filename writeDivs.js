
function Divs() {

	this.divHolder = [];
	this.divHolderII = [];
	this.title = [];
	this.x = 18;
	this.score = [];
	this.word = [];

	this.createTitle = function () {

		this.score[0] = createDiv();
	    this.score[1] = createDiv();

	    this.word[0] = createDiv();
	    this.word[1] = createDiv();

	    this.score[2] = createDiv();
	    this.score[3] = createDiv();


		this.title[0] = createDiv("Word");
	    this.title[1] = createDiv("Score");

	    for (var i = 0; i < this.x; i++){
	    	this.divHolder[i] = createDiv();
	    }

	    for (var i = 0; i < this.x; i++){
	    	this.divHolderII[i] = createDiv();
	    }

	    this.scoreAndWordSetup();

	}

	this.scoreAndWord = function () {

		this.score[0].hide();
		this.score[1].hide();
		this.word[0].hide();
		this.word[1].hide();
		this.score[2].hide();
		this.score[3].hide();

		this.score[2] = createDiv("("+ pointsP + " points)");
		this.score[3] = createDiv("(" + pointsC + " points)");

		this.score[0] = createDiv(playerScore);
	    this.score[1] = createDiv(compScore);

	    this.word[0] = createDiv(lastWordPlayer);
	    this.word[1] = createDiv(lastWordComp);

		this.score[2].position(1040, 78);
		this.score[2].show();

		this.score[3].position(1075, 607);
		this.score[3].show();	

		this.score[0].position(1000, 38);
		this.score[0].show();

		
		this.score[1].position(1000, 567);
		this.score[1].show();

		
		this.word[0].position(1040, 58);
		this.word[0].show();

		
		this.word[1].position(1075, 587);
		this.word[1].show();
	}

	this.scoreAndWordSetup = function () {

		pScore = createDiv("Score:");
		cScore = createDiv("Score:");

		pWord = createDiv("User Played : ");
		cWord = createDiv("Opponent Played: ");

		pScore.position(950, 38);
		pWord.position(950, 58);

		cScore.position(950, 567);
		cWord.position(950, 587);

	}

	this.hideAll = function() {
		this.title[0].hide();
		this.title[1].hide();
		for (var i = 0; i < 18; i++){
			this.divHolder[i].hide();
			this.divHolderII[i].hide();
		}
	}


	this.writeWords = function () {
		this.x = 18;
		if (finalWords_.length < this.x){
	    	this.x = finalWords_.length;
	    }

		this.title[0].hide();
		this.title[0].position(660, 150);
		this.title[0].show();
		this.title[1].hide();
	    this.title[1].position(900, 150);
	    this.title[1].show();

	    for (var i = 0; i < this.x; i++){
	    	this.divHolder[i].hide();
	    	this.divHolder[i] = createDiv(finalWords_[i].finalWords);
	    	this.divHolder[i].position(650, 180 + (i * 20));
	    	this.divHolder[i].show();
	    }

	    for (var i = 0; i < this.x; i++){
	    	this.divHolderII[i].hide();
	    	this.divHolderII[i] = createDiv(finalWords_[i].sum);
	    	this.divHolderII[i].position(910, 180 + (i * 20));
	    	this.divHolderII[i].show();
	    }
	}

	this.isOver = function () {

		// hover 

		if (0 <= this.x) {
			this.divHolder[0].mouseOver(function() {
				divs.in(0);
			});
			this.divHolder[0].mouseOut(function() {
				divs.out(0);
			});	
		}
		if (1 <= this.x) {
			this.divHolder[1].mouseOver(function() {
				divs.in(1);
			});
			this.divHolder[1].mouseOut(function() {
				divs.out(1);
			});	
		}
		if (2 <= this.x) {
			this.divHolder[2].mouseOver(function() {
				divs.in(2);
			});
			this.divHolder[2].mouseOut(function() {
				divs.out(2);
			});	
		}
		if (3 <= this.x) {
			this.divHolder[3].mouseOver(function() {
				divs.in(3);
			});
			this.divHolder[3].mouseOut(function() {
				divs.out(3);
			});	
		}
		if (4 <= this.x) {
			this.divHolder[4].mouseOver(function() {
				divs.in(4);
			});
			this.divHolder[4].mouseOut(function() {
				divs.out(4);
			});	
		}
		if (5 <= this.x) {
			this.divHolder[5].mouseOver(function() {
				divs.in(5);
			});
			this.divHolder[5].mouseOut(function() {
				divs.out(5);
			});	
		}
		if (6 <= this.x) {
			this.divHolder[6].mouseOver(function() {
				divs.in(6);
			});
			this.divHolder[6].mouseOut(function() {
				divs.out(6);
			});	
		}
		if (7 <= this.x) {
			this.divHolder[7].mouseOver(function() {
				divs.in(7);
			});
			this.divHolder[7].mouseOut(function() {
				divs.out(7);
			});	
		}
		if (8 <= this.x) {
			this.divHolder[8].mouseOver(function() {
				divs.in(8);
			});
			this.divHolder[8].mouseOut(function() {
				divs.out(8);
			});	
		}
		if (9 <= this.x) {
			this.divHolder[9].mouseOver(function() {
				divs.in(9);
			});
			this.divHolder[9].mouseOut(function() {
				divs.out(9);
			});	
		}
		if (10 <= this.x) {
			this.divHolder[10].mouseOver(function() {
				divs.in(10);
			});
			this.divHolder[10].mouseOut(function() {
				divs.out(10);
			});	
		}
		if (11 <= this.x) {
			this.divHolder[11].mouseOver(function() {
				divs.in(11);
			});
			this.divHolder[11].mouseOut(function() {
				divs.out(11);
			});	
		}
		if (12 <= this.x) {
			this.divHolder[12].mouseOver(function() {
				divs.in(12);
			});
			this.divHolder[12].mouseOut(function() {
				divs.out(12);
			});	
		}
		if (13 <= this.x) {
			this.divHolder[13].mouseOver(function() {
				divs.in(13);
			});
			this.divHolder[13].mouseOut(function() {
				divs.out(13);
			});	
		}
		if (14 <= this.x) {
			this.divHolder[14].mouseOver(function() {
				divs.in(14);
			});
			this.divHolder[14].mouseOut(function() {
				divs.out(14);
			});	
		}
		if (15 <= this.x) {
			this.divHolder[15].mouseOver(function() {
				divs.in(15);
			});
			this.divHolder[15].mouseOut(function() {
				divs.out(15);
			});	
		}
		if (16 <= this.x) {
			this.divHolder[16].mouseOver(function() {
				divs.in(16);
			});
			this.divHolder[16].mouseOut(function() {
				divs.out(16);
			});	
		}	
		if (17 <= this.x) {
			this.divHolder[17].mouseOver(function() {
				divs.in(17);
			});
			this.divHolder[17].mouseOut(function() {
				divs.out(17);
			});	
		}	

		// hover over

		// mouse clicked 

		if (0 <= this.x) {
			this.divHolder[0].mousePressed(function() {
				divs.clicked(0);
			});
		}
		if (1 <= this.x) {
			this.divHolder[1].mousePressed(function() {
				divs.clicked(1);
			});
		}
		if (2 <= this.x) {
			this.divHolder[2].mousePressed(function() {
				divs.clicked(2);
			});
		}
		if (3 <= this.x) {
			this.divHolder[3].mousePressed(function() {
				divs.clicked(3);
			});	
		}
		if (4 <= this.x) {
			this.divHolder[4].mousePressed(function() {
				divs.clicked(4);
			});
		}
		if (5 <= this.x) {
			this.divHolder[5].mousePressed(function() {
				divs.clicked(5);
			});
		}
		if (6 <= this.x) {
			this.divHolder[6].mousePressed(function() {
				divs.clicked(6);
			});
		}
		if (7 <= this.x) {
			this.divHolder[7].mousePressed(function() {
				divs.clicked(7);
			});	
		}
		if (8 <= this.x) {
			this.divHolder[8].mousePressed(function() {
				divs.clicked(8);
			});
		}
		if (9 <= this.x) {
			this.divHolder[9].mousePressed(function() {
				divs.clicked(9);
			});
		}
		if (10 <= this.x) {
			this.divHolder[10].mousePressed(function() {
				divs.clicked(10);
			});
		}
		if (11 <= this.x) {
			this.divHolder[11].mousePressed(function() {
				divs.clicked(11);
			});
		}
		if (12 <= this.x) {
			this.divHolder[12].mousePressed(function() {
				divs.clicked(12);
			});
		}
		if (13 <= this.x) {
			this.divHolder[13].mousePressed(function() {
				divs.clicked(13);
			});
		}
		if (14 <= this.x) {
			this.divHolder[14].mousePressed(function() {
				divs.clicked(14);
			});	
		}
		if (15 <= this.x) {
			this.divHolder[15].mousePressed(function() {
				divs.clicked(15);
			});
		}
		if (16 <= this.x) {
			this.divHolder[16].mousePressed(function() {
				divs.clicked(16);
			});
		}	
		if (17 <= this.x) {
			this.divHolder[17].mousePressed(function() {
				divs.clicked(17);
			});
		}

		// mouse clicked over	
	}

	this.clicked = function (pos) {

		var arr2 = finalWords_[pos].location.slice();
		var arr3 = finalWords_[pos].gridNum.slice();

		for (var i = 0; i < arr2.length; i++){
			blocks[arr2[i]].move(arr3[i], true);
		}

		playerScore = playerScore + finalWords_[pos].sum;
		lastWordPlayer = finalWords_[pos].finalWords;
		pointsP = finalWords_[pos].sum;

		user.play();
	}

	this.in = function(pos){

		hover = true;

		for (var i = 0; i < blocks.length; i++){
			if (blocks[i].blockGridPos != -1){
				hover = false;
				break;
			}
		}

		if (hover) {
			var arr2 = finalWords_[pos].location.slice();
			var arr3 = finalWords_[pos].gridNum.slice();

			for (var i  = 0; i< arr2.length; i++){
				blocks[arr2[i]].move(arr3[i]);
			}
		}

	}
			
	this.out = function(pos){

		if (hover) {
			var arr2 = finalWords_[pos].location.slice();
			for (var i  = 0; i< arr2.length; i++){
				blocks[arr2[i]].cleared();
			}
		}
	}


}