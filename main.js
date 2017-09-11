var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");

var fs = require ("fs");

start();

function start() {
	inquirer.prompt([
		{
			name: "command",
			type: "list",
			message: "Would you like to [CREATE] your cards or [REVIEW] them?",
			choices: ["CREATE", "REVIEW"]
		}
	])
	.then(function(mode) {
		if (mode.command === "CREATE") {
			createCard();
		} else if (mode.command === "REVIEW") {
			review();
		}
	});
}

function createCard() {
	inquirer.prompt([
		{
			name: "cardType",
			type: "list",
			message: "What type of card would you like to create?",
			choices: ["BASIC", "CLOZE"]
		}
	])
	.then(function(ans) {
		if (ans.cardType === "BASIC") {
			inquirer.prompt([
				{
					name: "front",
					message: "What is the question?",
					validate: function(input) {
						if(input === " ") {
							return false;
						} else {
							return true;
						}
					}
				}, {
					name: "back",
					message: "What is the answer?",
					validate: function(input) {
						if(input === " ") {
							return false;
						} else {
							return true;
						}
					}
				}
			]).then(function(ans) {
				var newBasic = new BasicCard(ans.front, ans.back);
				newBasic.card();
				start();
			});
		} else if (ans.cardType === "CLOZE") {
			inquirer.prompt([
				{
					name: "text",
					message: "Enter full text",
					validate: function(input) {
						if(input === " ") {
							return false;
						} else {
							return true;
						}
					}
				}, 
				{
					name: "cloze",
					message: "Enter cloze deletion",
					validate: function(input) {
						if(input === " ") {
							return false;
						} else {
							return true;
						}
					}
				}
			]).then(function(ans) {
				if(ans.text.includes(ans.cloze)) {
					var newCloze = new ClozeCard(ans.text, ans.cloze);
					newCloze.card();
					start();
				} else {
					console.log("Full text isn't complete");
				}
			});			
		}
	});
}
// will need to run through all the cards basic and cloze
var review = function() {
	fs.readFile("./log.txt", "utf8", function(error, data) {
		if (error) {
			console.log("Error:", error);
		}
		var questions = data.split("\r\n");
		var blank = function(value) {
			return value;
		};
		questions = questions.filter(blank);
		var count = 0;
		displayQs(questions, count);
	});
};

var displayQs = function(array, index) {
	question = array[index];
	var parseQ = JSON.parse(question);
	var questionText;
	var correctAns;
	if(parseQ.type === "basic") {
		questionText = parseQ.front;
		correctAns = parseQ.back;
	} else if (parseQ.type === "cloze") {
		questionText = parseQ.clozeDelete;
		correctAns = parseQ.cloze;
	}
	inquirer.prompt([{
		name: "response",
		message: questionText
	}]).then(function(ans) {
		if (ans.response === correctAns) {
			console.log("Good Job!");
			if (index < array.length - 1) {
				displayQs(array, index + 1);
			}
		} else {
			console.log("Wrong!");
			if (index < array.length - 1) {
				displayQs(array, index + 1);
			}
		}
	});
};