// Ecco the Dolphin Text Generator
// Written by Austin Bricker, 2017
// Dynamically generates a .png image of entered text in the style of Ecco the Dolphin

// Generates canvas
var canvas = document.getElementById('eccoCanvas');
ctx = canvas.getContext('2d');

const max_rows = 18;
const x_margin = 16;
const y_margin = 26;

var img = new Image();
img.src = "./EccoBackground.png";
// var img = document.getElementById('eccoBkg');
var text = document.getElementById('eccoText');

// Update text with every keystroke
text.addEventListener('keyup', drawEcco);

img.onload = function() {
	drawEcco();
}

function drawEcco() {
	// Clear, redraw background
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	// Separate text into lines of proper length
	var text = document.getElementById('eccoText').value;
	// console.log("Read text: " + text);
	text = text.toUpperCase();
	var lines = setLines(ctx, text, max_rows, x_margin, y_margin);
	// console.log("Lines: " + lines);
	var valid_char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!.,'?:-".split('');
	var row_num = 0;
	// Finds Y starting position
	// Needs to be offset of midpoint by number of lines
	var y_pos = 132 - (lines.length * Math.floor(y_margin / 2));
	for (var row of lines){
		// Finds X starting position
		var x_pos = 152 - (row.length * Math.floor(x_margin / 2));
		for (var letter of row){
			if (letter == " "){ // If letter is a space
				x_pos += x_margin;
			} else {
				// Check if letter is one of the usable characters
				// If not, put a message on the page
				if (valid_char.indexOf(letter) >= 0) {
					if (letter == "."){ // If letter is a period
						letter = 'DOT';
					} else if (letter == ':') { // If letter is a colon
						letter = 'COLON';
					} else if (letter == '?') { // If letter is a ?
						letter = 'QUESTION';
					}
					
					// Convert letter into corresponding image, paste onto background
					var latest_letter = new Image();
					latest_letter.src = './EccoFont/' + letter + '.png';					

					if (latest_letter.complete) {
						// If image has loaded, display it
						// Previously used characters seem to go here, while newly used ones aren't ready
						ctx.drawImage(latest_letter, x_pos, y_pos, latest_letter.width, latest_letter.height);
					} else {
						// If not, wait for it to load, then display it
						// For some reason, they're shifted down and over, so include small adjustment
						latest_letter.onload = function () {
							ctx.drawImage(latest_letter, (x_pos - 2), (y_pos - y_margin), latest_letter.width, latest_letter.height);
						};
					}

					x_pos += latest_letter.width + 2;
				
					// console.log(latest_letter);
					// Shift over letter length plus small margin
					
				} else {
					document.getElementById("error").innerHTML = "I'm sorry, but " + letter + " is not a valid character";
				}
			}
		}
		// Shift down a row
		row_num++;
		// console.log("Finished line");
		y_pos += y_margin;
	}
}

function setLines(context, text, maxWidth, xMargin, yMargin) {
	var words = text.split(" ");
	var new_rows = [];
	var new_line = words[0];
	if (words.length == 1){
		new_rows.push(new_line);
	} else {
		for (var i = 1; i < words.length; i++){
			if (new_line.length + words[i].length < maxWidth){
				new_line += " " + words[i];
			} else {
				new_rows.push(new_line);
				new_line = words[i];
			}

			if (i == (words.length - 1)){
				new_rows.push(new_line);
			}
		}
	}
	return new_rows;
}