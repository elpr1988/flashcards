var fs = require("fs");
function clozeCard(text, cloze) {
	this.cloze = cloze;
	this.partial = text.replace(cloze, "...");
	this.fullText = text;
	this.card = function() {
		var data = {
			text: this.text,
			cloze: this.cloze,
			clozeDelete: this.partial,
			type: "cloze"
		};
		fs.appendFile("./log.txt", JSON.stringify(data) + "\r\n", function(err) {
			if(err) {
				return console.log(err);
			}
		})
	}
}

module.exports = clozeCard;