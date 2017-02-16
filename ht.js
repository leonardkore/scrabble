var dict2 = {};
var dict3 = {};
var dict4 = {};
var dict5 = {};
var dict6 = {};
var dict7 = {};
var dict8 = {};
var dict9 = {};
var dict10 = {};
var dict11 = {};
var dict12 = {};
var dict13 = {};
var dict14 = {};
var dict15 = {};
var dict16 = {};
var dict17 = {};
var dict18= {};
var dict19 = {};
var dict20 = {};
var dict21 = {};
var dict22 = {};

var lib = [];

lib[2] = dict2;
lib[3] = dict3;
lib[4] = dict4;
lib[5] = dict5;
lib[6] = dict6;
lib[7] = dict7;
lib[8] = dict8;
lib[9] = dict9;
lib[10] = dict10;
lib[11] = dict11;
lib[12] = dict12;
lib[13] = dict13;
lib[14] = dict14;
lib[15] = dict15;
lib[16] = dict16;
lib[17] = dict17;
lib[18] = dict18;
lib[19] = dict19;
lib[20] = dict20;
lib[21] = dict21;
lib[22] = dict22;

function HashFunction(){

	this.hash = function(key){

		var word = this.alphabeticOrder(key);

		dict = lib[word.length];

	    if (dict.hasOwnProperty(word)){
			dict[word][key] = word;
		} else {

		 	dict[word] = {};
			dict[word][key] = word;
		}

	}

	this.alphabeticOrder =  function(key){

		var word = [];

		for (var i = 0; i < key.length; i++){
			word[i] = key[i];
		}

		word.sort();
		word = word.join('');

		return word;

	}
}
