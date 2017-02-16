var hashT;
var answers = [];
var count_ = 0;
var sizeOfBlock = 38;
var isOccupied = [];
var user;
var bag = [];
var currentTile = 0;
var fixedPieces = [];
var first = true;

var finalWords_ = [];

var blocks = [];
var tiles = [];
var divs;
var gV = true;
var opponent;

var compScore = 0;
var playerScore = 0;

var lastWordComp = '';
var lastWordPlayer = '';

var pointsP = 0;
var pointsC = 0;

var peek = false;
var hover;
var gameNew = false;

var box_;

function setup() {

	box_ = random([1, 15]);

	for (var i = 1; i < 226; i++){
		isOccupied[i] = false;
	}

    createCanvas(1200, 800);

    user = new Player();

    divs = new Divs();
	divs.createTitle();

	user.createButtons();
	user.newGame();

	opponent = new Opponent();
	opponent.createTiles();

}


function draw(){

	background(255);
	drawGrid();

	blocks[0].showFixed();

	for(var i = 0; i<blocks.length; i++){
		blocks[i].show(true);
		tiles[i].show(peek);
	}
}

function drawGrid(){

	stroke(0);
	fill(205, 235, 249);
	rect(38, 38, 570, 570);
	
	stroke(255);
	var x = sizeOfBlock;

	for (var i = 0; i < 16; i++){
		line(sizeOfBlock, x, 16 * sizeOfBlock, x);
		line(x, sizeOfBlock , x, 16 * sizeOfBlock );
		x = x + sizeOfBlock;
	}

	stroke(0);
	noFill();
	strokeWeight(2);
	rect(38, 38, 570, 570);

	decorateGrid();
	 
}

function decorateGrid() {
	// center star
	noStroke();
	fill(220,20,60);
	rect(304, 304, sizeOfBlock,  sizeOfBlock); 
	fill(255);
	star(323, 323, 6, 12, 5); 
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mousePressed() {
	for(var i = 0; i<blocks.length; i++){
		if (blocks[i].overBox){
			blocks[i].locked = true;
		} else {
			blocks[i].locked = false;
		}

		blocks[i].xOffset = mouseX - blocks[i].bx;
		blocks[i].yOffset = mouseY - blocks[i].by;
	}

	return false;
}

function mouseDragged() {

	for(var i = 0; i<blocks.length; i++){

		if (blocks[i].locked){
			blocks[i].bx = mouseX - blocks[i].xOffset;
			blocks[i].by = mouseY - blocks[i].yOffset;
			currentTile = i;
		}
	}

	return currentTile;
}

function mouseReleased(){

	currentTile = mouseDragged();
	blocks[currentTile].snap(currentTile);

	for(var i = 0; i< blocks.length; i++) {
		blocks[i].locked = false;
		blocks[i].bounds();
	}

	return false;
}

function alphabeticOrder(key){

	var word = [];

	for (var i = 0; i < key.length; i++){
		word[i] = key[i];
	}

	word.sort();
	word = word.join('');

	return word;

}
